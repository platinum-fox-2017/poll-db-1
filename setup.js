const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

db.serialize(()=>{
    db.run(`create table if not exists candidate
    (id integer primary key autoincrement,
     name varchar,
     party varchar,
     location varchar,
     grade_current integer)`);
    db.run(`create table if not exists voter
    (id integer primary key autoincrement,
     first_name varchar,
     last_name varchar,
     gender varchar,
     age integer)`);
    db.run(`create table if not exists votes
    (id integer primary key autoincrement,
     voter_id integer,
     candidate_id integer,
     foreign key (candidate_id) references candidate(id),
     foreign key (voter_id) references voter(id))`);
});
db.close();