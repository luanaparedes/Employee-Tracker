const inquirer = require('inquirer');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`)
);


  const showMenu = () => {
        inquier.prompt = ([
            {
                type: "list",
                name: "menu",
                message: "Main Menu",
                choices: [
                    {name: "View all departments", value: "viewDepartments"},
                    {name: "View all roles", value: "viewRoles"},
                    {name: "View all employees", value: "viewEmployees"},
                    {name: "Add a department", value: "addDepartment"},
                    {name: "Add a role", value: "addRoll"},
                    {name: "Add an employee", value: "addEmployee"},
                    {name: "Update an employee roll", value: "updateEmployee"},
                ]
            }
        ])
        .then((answers) => {
            const {menu} = answers;

            if (menu.value === "viewDepartments") {
                viewDepartments();
            } else if (menu.value === "viewRoles") {
                viewRoles();
            } else if(menu.value === "viewEmployees") {
                viewEmployees()
            } else if(menu.value === "addDepartment") {
                addDepartment()
            } else if(menu.value === "addRoll") {
                addRoll();
            } else if(menu.value === "addEmployee") {
                addEmployee();
            } else if(menu.value === "updateEmployee") {
                updateEmployee();
            }
        })
    }
    
viewDepartments = () => {
    const sql = ' SELECT department.id, department.+name AS department from department';

    db.promise().query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        showMenu();
    });
};

viewRoles = () => {
    const sql = 'SELECT title.role, id.role, department.name, salary.role AS department FROM role INNER JOIN department ON role.department_id = department.id';
    db.promise().query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        showMenu();
    });
};

viewEmployees = () => {
    const sql = 'SELECT employee.id, employee.first_name, employee.last_name, employee.title, departement.name AS department, employee.salary CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id';

    db.promise().query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        showMenu();
    });
};

addDepartment = () => {

};

addRoll = () => {

};

addEmployee = () => {

}

updateEmployee = () => {

};