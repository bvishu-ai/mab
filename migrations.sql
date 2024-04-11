CREATE TABLE patients (
    p_id serial primary key,
    f_name varchar(20),
    l_name varchar(20),
    email varchar(30),
    passhash varchar(255) not null
);

CREATE TABLE doctors (
    d_id serial primary key,
    name varchar(20),
    email varchar(30),
    passhash varchar(255) not null,
    speciality varchar(30)
);

CREATE TABLE accounts (
    acc_id serial primary key,
    user_email varchar(30) not null,
    passhash varchar(255) not null,
    account_type int not null,
    detail_id int not null
);

CREATE TABLE doctor_rfid (
    id SERIAL PRIMARY KEY,
    d_id VARCHAR(255) NOT NULL,
    rfid_tag VARCHAR(255) NOT NULL,
    assigned_room VARCHAR(255) NOT NULL
);

CREATE TABLE room_occupancy (
    id SERIAL PRIMARY KEY,
    doctor_id INT,
    room_status VARCHAR(3) CHECK (room_status IN ('IN', 'OUT')) DEFAULT 'OUT',
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);

CREATE TABLE doctor_schedule (
    doctor_id INT,
    day_of_week VARCHAR(9) CHECK (day_of_week IN ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')) NOT NULL,
    shift_start TIME NOT NULL,
    shift_end TIME NOT NULL,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);