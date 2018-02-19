const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./pool1.db');

db.serialize(function() {
  db.all('SELECT name,party,location,grade_current FROM politik WHERE grade_current>=$awal AND grade_current<=$akhir AND party=$partai',{
    $awal:9,
    $akhir:11,
    $partai:'R'
  },function(err,rows) {
    if (err) {
      return console.error(err.message);
    }else{
      console.log('========nama politician======');
      console.log();
      return console.log(rows)
    }
  });
});


db.serialize(function() {

  db.all("SELECT COUNT(*) AS totalvote,name FROM votes LEFT JOIN politik ON votes.politikid=politik.id_politik where politik.name='Olympia Snowe'",function(err,rows) {
    if (err) {
      return console.error(err.message);
    }else{
      console.log();
      console.log('========total vote olympia snowe======');

      return console.log(rows)
    }
  });
});


db.serialize(function() {

  db.all("SELECT politik.name,COUNT(*) AS totalvote FROM votes LEFT JOIN politik ON votes.politikid=politik.id_politik where politik.name LIKE '%Adam%' GROUP BY politik.name",function(err,rows) {
    if (err) {
      return console.error(err.message);
    }else{
      console.log();
      console.log('========total politisi yang memiliki nama adam======');

      return console.log(rows)
    }
  });
});

db.serialize(function() {

  db.all("SELECT COUNT(*) AS totalvote,politik.name,politik.party,politik.location FROM votes LEFT JOIN politik ON votes.politikid=politik.id_politik GROUP BY politik.name ORDER BY totalvote DESC LIMIT 3",function(err,rows) {
    if (err) {
      return console.error(err.message);
    }else{
      console.log();
      console.log('========3 teratas yang memiliki suara terbanyak======');

      return console.log(rows)
    }
  });
});

db.serialize(function() {

  db.all("SELECT voters.first_name,voters.last_name,gender,voters.age FROM votes LEFT JOIN voters ON votes.voterid=voters.id_voters LEFT JOIN politik ON votes.politikid=politik.id_politik WHERE politik.name='Olympia Snowe'",function(err,rows) {
    if (err) {
      return console.error(err.message);
    }else{
      console.log();
      console.log('========voting ke olympia======');

      return console.log(rows)
    }
  });
});

db.close()
