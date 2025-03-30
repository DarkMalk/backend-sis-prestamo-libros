export const query = {
  getAllBooks: `SELECT b.id, b.name, g.name as genre, a.name as author, b.isbn, e.name as editorial, b.stock FROM book b INNER JOIN genre g ON g.id = b.genre INNER JOIN author a ON a.id = b.author INNER JOIN editorial e ON e.id = b.editorial`,
  getOneBookById: `SELECT b.id, b.name, g.name as genre, a.name as author, b.isbn, e.name as editorial, b.stock FROM book b INNER JOIN genre g ON g.id = b.genre INNER JOIN author a ON a.id = b.author INNER JOIN editorial e ON e.id = b.editorial WHERE b.id = ?`,
  getOneBookByName: `SELECT b.id, b.name, g.name as genre, a.name as author, b.isbn, e.name as editorial, b.stock FROM book b INNER JOIN genre g ON g.id = b.genre INNER JOIN author a ON a.id = b.author INNER JOIN editorial e ON e.id = b.editorial WHERE b.name = ?`,
  postNewBook: 'INSERT INTO book (name, genre, author, isbn, editorial, stock) VALUES (?, ?, ?, ?, ?, ?)',
  updateBookStock: 'UPDATE book SET stock = ? WHERE id = ?'
}
