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

FROM employee e
LEFT JOIN roles r on e.role_id=r.role_id
LEFT JOIN departments d on r.dept_id=d.dept_id
LEFT JOIN employee m on e.emp_id=m.mgr_id;

