export const query = {
  getAllLoans: `SELECT l.id, b.name as book, u.username as username, l.start_date, l.finish_date, s.name as state FROM loan l INNER JOIN book b ON b.id = l.id_book INNER JOIN user u ON u.id = l.id_user INNER JOIN state_loan s ON s.id = l.state`,
  getAllLoansByUser: `SELECT l.id, b.name as book, u.username as username, l.start_date, l.finish_date, s.name as state FROM loan l INNER JOIN book b ON b.id = l.id_book INNER JOIN user u ON u.id = l.id_user INNER JOIN state_loan s ON s.id = l.state WHERE u.id = ?`,
  getOneLoan: `SELECT l.id, b.name as book, u.username as username, l.start_date, l.finish_date, s.name as state FROM loan l INNER JOIN book b ON b.id = l.id_book INNER JOIN user u ON u.id = l.id_user INNER JOIN state_loan s ON s.id = l.state WHERE l.id = ?`,
  postNewLoan:
    'INSERT INTO loan (id_user, id_book, start_date, finish_date, state) VALUES (?, ?, ?, ?, (SELECT id FROM state_loan WHERE name = "active"))',
  updateLoanState: 'UPDATE loan SET state = (SELECT id FROM state_loan WHERE name = ?) WHERE id = ?',
  deleteLoan: 'DELETE FROM loan WHERE id = ?'
}
