export const query = {
  getEditorials: 'SELECT * FROM editorial',
  getEditorialById: 'SELECT * FROM editorial WHERE id = ?',
  updateEditorial: 'UPDATE editorial SET name = ? WHERE id = ?',
  deleteEditorial: 'DELETE FROM editorial WHERE id = ?',
  newEditorial: 'INSERT INTO editorial (name) VALUES (?)'
}
