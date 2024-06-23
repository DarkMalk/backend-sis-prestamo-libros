import { serverPort } from './config/guard_env'
import { app } from './server'

app.listen(serverPort, () => console.log(`Server is running on http://localhost:${serverPort}`))
