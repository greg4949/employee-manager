INSERT INTO departments (dept_name)
VALUES ('Sales'),
        ('Engineering'),
        ('Finance'),
        ('Legal');

INSERT INTO roles (title,salary,dept_id)
VALUES ('Sales Lead',125000,1),
        ('Salesperson',100000,1),
        ('Lead Engineer',160000,2),
        ('Software Engineer',120000,2),
        ('Account Manager',105000,3),
        ('Accountant',95000,3),
        ('Legal Team Lead',185000,4),
        ('Lawyer',135000,4);


INSERT INTO employee (first_name,last_name,role_id,mgr_id)
VALUES ('Neal','Page',1,NULL),
        ('Del','Griffith',2,1),
        ('Gary','Wallace',3,NULL),
        ('Wyatt','Donnelly',4,3),
        ('Tommy','Callahan',5,NULL),
        ('Albert', 'Brennaman',6,5),
        ('Harvey','Specter',7,NULL),
        ('Michael','Ross',8,7);


