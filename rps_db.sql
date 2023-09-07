-- BANCO DE DESENVOLVIMENTO
CREATE DATABASE IF NOT EXISTS rpsdb_dev;
USE rpsdb_dev;

CREATE TABLE rpsdb_dev.rounds (
  id INT PRIMARY KEY auto_increment,
  quantity INT NOT NULL
);

CREATE TABLE rpsdb_dev.players (
  id INT PRIMARY KEY auto_increment,
  username VARCHAR(250) NOT NULL UNIQUE,
  email VARCHAR(250) NOT NULL UNIQUE,
  date DATE NOT NULL
);

CREATE TABLE rpsdb_dev.games (
  username_id INT NOT NULL,
  rounds_id INT NOT NULL,
  points INT NOT NULL,
  date DATE NOT NULL,
  FOREIGN KEY (username_id) REFERENCES rpsdb_dev.players (id),
  FOREIGN KEY (rounds_id) REFERENCES rpsdb_dev.rounds (id)
);

INSERT INTO rpsdb_dev.rounds (quantity) VALUES (5);
INSERT INTO rpsdb_dev.rounds (quantity) VALUES (10);
INSERT INTO rpsdb_dev.rounds (quantity) VALUES (15);


INSERT INTO rpsdb_dev.players VALUES (default, 'oth', 'thiago@email.com', '2023-09-5');
INSERT INTO rpsdb_dev.players VALUES (default, 'test', 'test@email.com', '2023-09-5');


-- BANCO DE PRODUÇÃO
-- CREATE DATABASE IF NOT EXISTS rpsdb_prod;
-- USE rpsdb_prod;

-- CREATE TABLE rpsdb_prod.rounds (
--   id INT PRIMARY KEY auto_increment,
--   quantity INT NOT NULL
-- );

-- CREATE TABLE rpsdb_prod.players (
--   id INT PRIMARY KEY auto_increment,
--   username VARCHAR(250) NOT NULL UNIQUE,
--   email VARCHAR(250) NOT NULL UNIQUE,
--   date DATE
-- );

-- CREATE TABLE rpsdb_prod.games (
--   username_id INT NOT NULL,
--   rounds_id INT NOT NULL,
--   points INT NOT NULL,
--   date DATE NOT NULL,
--   FOREIGN KEY (username_id) REFERENCES rpsdb_prod.players (id),
--   FOREIGN KEY (rounds_id) REFERENCES rpsdb_prod.rounds (id)
-- );

-- INSERT INTO rpsdb_prod.rounds (quantity) VALUES (5);
-- INSERT INTO rpsdb_prod.rounds (quantity) VALUES (10);
-- INSERT INTO rpsdb_prod.rounds (quantity) VALUES (15);


-- INSERT INTO rpsdb_prod.players VALUES (default, 'oth', 'thiago@email.com','2023-09-5');
-- INSERT INTO rpsdb_prod.players VALUES (default, 'test', 'test@email.com', '2023-09-5');

