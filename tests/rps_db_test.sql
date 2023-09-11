DROP DATABASE IF EXISTS rpsdb_test;
CREATE DATABASE IF NOT EXISTS rpsdb_test;
USE rpsdb_test;

CREATE TABLE rpsdb_test.rounds (
  id INT PRIMARY KEY auto_increment,
  quantity INT NOT NULL
);

CREATE TABLE rpsdb_test.players (
  id INT PRIMARY KEY auto_increment,
  username VARCHAR(250) NOT NULL UNIQUE,
  email VARCHAR(250) NOT NULL UNIQUE,
  date DATE
);

CREATE TABLE rpsdb_test.games (
  id INT PRIMARY KEY auto_increment,
  username_id INT NOT NULL,
  rounds_id INT NOT NULL,
  points INT NOT NULL,
  date DATE NOT NULL,
  FOREIGN KEY (username_id) REFERENCES rpsdb_test.players (id),
  FOREIGN KEY (rounds_id) REFERENCES rpsdb_test.rounds (id),
  PRIMARY KEY (username_id, rounds_id)
);

INSERT INTO rpsdb_test.rounds (quantity) VALUES (5);
INSERT INTO rpsdb_test.rounds (quantity) VALUES (10);
INSERT INTO rpsdb_test.rounds (quantity) VALUES (15);


INSERT INTO rpsdb_test.players VALUES (default, 'oth', 'thiago@email.com', '2023-09-5');
INSERT INTO rpsdb_test.players VALUES (default, 'test', 'test@email.com', '2023-09-5');