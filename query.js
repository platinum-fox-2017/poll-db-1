const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

class Query{
    constructor(){

    }
    static find_based_on_party_and_grade(party,grade_lower,grade_upper){
        let query = `select name,party,grade_current
        from candidate
        where party ='${party}'
        and grade_current between '${grade_lower}' and '${grade_upper}' ;`
        db.all(query,(err,rows)=> console.log(rows));
    }
    static count_votes_for(candidate){
        let query = `select count(candidate_id) as totalVote, candidate.name 
        from candidate
        join votes
        on votes.candidate_id = candidate.id
        where candidate.name = '${candidate}'`
        db.all(query,(err,rows)=> console.log(rows));
    }
    static count_votes_for_name(includes_in_name){
        let query = `select candidate.name, count(votes.candidate_id)
        from candidate
        join votes
        on candidate.id = votes.candidate_id
        where candidate.name like '%${includes_in_name}%'
        group by candidate.name;`
        db.all(query,(err,rows)=> console.log(rows));
    }
    static count_top_candidate(limit_amount){
        let query = `select count(votes.candidate_id) as totalVote, candidate.name,candidate.party,candidate.location
        from candidate
        join votes
        on votes.candidate_id = candidate.id 
        group by candidate.name
        order by 1 desc
        limit '${limit_amount}';`
        db.all(query,(err,rows)=> console.log(rows));
    }
    static who_voted_for(candidate){
        let query = `select voter.first_name, voter.last_name, voter.gender, voter.age
        from voter
        join votes
        on voter.id = votes.voter_id
        join candidate
        on votes.candidate_id = candidate.id
        where candidate.name = '${candidate}';`;
        db.all(query,(err,rows)=> console.log(rows));
    }
}

// Query.find_based_on_party_and_grade('R',9,11);
// Query.count_votes_for('Olympia Snowe');
// Query.count_votes_for_name('adam');
// Query.count_top_candidate(3);
// Query.who_voted_for('Olympia Snowe');