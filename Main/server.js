import select from "@inquirer/select";
import { input } from "@inquirer/prompts";
import "console.table";
import { db } from "./db/index.js";

function userQuestions() {
  select({
    message: "What would you like to do?",
    choices: [
      {
        name: "View All Employees",
        value: "VIEW_EMPLOYEES",
      },
      {
        name: "View All Roles",
        value: "VIEW_ROLES",
      },
      {
        name: "View All Departments",
        value: "VIEW_DEPARTMENTS",
      },
      { name: "Add Employee", value: "ADD_EMP" },
      { name: "Add Role", value: "ADD_ROLE" },
      {
        name: "Add Department",
        value: "ADD_DEPT",
      },
      {
        name: "Update Employee",
        value: "UPDATE_EMP",
      },
      {
        name: "Quit",
        value: "QUIT",
      },
    ],
  }).then((userResponse) => {
    switch (userResponse) {
      case "VIEW_EMPLOYEES":
        viewEmployees();
        break;
      case "VIEW_ROLES":
        viewRoles();
        break;
      case "VIEW_DEPARTMENTS":
        viewDepartments();
        break;
      case "ADD_EMP":
        // first_name, last_name, role_id, manager_id
        input({ message: "Enter employee first name" }).then((first_name) => {
          input({ message: "Enter employee last name" }).then((last_name) => {
            db.findAllRoles().then(([roles]) => {
              // [{id: 5, title: "Manager"}]
              select({
                message: "Select employee role",
                // map db results into select objects =>> [{name: "Manager", value: 5}]
                choices: roles.map((role) => ({
                  name: role.title,
                  value: role.id,
                })),
              }).then((role_id) => {
                input({ message: "Enter employee manager" }).then(
                  (manager_id) => {
                    console.log(`Creating ${first_name}...`);
                    db.addEmployee({
                      first_name,
                      last_name,
                      role_id,
                      manager_id,
                    })
                      .then(([rows]) => {
                        console.log(
                          `Added ${first_name}. Employee ID is: ${rows.insertId}.`
                        );
                      })
                      .then(() => userQuestions());
                  }
                );
              });
            });
          });
        });
        break;
      case "ADD_ROLE":
        input({ message: "Enter employee role" }).then((title) => {
          input({ message: "Enter employee salary" }).then((salary) => {
            // get departments from DB
            // translate DB results into nam/value pairs
            // create a select list with name/value pairs
            db.findAllDepartments().then(([departments]) => {
              // [{id: 5, name: "Engineering"}]
              select({
                message: "Select employee department",
                choices: departments.map((department) => ({
                  name: department.name,
                  value: department.id,
                })),
              }).then((department_id) => {
                console.log(`Creating ${title}...`);
                db.addRole({ title, salary, department_id })
                  .then(([rows]) => {
                    console.log(
                      `Added ${title}. Role ID is: ${rows.insertId}.`
                    );
                  })
                  .then(() => userQuestions());
              });
            });
          });
        });
        break;
      case "ADD_DEPT":
        input({ message: "Enter department name" }).then((name) => {
          console.log(`Creating ${name}...`);
          db.addDepartment({ name })
            .then(([rows]) => {
              console.log(`Added ${name}. Department ID is: ${rows.insertId}.`);
            })
            .then(() => userQuestions());
        });
        break;
      case "UPDATE_EMP":
        db.findAllEmployees().then(([employees]) => {
          select({
            message: "Please select the employee",
            choices: employees.map((employee) => ({
              name: `${employee.first_name} ${employee.last_name}`,
              value: employee.id,
            })),
          }).then((employee_id) => {
            // first_name, last_name, role_id, manager_id
            input({ message: "Enter employee first name" }).then(
              (first_name) => {
                input({ message: "Enter employee last name" }).then(
                  (last_name) => {
                    db.findAllRoles().then(([roles]) => {
                      // [{id: 5, title: "Manager"}]
                      select({
                        message: "Select employee role",
                        // map db results into select objects =>> [{name: "Manager", value: 5}]
                        choices: roles.map((role) => ({
                          name: role.title,
                          value: role.id,
                        })),
                      }).then((role_id) => {
                        input({ message: "Enter employee manager" }).then(
                          (manager_id) => {
                            console.log(`Updating ${first_name}...`);
                            db.updateEmployee({
                              employee_id,
                              first_name,
                              last_name,
                              role_id,
                              manager_id,
                            })
                              .then(([result]) => {
                                console.log(
                                  `Updated ${first_name}. Changed rows = ${result.changedRows}`
                                );
                              })
                              .then(() => userQuestions());
                          }
                        );
                      });
                    });
                  }
                );
              }
            );
          });
        });
        break;
      default:
        quit();
    }
  });
}

userQuestions();

function viewEmployees() {
  db.findAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.table(employees);
    })
    .then(() => userQuestions());
}

function viewRoles() {
  db.findAllRoles()
    .then(([rows]) => {
      let roles = rows;
      console.table(roles);
    })
    .then(() => userQuestions());
}

function viewDepartments() {
  db.findAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      console.table(departments);
    })
    .then(() => userQuestions());
}

function quit() {
  console.log("See you later, alligator!");
  process.exit(0);
}
