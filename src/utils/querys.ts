export const query = {
  getAllBooks: `SELECT b.id, b.name, a.name as author, b.editorial, b.isbn, coalesce(group_concat(g.name), '') as genres FROM book b INNER JOIN author a ON b.author = a.id LEFT JOIN book_genre bg ON b.id = bg.id_book LEFT JOIN genre g ON bg.id_genre = g.id GROUP BY b.id, b.name, a.name, b.editorial`,
  postNewBook: 'INSERT INTO book (name, author, editorial, isbn) VALUES (?, ?, ?, ?)',
  postGenreForBook: 'INSERT INTO book_genre (id_book, id_genre) VALUES (?, ?)',
  getOneBookById: `SELECT b.id, b.name, a.name as author, b.editorial, b.isbn, coalesce(group_concat(g.name), '') as genres FROM book b INNER JOIN author a ON b.author = a.id LEFT JOIN book_genre bg ON b.id = bg.id_book LEFT JOIN genre g ON bg.id_genre = g.id WHERE b.id = ? GROUP BY b.id, b.name, a.name, b.editorial`,
  getBookInfoById: `SELECT bi.id, b.name, bi.serial, sb.name as state, bi.desc_state, sbd.name as disponibility FROM book_info bi INNER JOIN book b ON b.id = bi.id_book INNER JOIN state_book sb ON sb.id = bi.state LEFT JOIN state_book_disponibility sbd ON bi.disponibility = sbd.id WHERE ? = bi.id_book`,
  getGenresForBook: `SELECT g.name FROM book_genre bg INNER JOIN book b ON bg.id_book = b.id INNER JOIN genre g ON bg.id_genre = g.id WHERE bg.id_book = ? GROUP BY name`,
  getGenres: 'SELECT * FROM genre',
  getOneGenre: 'SELECT * FROM genre WHERE id = ?',
  newGenre: 'INSERT INTO genre (name) VALUES (?)',
  getOneAuthor: 'SELECT * FROM author WHERE id = ?',
  getAuthors: 'SELECT * FROM author',
  postNewAuthor: 'INSERT INTO author (name, nationality) VALUES (?, ?)',
  getAllLoans: `SELECT l.id, b.name as book_name, u.username, coalesce(bi.serial, '') as serial, l.start_date, l.finish_date, sl.name as state FROM loan l INNER JOIN user u ON l.id_user = u.id INNER JOIN book b ON l.id_book = b.id INNER JOIN state_loan sl ON sl.id = l.state LEFT JOIN book_info bi ON l.id_book_info = bi.id`,
  getAllLoansByUser: `SELECT l.id, b.name as book_name, u.username, coalesce(bi.serial, '') as serial, l.start_date, l.finish_date, sl.name as state FROM loan l INNER JOIN user u ON l.id_user = u.id INNER JOIN book b ON l.id_book = b.id INNER JOIN state_loan sl ON sl.id = l.state LEFT JOIN book_info bi ON l.id_book_info = bi.id WHERE l.id_user = ?`,
  postNewLoan:
    'INSERT INTO loan (id_user, id_book, start_date, finish_date, state, id_book_info) VALUES (?, ?, ?, ?, (select sl.id from state_loan sl where sl.name = ?), ?)',
  getOneLoan: `SELECT l.id, b.name as book_name, u.username, coalesce(bi.serial, '') as serial, l.start_date, l.finish_date, sl.name as state FROM loan l INNER JOIN user u ON l.id_user = u.id INNER JOIN book b ON l.id_book = b.id INNER JOIN state_loan sl ON sl.id = l.state LEFT JOIN book_info bi ON l.id_book_info = bi.id WHERE l.id = ?`,
  updateBookInfoDisponibility:
    'UPDATE book_info SET disponibility = (select id from state_book_disponibility where name = ?) WHERE id = ?',
  getUserByUsername:
    'select u.id, u.username, u.email, u.name, u.lastname, u.password, r.name as role from user u inner join role r on u.role = r.id where u.username = ?',
  postNewUser:
    'insert into user (username, email, name, lastname, password, role) values (?, ?, ?, ?, ?, (select r.id from role r where r.name = ?))',
  getAllRoles: 'select * from role',
  getOneRole: 'select * from role where role.id = ?',
  checkDisponibilityBook:
    'select sbd.name as disponibility from book_info bi left join state_book_disponibility sbd on bi.disponibility = sbd.id where bi.id = ?',
  getAllFines:
    'select f.id, f.value, sf.name as state, u.username, u.email from fine f inner join user_fine uf on uf.id_fine = f.id inner join user u on uf.id_user = u.id inner join state_fine sf on sf.id = f.state',
  checkFinesByUserId:
    'select f.id, f.value, sf.name as state, u.username, u.email from fine f inner join user_fine uf on uf.id_fine = f.id inner join user u on uf.id_user = u.id inner join state_fine sf on sf.id = f.state where u.id = ? and (sf.name = "pending" or sf.name = "expired")',
  postNewFine: 'insert into fine (value, state) values (?, (select id from state_fine where name = ?))',
  postUserFine: 'insert into user_fine (id_user, id_fine) values ((select id from user where username = ?), ?)',
  getOneFine:
    'select f.id, f.value, sf.name as state, u.username, u.email from fine f inner join user_fine uf on uf.id_fine = f.id inner join user u on uf.id_user = u.id inner join state_fine sf on sf.id = f.state where f.id = ?',
  updateFineState: 'update fine set state = (select id from state_fine where name = "paid") where id = ?',
  updateLoanStateToExpired: 'update loan set state = (select id from state_loan where name = "expired") where id = ?',
  postNewBookInfo:
    'insert into book_info (id_book, serial, state, disponibility, desc_state) values (?, ?, (select id from state_book where name = ?), (select id from state_book_disponibility where name = ?), ?)',
  getOneBookInfo:
    'SELECT bi.id, b.name, bi.serial, sb.name as state, bi.desc_state, sbd.name as disponibility FROM book_info bi INNER JOIN book b ON b.id = bi.id_book INNER JOIN state_book sb ON sb.id = bi.state LEFT JOIN state_book_disponibility sbd ON bi.disponibility = sbd.id WHERE bi.id = ?',
  updateLoanStateToReturned: "update loan set state = (select id from state_loan where name = 'returned') where id = ?",
  updateBookInfoDisponibilityBySerial:
    'update book_info set disponibility = (select id from state_book_disponibility where name = ?) where serial = ?',
  getAllUsers:
    'select u.id, u.username, u.email, u.name, u.lastname, r.name as role from user u inner join role r on u.role = r.id',
  getAllFinesByUserId:
    'select f.id, f.value, sf.name as state, u.username, u.email from fine f inner join user_fine uf on uf.id_fine = f.id inner join user u on uf.id_user = u.id inner join state_fine sf on sf.id = f.state where u.id = ?',
  updateAuthor: 'update author set name = ?, nationality = ? where id = ?'
}
