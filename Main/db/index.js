import connection from "./connection.js";

class DB {
  constructor(connection) {
    this.connection = connection;
  }
  findAllEmployees() {
    return this.connection.promise().query(`
    select emp.first_name,
           emp.last_name,
           emp.id,
           role.title,
           role.salary,
           d.name,
           concat(manager.first_name, ' ', manager.last_name) AS manager_name
      from employee emp
      inner join role on 
          role.id = emp.role_id
      inner join department d on
          d.id = role.department_id
      left join employee manager on
          manager.id = emp.manager_id
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
  viewBudget(dept_id) {
    return this.connection.promise().query(`
    select sum(salary) AS DepartmentBudgetcd
      from role
      where department_id = ${dept_id}
`);
  }

  // https://www.w3schools.com/sql/sql_insert.asp
  addEmployee(employee) {
    // { first_name: 'm', last_name: 'd', role_id: '1', manager_id: '2' }
    return this.connection.promise().query(`
    insert into employee (first_name, last_name, role_id, manager_id)
    VALUES ('${employee.first_name}', '${employee.last_name}', '${employee.role_id}', '${employee.manager_id}')
    `);
  }
  updateEmployee(employee) {
    // { employee_id: 5, first_name: 'm', last_name: 'd', role_id: '1', manager_id: '2' }
    return this.connection.promise().query(`
    update employee
    set first_name = '${employee.first_name}',
        last_name = '${employee.last_name}',
        role_id = ${employee.role_id},
        manager_id = ${employee.manager_id}
    where id = ${employee.employee_id}
    `);
  }
  addRole(role) {
    return this.connection.promise().query(`
    insert into role (title, salary, department_id)
    VALUES ('${role.title}', '${role.salary}', '${role.department_id}')
    `);
  }
  addDepartment(department) {
    return this.connection.promise().query(`
    insert into department (name)
    VALUES ('${department.name}')
    `
    );
  }
}

const db = new DB(connection);

export { db };
