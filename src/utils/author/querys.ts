export const query = {
  getOneAuthor: 'SELECT * FROM author WHERE id = ?',
  getAuthors: 'SELECT * FROM author',
  postNewAuthor: 'INSERT INTO author (name, nationality) VALUES (?, ?)',
  updateAuthor: 'update author set name = ?, nationality = ? where id = ?',
  deleteAuthor: 'DELETE FROM author WHERE id = ?'
}
