/*test file to run all needed queries for application*/


/*View all departments*/

SELECT *

FROM departments;


/*View all roles*/

SELECT r.role_id
,r.title
,d.dept_name
,r.salary

FROM roles r
join departments d on r.dept_id=d.dept_id;

/*View all employees*/

SELECT e.emp_id
,e.first_name
,e.last_name
,r.title
,d.dept_name
,r.salary
,CONCAT(m.first_name,' ',m.last_name) as 'Manager'

FROM employee e
LEFT JOIN roles r on e.role_id=r.role_id
LEFT JOIN departments d on r.dept_id=d.dept_id
LEFT JOIN employee m on e.mgr_id=m.emp_id;

/*Add a dept*/

INSERT INTO departments (dept_name)
VALUES ('Security');

/*Add a role*/

INSERT INTO roles (title,salary,dept_id)
VALUES ('Head of Security',115000,5),
        ('Security Guard',75000,5);

/*Add an employee*/

INSERT INTO employee (first_name,last_name,role_id,mgr_id)
VALUES ('John','McLane',9,NULL),
        ('Paul','Blart',NULL,9);


/*View all departments*/

SELECT *

FROM departments;


/*View all roles*/

SELECT r.role_id
,r.title
,d.dept_name
,r.salary

FROM roles r
join departments d on r.dept_id=d.dept_id;

/*View all employees*/

SELECT e.emp_id
,e.first_name
,e.last_name
,r.title
,d.dept_name
,r.salary
,CONCAT(m.first_name,' ',m.last_name) as 'Manager'

FROM employee e
LEFT JOIN roles r on e.role_id=r.role_id
LEFT JOIN departments d on r.dept_id=d.dept_id
LEFT JOIN employee m on e.mgr_id=m.emp_id;


        

/*Update employee role*/

UPDATE employee
SET 
    role_id = '10'

WHERE emp_id = '10';


/*View all employees*/

SELECT e.emp_id
,e.first_name
,e.last_name
,r.title
,d.dept_name
,r.salary
,CONCAT(m.first_name,' ',m.last_name) as 'Manager'

FROM employee e
LEFT JOIN roles r on e.role_id=r.role_id
LEFT JOIN departments d on r.dept_id=d.dept_id
LEFT JOIN employee m on e.mgr_id=m.emp_id;

