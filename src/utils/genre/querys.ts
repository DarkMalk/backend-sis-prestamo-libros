export const query = {
  getGenres: 'SELECT * FROM genre',
  getOneGenre: 'SELECT * FROM genre WHERE id = ?',
  newGenre: 'INSERT INTO genre (name) VALUES (?)',
  deleteGenre: 'DELETE FROM genre WHERE id = ?',
  updateGenre: 'UPDATE genre SET name = ? WHERE id = ?'
}
