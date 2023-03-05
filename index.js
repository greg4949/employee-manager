const inquirer = require('inquirer');
const mysql = require('mysql2');



const menuOptions = {
    viewDepts: 'View all departments',
    viewRoles: 'View all roles',
    viewEmps: 'View all employees',
    addDept: 'Add a department',
    addRole: 'Add a role',
    addEmp: 'Add an employee',
    updEmpRole : 'Update employee Role',
    exit: 'Exit'

}

const db = mysql.createConnection(
    {
      host: "localhost",
      // MySQL username,
      user: "root",
      // TODO: Add MySQL password here
      password: "gregkitch",
      database: "employee_db",
    },      
  );

db.connect(err => {
    if (err) throw err;
    menu();
});

function menu() {
    inquirer
        .prompt({
            name: 'menuChoice',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                menuOptions.viewDepts,
                menuOptions.viewRoles,
                menuOptions.viewEmps,
                menuOptions.addDept,
                menuOptions.addRole,
                menuOptions.addEmp,
                menuOptions.updEmpRole,
                menuOptions.exit
            ] 
        })
        .then(answer => {
            switch (answer.menuChoice) {
                case menuOptions.viewDepts:
                    vDepts();
                    break;

                case menuOptions.viewRoles:
                    vRoles();
                    break;

                case menuOptions.viewEmps:
                    vEmps();
                    break;

            }
        })
}

function vDepts() {
    const selDepts =`SELECT * FROM departments;`;
    db.query(selDepts, (err,res)=> {
        if (err) {
            console.log('Check your sql syntax');
            return;
        }
        console.table(res);
        menu();
    })
}

function vRoles() {
    const selRoles =`SELECT * FROM roles;`;
    db.query(selRoles, (err,res)=> {
        if (err) {
            console.log('Check your sql syntax');
            return;
        }
        console.table(res)
        menu();
    })
}

function vEmps() {
    const selEmps =`SELECT e.emp_id
    ,e.first_name
    ,e.last_name
    ,r.title
    ,d.dept_name
    ,r.salary
    ,CONCAT(m.first_name,' ',m.last_name) as 'Manager'
    
    FROM employee e
    LEFT JOIN roles r on e.role_id=r.role_id
    LEFT JOIN departments d on r.dept_id=d.dept_id
    LEFT JOIN employee m on e.mgr_id=m.emp_id`;
    db.query(selEmps, (err,res)=> {
        if (err) {
            console.log('Check your sql syntax');
            return;
        }
        console.table(res);
        menu();
    })
}

function aDept() {
    const addDept =`INSERT INTO departments (dept_name)
    VALUES ('Security');`
}

//vDepts();
//vRoles();
//vEmps();