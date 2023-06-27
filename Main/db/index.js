import connection from "./connection.js"

class DB {
  constructor(connection) {
    this.connection = connection;
  }
  findAllEmployees() {
    return this.connection.promise().query(`
    select *
      from employee
`);
  }
  findAllRoles() {
    return this.connection.promise().query(`
    select *
      from role
`);
  }
  findAllDepartments() {
    return this.connection.promise().query(`
    select *
      from department
`);
  }
}

const db = new DB(connection);

export { db };
