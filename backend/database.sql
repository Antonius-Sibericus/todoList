-- создать базу данных "todoapp"

CREATE DATABASE todoapp;

-- создать расширение "uuid"

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- создать таблицу "user"

CREATE TABLE users (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_surname VARCHAR(255) NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    user_paternal VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_chief uuid,
    FOREIGN KEY (user_chief) REFERENCES chiefs (chief_id)
);

-- создать таблицу "tasks"

CREATE TABLE tasks (
    task_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    task_title VARCHAR(255) NOT NULL,
    task_desc VARCHAR(255) NOT NULL,
    task_priority INTEGER NOT NULL,
    task_status INTEGER NOT NULL,
    task_created VARCHAR(255) NOT NULL,
    task_updated VARCHAR(255) NOT NULL,
    task_finished VARCHAR(255) NOT NULL,
    task_creator uuid,
    task_responsible uuid,
    FOREIGN KEY (task_creator) REFERENCES users (user_id),
    FOREIGN KEY (task_responsible) REFERENCES responsibles (resp_id)
);

-- создать таблицу "responsibles"

CREATE TABLE responsibles (
    resp_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    resp_user_id uuid,
    resp_surname VARCHAR(255) NOT NULL,
    resp_name VARCHAR(255) NOT NULL,
    resp_paternal VARCHAR(255) NOT NULL,
    resp_email VARCHAR(255) NOT NULL,
    resp_chief uuid,
    FOREIGN KEY (resp_user_id) REFERENCES users (user_id),
    FOREIGN KEY (resp_surname) REFERENCES users (user_surname),
    FOREIGN KEY (resp_name) REFERENCES users (user_name),
    FOREIGN KEY (resp_paternal) REFERENCES users (user_paternal),
    FOREIGN KEY (resp_email) REFERENCES users (user_email),
    FOREIGN KEY (resp_chief) REFERENCES users (user_chief)
);

-- создать таблицу "chiefs"

CREATE TABLE chiefs (
    chief_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    chief_surname VARCHAR(255) NOT NULL,
    chief_name VARCHAR(255) NOT NULL,
    chief_paternal VARCHAR(255) NOT NULL,
    chief_email VARCHAR(255) NOT NULL,
    chief_user_id uuid,
    FOREIGN KEY (chief_surname) REFERENCES users (user_surname),
    FOREIGN KEY (chief_name) REFERENCES users (user_name),
    FOREIGN KEY (chief_paternal) REFERENCES users (user_paternal),
    FOREIGN KEY (chief_email) REFERENCES users (user_email),
    FOREIGN KEY (user_chief) REFERENCES chiefs (chief_id)
);