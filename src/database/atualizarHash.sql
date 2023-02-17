-- Active: 1675369654899@@127.0.0.1@3306
-- atualizar senhas para hashes bcrypt

UPDATE users
SET 
  password = "$2a$12$kJdmNr5EhoHVYaWbNGHgQOXbbU/Cmzwif3.LwKXwXkrOinmGjIeRu",
  id = "3304bc03-0efd-4d18-8e73-613f8234fede"
WHERE name = "Fulano";
-- plaintext = fulano123


UPDATE users
SET 
  password = "$2a$12$YdTROPzZN6HhXDOdHHWFAuNSxqF1TnnbM5W5woVLTdWWh9fa3zB1i",
  id = "d9479691-82ec-4a82-a8a8-8972fc391be3"
WHERE name = "Sicrano";
-- plaintext = sicrano123

UPDATE users
SET 
  password = "$2a$12$pQEwN1RRQUdsHMGC8OXTvOv94fU6rE3vV7B7jf7ZBa1w3xVd/kyBK",
  id = "8ef76a8b-b251-40fa-9dbc-960ba4734166"
WHERE name = "Túlio";
-- plaintext = tulio123

UPDATE users
SET 
  password = "$2a$12$joCf//yJjOkNcgYOws7bru9OOYTqrzVtZLlfUmGvXqY0s8Z1bioL.",
  id = "350847ee-af53-4b16-b6e3-9ae8429119af"
WHERE name = "Francisca";
-- plaintext = francisca123

UPDATE users
SET 
  password = "$2a$12$om6C3stDm1YopmJUO2yLnuG0pIZg8DiMG5OPBqflNtlwSBDJ4NJFe",
  id = "65d52196-117a-4fda-a240-be811f50d666"
WHERE name = "Severino";
-- plaintext = severino123

UPDATE users
SET 
  password = "$2a$12$.mD7CGH2PaGzgmm.jG4N1Ou/eQB9hbSCOBMasoKRcS5SdKwMjQ5Uy",
  id = "1a71770d-a504-45fe-abfa-c5b298753af8"
WHERE name = "Janaina";
-- plaintext = janaina123