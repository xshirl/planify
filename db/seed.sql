\c planify_db

INSERT INTO users(email, pw_digest, username)
VALUES('xshirl525@gmail.com', '$2b$11$vNC97R4lHeDJfibB1NeNTeXcYj2NOcW0sz/DGRRz6j/9QrFnQS/6K',
'xshirl');

INSERT INTO boards (name, user_id)
VALUES ('final project', 1), ('housework', 1);

INSERT INTO lists(name, board_id)
VALUES('React components', 1), ('CSS styling', 1), ('User auth', 1), ('clean room', 2), ('do laundry', 2), ('make bed', 2);

INSERT INTO cards (content, list_id)
VALUES ('React components', 1), ('CSS styling', 1), ('Controllers and models', 2),
('User auth', 2), ('Database config', 3);

