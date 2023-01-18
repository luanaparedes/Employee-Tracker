const inquirer = require('inquirer');


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
        .then((ansers) => {
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
    
