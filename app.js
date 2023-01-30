const inquirer = require('inquirer');
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`)
);
db.connect(() => {
    showMenu();
})

  const showMenu = () => {
    inquirer.prompt([
            {
                type: "list",
                name: "menu",
                message: "Main Menu",
                choices: [
                    {name: "View all departments", value: "viewDepartments"},
                    {name: "View all roles", value: "viewRoles"},
                    {name: "View all employees", value: "viewEmployees"},
                    {name: "Add a department", value: "addDepartment"},
                    {name: "Add a role", value: "addRole"},
                    {name: "Add an employee", value: "addEmployee"},
                    {name: "Update an employee roll", value: "updateEmployee"},
                ]
            }
        ])
        .then((answers) => {
            const {menu} = answers;

            if (menu === "viewDepartments") {
                viewDepartments();
            } else if (menu === "viewRoles") {
                viewRoles();
            } else if(menu === "viewEmployees") {
                viewEmployees()
            } else if(menu === "addDepartment") {
                addDepartment()
            } else if(menu === "addRole") {
                addRole();
            } else if(menu === "addEmployee") {
                addEmployee();
            } else if(menu === "updateEmployee") {
                updateEmployee();
            }
        })
    }
    
viewDepartments = () => {
    const sql = 
    `SELECT department.id, department.name 
    AS department from department`;

    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        showMenu();
    });
};

viewRoles = () => {
    const sql = 
    `SELECT title.role, id.role, department.name, salary.role 
    AS department FROM role 
    INNER JOIN department ON role.department_id = department.id`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        showMenu();
    });
};

viewEmployees = () => {
    const sql = 
    `SELECT employee.id, employee.first_name, employee.last_name, employee.title, departement.name 
    AS department, employee.salary 
    CONCAT (manager.first_name, " ", manager.last_name) 
    AS manager FROM employee 
    LEFT JOIN role ON employee.role_id = role.id 
    LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id`;

    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        showMenu();
    });
};

addDepartment = () => {
    inquirer.prompt ([
    {
        type: 'input',
        name: 'addDep',
        message: 'What is the name of the department you would like to add?',
        validate: addDep => {
            if (addDep) {
                return true;
            } else {
                console.log('Please enter a name for the department you would like to add.');
                return false;
            }
          }
        }
    ]) 
    .then(answer => {
            const sql = `INSERT INTO department (name)
            VALUES (?)`

            connection.query(sql, answer.addDept, (err, result) => {
            if (err) throw err;
            viewDepartments();
    });
        })
    };


addRole = () => {
    inquirer.prompt ([
        {
            type: 'input',
            name: 'title',
            message: 'What is the name of the role youd like to add?',
            validate: addRole => {
                if (addRole) {
                    return true;
                } else {
                    console.log('Please enter a name for the role you would like to add.');
                    return false;
                }
              }
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary for the new roll youd would like to add?',
            validate: addRole => {
                if (addRole) {
                    return true;
                } else {
                    console.log('Please enter a salary for the role you would like to add.');
                    return false;
                }
              }
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'What department will new roll youd would like to add be in?',
            validate: addRole => {
                if (addRole) {
                    return true;
                } else {
                    console.log('Please enter a department for the role you would like to add.');
                    return false;
                }
              }
        },
    ])
    .then(answer => {
        const sql = `INSERT INTO role (title, salary, department_id)
        VALUES (?)`

        connection.query(sql, answer.addRole, (err, result) => {
        if (err) throw err;
        viewRoles();
});
    })
};

addEmployee = () => {
    inquirer.prompt ([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the new employees first name?',
            validate: addRole => {
                if (addRole) {
                    return true;
                } else {
                    console.log('Please enter the new employees first name.');
                    return false;
                }
              }
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the new employees last name?',
            validate: addRole => {
                if (addRole) {
                    return true;
                } else {
                    console.log('Please enter the new employees last name.');
                    return false;
                }
              }
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'What department will the new employee be in?',
            validate: addRole => {
                if (addRole) {
                    return true;
                } else {
                    console.log('Please enter the new employees department.');
                    return false;
                }
              }
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'Who is the new employees manager?',
            validate: addRole => {
                if (addRole) {
                    return true;
                } else {
                    console.log('Please enter the new employees manager.');
                    return false;
                }
              }
        },
        
    ])
    .then(answer => {
        const sql = `INSERT INTO employee (first_name, last_name, role_id, department_id, manager_id)
        VALUES (?)`

        connection.query(sql, answer.addEmployee, (err, result) => {
        if (err) throw err;
        viewEmployees();
});
    })
}

//add select inquierer?
// updateEmployee = () => {
//     const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
  
    // db.query(sql, (err, result) => {
    //   if (err) {
    //     res.status(400).json({ error: err.message });
    //   } else if (!result.affectedRows) {
    //     res.json({
    //       message: 'Employee not found'
    //     }.then, {
    //         showMenu();
    //     });
//       }
//     });
// };