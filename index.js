const inquirer = require('inquirer');
const mysql = require('mysql2');


//
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
                
                case menuOptions.addDept:
                    aDept();
                    break;
                case menuOptions.addRole:
                    aRole();
                    break;
                
                case menuOptions.addEmp:
                    aEmp();
                    break;

                case menuOptions.updEmpRole:
                    uEmpRole();
                    break;

                case menuOptions.exit:
                    db.end();
                    break

            }
        })
}

function vDepts() {
    const selDepts =`SELECT * FROM departments;`;
    db.query(selDepts, (err,res)=> {
        if (err) {
            console.log('Error. Check your sql syntax');
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
            console.log('Error.  Check your sql syntax');
            return;
        }
        console.table(res);
        menu();
    })
}

async function aDept() {
    const promptDept = await inquirer.prompt(inputDept());
    const insDept = `INSERT INTO departments (dept_name) VALUES (?)`;
    const newDept = promptDept.department
    db.query(insDept, newDept, (err,res) => {
        if (err) {console.log('Error. Check your sql syntax')
                console.log(`${newDept}`);
        return;
    }
    console.log('New department added successfuly');
    menu();
    })
}

async function aRole() {
    const promptRole = await inquirer.prompt(inputRole());
    const insRole = `INSERT INTO roles (title, salary, dept_id) VALUES (?,?,?)`;
    const newRole = [promptRole.title,promptRole.salary,promptRole.dept_id];
    db.query(insRole, newRole, (err,res) => {
        if (err) {console.log('Error. Check your sql syntax')
                console.log(`${newRole}`);
        return;
    }
    console.log('New role added successfuly');
    menu();
    })
};

async function aEmp() {
    const promptEmp = await inquirer.prompt(inputEmp());
    const insEmp = `INSERT INTO employee (first_name, last_name, mgr_id, role_id) VALUES (?,?,?,?)`;
    const newEmp = [promptEmp.first_name, promptEmp.last_name, promptEmp.mgr_id, promptEmp.role_id];
    db.query(insEmp, newEmp, (err,res) => {
        if (err) {console.log('Error. Check your sql syntax')
                console.log(`${newEmp}`);
        return;
    }
    console.log('New employee added successfuly');
    menu();
    })
};

async function uEmpRole() {
    const promptEmpRole = await inquirer.prompt(updateEmpRole());
    const udpateEmpRole = `UPDATE employee SET role_id = ? WHERE emp_id = ?`;
    const newEmpRole = [promptEmpRole.role_id, promptEmpRole.emp_id];
    db.query(udpateEmpRole, newEmpRole, (err,res) => {
        if (err) {console.log('Error. Check your sql syntax')
                console.log(`${newEmpRole}`);
        return;
    }
    console.log('Employee role changed successfuly');
    menu();
    })
}
function inputDept() {
    return ([
        {
        name: "department",
        type: "input",
        message: "Enter new department name:"}
    ])
};

function inputRole() {
    return ([
        {
        name: "title",
        type: "input",
        message: "Enter new role title:"
        },
        {
        name: "salary",
        type: "input",
        message: "Enter salary of new role"
        },
        {
        name: "dept_id",
        type: "input",
        message: "Enter dept id for new role"
        }
    ])
};

function inputEmp() {
    return ([
        {
        name: "first_name",
        type: "input",
        message: "Enter new employee first name:"
        },
        {
        name: "last_name",
        type: "input",
        message: "Enter new employee last name"
        },
        {
        name: "mgr_id",
        type: "input",
        message: "Enter new employee manager id"
        },
        {
        name: "role_id",
        type: "input",
        message: "Enter new employee role id"
        }
    ])
}

function updateEmpRole() {
    return ([       
        {
        name: "emp_id",
        type: "input",
        message: "Enter employee id whose role will be changed:"
        },        
        {
        name: "role_id",
        type: "input",
        message: "Enter employee's updated role id:"
        }
    ])
};