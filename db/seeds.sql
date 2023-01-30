INSERT INTO department (name)
VALUES ("Engineering"),
("Finance"),
("Legal"),
("Sales");

INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 120000, 1),
("Account Manager", 160000, 2),
("Accountant", 125000, 2),
("Legal Team Lead", 250000, 3),
("Lawyer", 190000, 3),
("Sales Lead", 150000, 4),
("Salesperson", 100000, 4),
("Lead Engineer", 280000, 1) ;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 4, null),
("Mike", "Chan", 7, 1),
("Ashley","Rodriguez", 8, null),
("Kevin", "Tupic", 1, 3),
("Kunal", "Singh", 2, null),
("Malia", "Brown", 3, 5),
("Sarah", "Lourd", 4, null),
("Tom", "Allen", 5, 7);