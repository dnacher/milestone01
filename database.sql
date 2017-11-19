CREATE DATABASE budget;

CREATE TABLE user(
	id int NOT NULL,
	name VARCHAR(100) NOT NULL,
	password VARCHAR(100) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE budget(
	id int NOT NULL,
	user_id int,
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE value(
	id int,
	name VARCHAR(100),
	description VARCHAR(100),
	value INT,
	id_value_type INT,
	value_form_id INT,
	PRIMARY KEY (id),
	FOREIGN KEY (id_value_type) REFERENCES user(value_type)
);

CREATE TABLE value_type(
	id INT,
	name VARCHAR(100),
	description VARCHAR(100),
	value INT,
	value_type INT,
	PRIMARY KEY (id)
);

CREATE USER root WITH PASSWORD 'root';
GRANT SELECT, INSERT, UPDATE ON user TO root;

INSERT INTO user (id, name, password)
VALUES (0, 'Martin', 'Martin');

INSERT INTO user (id, name, password)
VALUES (0, 'James', 'James');

INSERT INTO user (id, name, password)
VALUES (0, 'Steve', 'Steve');

INSERT INTO user (id, name, password)
VALUES (0, 'Maria', 'Maria');