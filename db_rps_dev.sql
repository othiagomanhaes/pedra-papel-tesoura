CREATE DATABASE IF NOT EXISTS rpsdb_dev;
USE rpsdb_dev;

CREATE TABLE rounds (
  id INT PRIMARY KEY auto_increment,
  quantity INT NOT NULL
);

CREATE TABLE players (
  id INT PRIMARY KEY auto_increment,
  username VARCHAR(250) NOT NULL,
  email VARCHAR(250) NOT NULL UNIQUE,
  points INT NOT NULL,
  rounds_id INT NOT NULL,
  date DATE NOT NULL,
  FOREIGN KEY (rounds_id) REFERENCES rpsdb_dev.rounds (id)
);

INSERT INTO rpsdb_dev.rounds (quantity) VALUES (5);
INSERT INTO rpsdb_dev.rounds (quantity) VALUES (10);
INSERT INTO rpsdb_dev.rounds (quantity) VALUES (15);


INSERT INTO rpsdb_dev.players VALUES (default, 'oth', 'thiago@email.com', 0, 1, '2023-09-5');
INSERT INTO rpsdb_dev.players VALUES (default, 'test', 'test@email.com', 0, 1, '2023-09-5');
