-- Active: 1675369654899@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NULL,
    created_at TEXT NOT NULL
);

CREATE TABLE posts (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER DEFAULT(0) NOT NULL,
    dislikes INTEGER DEFAULT(0) NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users (id)
);

CREATE TABLE likes_dislikes(
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (post_id) REFERENCES posts (id)
);

INSERT INTO users (id, name, email, password, role, created_at)
VALUES
    ("u001", "Fulano", "fulano@email.com", "123456", "ADMIN", "2023-02-12T14:22:31.985Z"),
    ("u002", "Sicrano", "sicrano@email.com", "123456", "NORMAL", "2023-02-12T14:22:31.985Z"),
    ("u003", "Túlio", "tulio@email.com", "123456", "NORMAL", "2023-02-12T14:22:31.985Z"),
    ("u004", "Francisca", "francisca@email.com", "123456", "ADMIN", "2023-02-12T14:22:31.985Z"),
    ("u005", "Severino", "severino@email.com", "123456", "NORMAL", "2023-02-12T14:22:31.985Z"),
    ("u006", "Janaina", "janaina@email.com", "123456", "NORMAL", "2023-02-12T14:22:31.985Z");


INSERT INTO posts (id, creator_id, content, created_at, updated_at)
VALUES
    ("p001", "u002", "Hoje está chovendo", "2023-02-12T14:22:35.985Z", "2023-02-12T14:22:35.985Z"),
    ("p002", "u003", "Maior calor", "2023-02-12T14:22:35.985Z", "2023-02-12T14:22:35.985Z"),
    ("p003", "u001", "Chega de Bananinha", "2023-02-12T14:22:35.985Z", "2023-02-12T14:22:35.985Z"),
    ("p004", "u005", "Chega de pokemóns", "2023-02-12T14:22:35.985Z", "2023-02-12T14:22:35.985Z"),
    ("p005", "u006", "Flamengo melhor time", "2023-02-12T14:22:35.985Z", "2023-02-12T14:22:35.985Z"),
    ("p006", "u004", "Não sei o que escrever", "2023-02-12T14:22:35.985Z", "2023-02-12T14:22:35.985Z");


INSERT INTO likes_dislikes (user_id, post_id, like)
VALUES
    ("u001", "p004", 1),
    ("u002", "p005", 1),
    ("u003", "p003", 0),
    ("u006", "p006", 1),
    ("u005", "p001", 0),
    ("u004", "p002", 1);


SELECT * FROM users;
SELECT * FROM posts;
SELECT * FROM likes_dislikes;
DROP TABLE users;
DROP TABLE posts;
DROP TABLE likes_dislikes;