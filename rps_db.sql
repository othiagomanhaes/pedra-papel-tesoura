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
  date DATE NOT NULL,
  total_points INT NULL,
  level INT NULL,
  bio VARCHAR(250) NULL,
  image VARCHAR(250) NULL
);

CREATE TABLE rpsdb_dev.games (
  username_id INT NOT NULL,
  rounds_id INT NOT NULL,
  points INT NOT NULL,
  date DATE NOT NULL,
  FOREIGN KEY (username_id) REFERENCES rpsdb_dev.players (id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (rounds_id) REFERENCES rpsdb_dev.rounds (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE rpsdb_dev.statistic (
  username_id INT NOT NULL,
  victory INT NOT NULL,
  draw INT NOT NULL,
  defeat INT NOT NULL,
  rounds INT NOT NULL,
  matchs INT NOT NULL,
  FOREIGN KEY (username_id) REFERENCES rpsdb_dev.players (id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO rpsdb_dev.rounds (quantity) VALUES (5);
INSERT INTO rpsdb_dev.rounds (quantity) VALUES (10);
INSERT INTO rpsdb_dev.rounds (quantity) VALUES (15);


INSERT INTO rpsdb_dev.players VALUES (default, 'oth', 'thiago@email.com', '2023-09-5', 0, 0, '', '');
INSERT INTO rpsdb_dev.players VALUES (default, 'test', 'test@email.com', '2023-09-5', 0, 0, '', '');


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
--   date DATE,
--   total_points INT NULL,
--   level INT NULL,
--   bio VARCHAR(250) NULL,
--   image VARCHAR(250) NULL
-- );

-- CREATE TABLE rpsdb_prod.games (
--   id INT PRIMARY KEY auto_increment,
--   username_id INT NOT NULL,
--   rounds_id INT NOT NULL,
--   points INT NOT NULL,
--   date DATE NOT NULL,
--   FOREIGN KEY (username_id) REFERENCES rpsdb_prod.players (id) ON DELETE CASCADE ON UPDATE CASCADE,
--   FOREIGN KEY (rounds_id) REFERENCES rpsdb_prod.rounds (id) ON DELETE CASCADE ON UPDATE CASCADE
-- );

-- CREATE TABLE rpsdb_prod.statistic (
--   username_id INT NOT NULL,
--   victory INT NOT NULL,
--   draw INT NOT NULL,
--   defeat INT NOT NULL,
--   rounds INT NOT NULL,
--   matchs INT NOT NULL,
--   FOREIGN KEY (username_id) REFERENCES rpsdb_prod.players (id) ON DELETE CASCADE ON UPDATE CASCADE
-- );

-- INSERT INTO rpsdb_prod.rounds (quantity) VALUES (5);
-- INSERT INTO rpsdb_prod.rounds (quantity) VALUES (10);
-- INSERT INTO rpsdb_prod.rounds (quantity) VALUES (15);


INSERT INTO rpsdb_prod.players VALUES (default, 'oth', 'thiago@email.com','2023-09-5', 0, 0, '', '');
INSERT INTO rpsdb_prod.players VALUES (default, 'test', 'test@email.com', '2023-09-5', 0, 0, '', '');