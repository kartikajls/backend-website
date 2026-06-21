

CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100)
);

ALTER TABLE users
ADD COLUMN password VARCHAR(100);

select * from users;