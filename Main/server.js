import select from "@inquirer/select";
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
      {
        name: "Add Department",
        value: "ADD_DEPT",
      },
      { name: "Add Employee", value: "ADD_EMP" },
      { name: "Add Role", value: "ADD_ROLE" },
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
      case "ADD_DEPT":
        console.log("Not implemented");
        break;
      case "ADD_EMP":
        console.log("Not implemented");
        break;
      case "ADD_ROLE":
        console.log("Not implemented");
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
