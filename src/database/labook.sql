-- Active: 1675369654899@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

CREATE TABLE posts (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER NOT NULL,
    dislikes INTEGER NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    update_at TEXT DEFAULT NULL,
    FOREIGN KEY (creator_id) REFERENCES users (id)
);

CREATE TABLE likes_dislikes(
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (post_id) REFERENCES posts (id)
);

INSERT INTO users (id, name, email, password, role)
VALUES
    ("u001", "Fulano", "fulano@email.com", "123456", "ADMIN"),
    ("u002", "Sicrano", "sicrano@email.com", "123456", "NORMAL"),
    ("u003", "Túlio", "tulio@email.com", "123456", "NORMAL");

INSERT INTO posts (id, creator_id, content, likes, dislikes)
VALUES
    ("p001", "u002", "Hoje está chovendo", 23, 2),
    ("p002", "u003", "Flamengo Campeão Mundial 2022", 589, 36),
    ("p003", "u001", "Chega de Bananinha", 252, 2);


INSERT INTO likes_dislikes (user_id, post_id, like)
VALUES
    ("u001", "p003", 2),
    ("u002", "p001", 5),
    ("u003", "p002", 8);

SELECT * FROM users;
SELECT * FROM posts;
SELECT * FROM likes_dislikes;