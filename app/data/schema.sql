CREATE DATABASE IF NOT EXISTS msisdb;
USE msisdb;

DROP TABLE IF EXISTS student;
CREATE TABLE student (
	id int PRIMARY KEY AUTO_INCREMENT ,
    username varchar(24) UNIQUE NOT NULL,
    name varchar(48)
);

INSERT INTO student (id, username, name) VALUES 
(1, 'tomgreg', 'Tom Gregory'),
(2, 'beth1', 'Beth Barnhart'),
(3, 'bipin', 'Prof. Prabhakar');

-- SELECT * FROM students;

DROP TABLE IF EXISTS offer;
CREATE TABLE offer (
	id int PRIMARY KEY AUTO_INCREMENT,
    studentId int NOT NULL REFERENCES student(id) 
        ON DELETE CASCADE ON UPDATE CASCADE,
	companyName VARCHAR(24) NOT NULL DEFAULT '',
    salary int NOT NULL DEFAULT 0,
    bonus int NOT NULL DEFAULT 0,
	offerDate date NOT NULL DEFAULT(CURRENT_DATE)
);

-- Student 1 has no offers, Student 2 has 3 offers, Student 3 has one offer
INSERT INTO offer(id, studentId, companyName, salary, bonus, offerDate) VALUES
  (1, 2, 'KPMG', 95000, 7000, '2021-09-30'),
  (2, 2, 'Deloitte Digital', 94000, 12000, '2021-10-03'),
  (3, 2, 'IU, ISGP', 54000, 0, '2021-10-05'),
  (4, 3, 'Amazon', 122000, 11000, '2021-10-15')
;


-- Adding books table
DROP TABLE IF EXISTS books;
CREATE TABLE books (
	id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(100) NOT NULL,
    year_published INT NOT NULL,
    publisher VARCHAR(100) NOT NULL,
    page_count INT NOT NULL,
    msrp VARCHAR(10) NOT NULL DEFAULT 0
);

INSERT INTO books(id, title, author, year_published, publisher, page_count, msrp) VALUES
	(1, "People in Places",	"Perla Greenig", 1992, "Becker Group",	371, "57.00"),
	(2, "Murphy's Law", "Amerigo Barnbrook", 1998, "Rempel Group", 505,	"10.08"),
    (3,	"Human Capital", "Xylina Potten", 1991, "Spencer-Mueller", 557, "42.48"),
	(4, "Eddie", "Nikola Watkins", 2007, "Torphy-Turner", 333, "12.55"),
	(5,	"Aerial, The (La antena)", "Katine Boydell", 1998, "Hilll-Connelly", 122, "28.98")
;










-- COMMIT;

-- CREATE USER 'msisreader'@'%' IDENTIFIED BY 'msisreadonly';
-- GRANT SELECT ON * . * TO 'msisreader'@'%';