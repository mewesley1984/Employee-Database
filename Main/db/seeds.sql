INSERT INTO department (name)
VALUES ("Human Resources"),
        ("Sales"),
        ("Engineering");

INSERT INTO role (title, salary,department_id)
VALUES ("Engineering Manager", 250000, 3),
        ("Head of Sales", 200000,2),
        ("HR Manager", 150000, 1),
        ("Engineer", 150000, 3),
        ("Salesperson", 100000, 2),
        ("HR Recruiter", 80000,1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bob","Smith", 2, NULL),
        ("Mary", "Thompson", 5, 1 ),
        ("Tim", "Clark", 1, NULL),
        ("Steve","Nelson", 4, 3),
        ("Meghan","Wesley", 3, NULL),
        ("Tammy", "Jones", 6, 5);


        