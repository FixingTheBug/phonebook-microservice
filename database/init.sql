CREATE TABLE companies(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    UNIQUE (name, phone)
);

CREATE TABLE contacts (
	id SERIAL PRIMARY KEY,
	first_name VARCHAR (255) NOT NULL,
	last_name VARCHAR (255) NOT NULL,
	email VARCHAR (255) UNIQUE NOT NULL,
	cell_number VARCHAR(20) NOT NULL,
    company_id INT NOT NULL,
    FOREIGN KEY(company_id)
        REFERENCES companies(id)
);
