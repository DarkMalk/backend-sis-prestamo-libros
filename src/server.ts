import { RouterUser, RouterRole, RouterBook, RouterGenre, RouterAuthor, RouterLoan, RouterFine } from './routes'
import { updateLoanStateToExpired } from './services/loan/update_loan_expired'
import { postUserFine } from './services/fine/post_user_fine'
import { getAllLoans } from './services/loan/get_all_loans'
import { newFine } from './services/fine/post_new_fine'
import { notFound } from './middlewares'
import express from 'express'
import cron from 'node-cron'
import morgan from 'morgan'
import cors from 'cors'

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// Routes
app.use('/api/user', RouterUser)
app.use('/api/role', RouterRole)
app.use('/api/book', RouterBook)
app.use('/api/genre', RouterGenre)
app.use('/api/author', RouterAuthor)
app.use('/api/loan', RouterLoan)
app.use('/api/fine', RouterFine)

// Schedule Cron for create fine
cron.schedule('0 0 * * *', async () => {
  const allLoans = await getAllLoans()
  const nowDate = new Date()

  if (!allLoans.length) return

  Promise.all(
    allLoans.map(async loan => {
      if (loan.state !== 'active') return true
      if (nowDate > loan.finish_date) {
        await updateLoanStateToExpired(loan.id)
        const { insertId } = await newFine({ value: 3000, state: 'pending' })
        await postUserFine(loan.username, insertId)

        // TODO: Send email to user

        return true
      }
    })
  )
})

// Middlewares
app.use(notFound)

export { app }
