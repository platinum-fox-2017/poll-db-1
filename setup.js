//your code here
/*
CREATE TABLE Voters (
    idVoters integer PRIMARY KEY,
    firstName varchar(48) NOT NULL,
    lastName varchar(48) NOT NULL,
    gender varchar(48) NOT NULL,
    age INT NOT NULL
);

CREATE TABLE Politicians (
    idPoliticians integer PRIMARY KEY,
    name varchar(48) NOT NULL,
    party varchar(48) NOT NULL,
    location varchar(48) NOT NULL,
    gradeCurrent INT NOT NULL
);

CREATE TABLE VotersPoliticians (
    idVotersPoliticians integer PRIMARY KEY,
    idVoters integer NOT NULL,
    idPoliticians integer NOT NULL,
    FOREIGN KEY (idVoters) REFERENCES Voters (idVoters),
    FOREIGN KEY (idPoliticians) REFERENCES Politicians (idPoliticians)
);


*/