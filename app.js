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
// show menu options 
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
//functions for each menu option    
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
    `SELECT role.title, role.id, role.salary, department.name 
    AS department FROM role 
    INNER JOIN department ON role.department_id = department.id`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        showMenu();
    });
};
//fix this
viewEmployees = () => {
    const sql = 
    `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name 
    AS department, role.salary, 
    CONCAT (manager.first_name, " ", manager.last_name)
    AS managerName FROM employee 
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
            VALUES (?)`;

            db.query(sql, answer.addDep, (err, result) => {
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
        VALUES (?,?,?)`

        db.query(sql, [answer.title, answer.salary, answer.department_id], (err, result) => {
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
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES (?,?,?,?)`

        db.query(sql, [answer.first_name, answer.last_name, answer.role_id, answer.manager_id], (err, result) => {
        if (err) throw err;
        viewEmployees();
});
    })
}


updateEmployee = () => {
    const employeesSql = 'SELECT * FROM employee'

    db.query(employeesSql, (err, data) => {
        if (err) throw err;

        const employeeList = data.map(({ id, first_name, last_name }) => ({ name: first_name + " "+ last_name, value: id }));

        inquirer.prompt([
            {
                type: 'list',
                name: 'name',
                message: 'Which employee would you like to update?',
                choices: employeeList
            }
        ])
        .then(empSelect => {
            const employee = empSelect.name;
            const params = []; 
        params.push(employee);

        const roleSql = `SELECT * FROM role`;

        db.query(roleSql, (err, data) => {
          if (err) throw err; 

          const roles = data.map(({ id, title }) => ({ name: title, value: id }));
          
            inquirer.prompt([
              {
                type: 'list',
                name: 'role',
                message: "What is the employee's new role?",
                choices: roles
              }
            ])
                .then(roleChoice => {
                const role = roleChoice.role;
                params.push(role); 
                
                let employee = params[0]
                params[0] = role
                params[1] = employee 

                const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
                db.query(sql, params, (err, result) => {
                    if (err) throw err;
                  console.log("Employee has been updated!");
                
                  viewEmployees();
                });
            });
          });
        });
      });
    };
