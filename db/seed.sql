\c planify_db

INSERT INTO users(email, pw_digest, username)
VALUES('xshirl525@gmail.com', '$2b$11$vNC97R4lHeDJfibB1NeNTeXcYj2NOcW0sz/DGRRz6j/9QrFnQS/6K',
'xshirl');

INSERT INTO boards (name, user_id)
VALUES ('final project', 1), ('housework', 1);

INSERT INTO lists(name, board_id)
VALUES('To Do', 1), ('In Progress', 1), ('Completed', 1), ('To Do', 2), ('In progress', 2), ('Completed', 2);

INSERT INTO cards (content, list_id)
VALUES ('React components', 1), ('CSS styling', 1), ('Controllers and models', 2),
('User auth', 2), ('Database config', 3);

