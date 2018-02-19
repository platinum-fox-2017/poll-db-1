var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database.db');
var Table = require('cli-table')

// selectRating(9,11)

//RELEASE 2
function addPolitician(name,party,location,grade_current){
  db.run(`INSERT INTO Politician(name,party,location,grade_current)
          VALUES ($name,$party,$location,$grade_current)`,
          {
            $name:name,
            $party:party,
            $location:location,
            $grade_current:grade_current
          })
}

// addPolitician('agrha','PDI P','Cirebon','12')

function addVoters(first_name,last_name,gender,age){
  db.run(`INSERT INTO Voters(first_name,last_name,gender,age)
          VALUES ($first_name,$last_name,$gender,$age)`,
          {
            $first_name:first_name,
            $last_name:last_name,
            $gender:gender,
            $age:age
          })
}

// addVoters('agrha','prayogo','male',25)

function addVotes(PoliticianID,VotersID){
  db.run(`INSERT INTO Votes(PoliticianID,VotersID)
          VALUES ($PoliticianID,$VotersID)`,
        {
          $PoliticianID:PoliticianID,
          $VotersID:VotersID
        })
}

// addVotes(21,151)

function editPolitician(id,name,party,location,grade_current){
  // console.log(id,name,party,location,grade_current);
  db.run(`UPDATE Politician
          SET name = "${name}",
              party= "${party}",
              location= "${location}",
              grade_current= "${grade_current}"
          WHERE PoliticianID = ${id}`,
        )
}
// editPolitician(21,'agrhaganteng','demokrat','bandung','9')

function editVoters(id,first_name,last_name,gender,age){
  db.run(`UPDATE Voters
          SET first_name = "${first_name}",
              last_name= "${last_name}",
              gender= "${gender}",
              age = "${age}"
          WHERE VotersID = ${id}`,
        )
}

// editVoters(151,'agrha','ganteng','female',23)

function editVotes(id,PoliticianID,VotersID){
  db.run(`UPDATE Votes
          SET PoliticianID = "${PoliticianID}",
              VotersID= "${VotersID}"
          WHERE VotersID = ${id}`,
        )
}

// editVotes(164,148,19)

function deletePolitician(id){
  db.run(`DELETE FROM Politician
          WHERE PoliticianID = ${id}`,
        )
}

// deletePolitician(21)

function deleteVoters(id){

  db.run(`DELETE FROM Voters
          WHERE VotersID = ${id}`,
        )
}

// deleteVoters(151)

function deleteVotes(id){
  db.run(`DELETE FROM Votes
          WHERE VotesID = ${id}`,
        )
}

// deleteVotes(164)

//RELEASE 3

function selectPoliticianRating(min,max){
  let query = `SELECT name,party,grade_current
          FROM Politician
          WHERE grade_current BETWEEN ${min} and ${max} and party = "R"
          ORDER BY grade_current ASC`
  var table = new Table({
    head: ['Name', 'Party','Grade Current']
  });
  db.all(query,function(err,data){
          for(let i =0;i<data.length;i++){
            table.push(
              [`${data[i].name}`,`${data[i].party}`,`${data[i].grade_current}`]
            )
          }
            console.log(table.toString())
          }
        )
}

selectPoliticianRating(9,11)

function countVote(name){
  let query = `SELECT COUNT(*) as TotalVote, name FROM Politician
               LEFT JOIN Votes ON Politician.PoliticianID = Votes.politicianID
               WHERE Politician.name = '${name}'`
  var table = new Table({
    head: ['Name','TotalVote']
  });
  db.all(query, function(err,data){
    for(let i =0;i<data.length;i++){
      table.push(
        [`${data[i].name}`,`${data[i].TotalVote}`]
      )
    }
      console.log(table.toString())
          }
        )
}

countVote('Olympia Snowe')


function countVoteByName(name){
  let query = `SELECT Politician.name,COUNT(*) as TotalVote FROM Votes
               LEFT JOIN Politician ON  Votes.politicianID = Politician.PoliticianID
               WHERE Politician.name LIKE '${name}%'
               GROUP BY Politician.name`
  var table = new Table({
   head: ['Name','TotalVote']
  });
  db.all(query,function(err,data){
    for(let i =0;i<data.length;i++){
      table.push(
        [`${data[i].name}`,`${data[i].TotalVote}`]
      )
    }
      console.log(table.toString())
          }
        )
}
countVoteByName('Adam')


function mostElectedPolitician(limit){
  let query = `SELECT COUNT(*) as TotalVote, name, party, location FROM Politician
               LEFT JOIN Votes ON Politician.PoliticianID = Votes.politicianID
               GROUP BY name
               ORDER BY TotalVote DESC
               LIMIT ${limit}`
  var table = new Table({
    head: ['Name','TotalVote','Party','Location']
  });
  db.all(query, function(err,data){
    for(let i =0;i<data.length;i++){
      table.push(
        [`${data[i].name}`,`${data[i].TotalVote}`,`${data[i].party}`,`${data[i].location}`]
      )
    }
      console.log(table.toString())

          }
        )
}
mostElectedPolitician(3)

//subquery
function searchTheVoters(name){
let searchName = `SELECT PoliticianID FROM Politician WHERE name = '${name}'`
let query = `SELECT first_name,last_name,gender,age FROM Voters
             LEFT JOIN Votes ON Voters.VotersID = Votes.votersId
            WHERE Votes.politicianID = (${searchName})
            GROUP BY Votes.votersID`
var table = new Table({
  head: ['First Name','Last Name','Gender','Age']
});
db.all(query, function(err,data){
  // console.log(data);
  for(let i =0;i<data.length;i++){
    table.push(
      [`${data[i].first_name}`,`${data[i].last_name}`,`${data[i].gender}`,`${data[i].age}`]
    )
  }
    console.log(table.toString())
      }
    )
}
searchTheVoters('Olympia Snowe')
