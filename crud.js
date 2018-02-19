var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database.db');
 
const insert = (name,party,location,grade_current) =>{
    db.run(`INSERT INTO Politicians
        VALUES(null, "${name}", "${party}", "${location}", ${grade_current})`)
}

const updateById = id =>{
    db.run("UPDATE Politicians SET name = ? , party = ? WHERE id = ? ",["Anna Dia","SE", id]);
}

const deleteById = id =>{
    db.run(`DELETE FROM Politicians WHERE id = ${id}`)
}

insert('Ila Lofgren','C','IH',11.29643582)
updateById(21)
deleteById(21)