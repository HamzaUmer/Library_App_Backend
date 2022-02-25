CREATE DATABASE studentsBookList;

CREATE TABLE booksList (
    s_no SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(355) NOT NULL,
    book_name VARCHAR(255) NOT NULL,
    author  VARCHAR(255) NOT NULL,
    borrowed_by VARCHAR(255),
    date_of_borrow DATE NOT NULL DEFAULT CURRENT_DATE,
    expected_data_of_return DATE NOT NULL
);