export const query = {
  postNewUser:
    'insert into user (username, email, name, lastname, password, role) values (?, ?, ?, ?, ?, (select r.id from role r where r.name = ?))',
  getUserByUsername:
    'select u.id, u.username, u.email, u.name, u.lastname, u.password, r.name as role from user u inner join role r on u.role = r.id where u.username = ?',
  getAllUsers:
    'select u.id, u.username, u.email, u.name, u.lastname, r.name as role from user u inner join role r on u.role = r.id'
}
