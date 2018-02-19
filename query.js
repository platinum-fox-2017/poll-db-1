const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('polldb.db');

// 1 Tampilkan nama politician, partai dan grade_current politician tersebut yang berada 
// di partai R dan memiliki grade_current range 9 s/d 11
let query1 = db.all(`select name,party,grade_current from Politicians
where party = 'R' 
AND grade_current between 9 and 11`,function(err,data){
  if(err){
    console.log(err)
  }else{
    // console.log(data)
  }
});


// 2 Hitung jumlah vote untuk politician yang bernama Olympia Snowe.
let query2 = db.all(`select count(*) as totalVote,Politicians.name from Votes
inner join Politicians on Politicians.id = Votes.politicianId
where Politicians.name = 'Olympia Snowe'`,(err,data)=>{
  if(err){
    console.log(err)
  }else{
    // console.log(data)
  }
})
// 3 Hitung jumlah vote untuk politician yang nama-nya mengandung kataAdam.
let query3 = db.all(`select Politicians.name,count(*) as totalVote from Votes
inner join Politicians on Votes.politicianId =  Politicians.id
where Politicians.name like 'Adam%'
group by Politicians.name`,(err,data)=>{
  if(err){
    console.log(err)
  }else{
    // console.log(data)
  }
})
// 4 Tampilkan 3 Politician beserta nama partai dan lokasi Politician tersebut,
//  yang memiliki suara terbanyak.
let query4 = db.all(`select count(*)as totalVote,Politicians.name,Politicians.party,Politicians.location from Votes
inner join Politicians on Votes.politicianId = Politicians.id
group by Politicians.name
order by totalVote desc
limit 3`,(err,data)=>{
  if(err){
    console.log(err)
  }else{
    // console.log(data)
  }
})
// 5 Tampilkan siapa saja yang melakukan voting ke politician yang bernamaOlympia Snowe
let query5 = db.all(`select Voters.first_name,Voters.last_name,Voters.gender,Voters.age from Voters
inner join Votes on Voters.id = Votes.voterId
where Votes.politicianId = (select id from Politicians where Politicians.name = 'Olympia Snowe')`,(err,data)=>{
  if(err){
    console.log(err)
  }else{
    console.log(data)
  }
})