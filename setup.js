//your code here
/* CREATE TABLE
CREATE TABLE voters (
id INTEGER PRIMARY KEY AUTOINCREMENT,
first_name TEXT,
last_name TEXT,
gender TEXT,
age INTEGER);

CREATE TABLE politicians (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT,
party TEXT,
location TEXT,
grade_current NUMERIC);

CREATE TABLE voting (
id INTEGER PRIMARY KEY AUTOINCREMENT,
voterId INTEGER,
politicianId INTEGER,
FOREIGN KEY (voterId) REFERENCES voters(id),
FOREIGN KEY (politicianId) REFERENCES politicians(id));


*/