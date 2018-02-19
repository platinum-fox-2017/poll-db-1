const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./pool1.db');
db.serialize(function() {
db.run("CREATE TABLE IF NOT EXISTS voters (id_voters integer PRIMARY KEY AUTOINCREMENT,first_name text NOT NULL,last_name text NOT NULL,gender text NOT NULL,age integer NOT NULL)");
db.run("CREATE TABLE IF NOT EXISTS votes (id_votes integer PRIMARY KEY AUTOINCREMENT,voterid integer NOT NULL,politikid  integer NOT NULL,FOREIGN KEY (voterid) REFERENCES voters(id_voters),FOREIGN KEY (politikid) REFERENCES politik(id_politik))")
db.run("CREATE TABLE IF NOT EXISTS politik (id_politik integer PRIMARY KEY AUTOINCREMENT,name text NOT NULL,party text NOT NULL,location text NOT NULL,grade_current real NOT NULL)")
});
db.close()
