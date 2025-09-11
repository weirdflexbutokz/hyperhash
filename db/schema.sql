DROP DATABASE IF EXISTS hyperhash;
CREATE DATABASE IF NOT EXISTS hyperhash;
USE hyperhash;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS game_mode (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS hashes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hash VARCHAR(255) NOT NULL UNIQUE,
    word VARCHAR(100) NOT NULL,
    algo VARCHAR(100) NOT NULL,
    points INT NOT NULL,
    player_id INT,
    mode_id INT,
    FOREIGN KEY (player_id) REFERENCES users(id),
    FOREIGN KEY (mode_id) REFERENCES game_mode(id)
);

INSERT INTO game_mode (name) VALUES ('wordlists-starter');
INSERT INTO game_mode (name) VALUES ('wordlists-common');

CREATE USER 'admin'@'localhost' IDENTIFIED BY '1337';
GRANT ALL PRIVILEGES ON hyperhash.* TO 'admin'@'localhost';
FLUSH PRIVILEGES;