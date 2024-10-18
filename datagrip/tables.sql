create table "users"
(
    id int primary key,
    discord_id int unique,
    username varchar(10) not null,
    created_at timestamp not null
);
create table "counts" (
    id int primary key,
    reservationCount int not null default(0),
    projectCount int not null default(0),
    winCount int not null default(0)
);
create table "reservations"
(
    id int primary key,
    deviceId int not null,
    project text,
    timeslot int not null
);
create table "projects" (
    id int primary key,
    name varchar(30) not null,
    catagory varchar(10) not null,
    description text,
    date timestamp not null ,
    endDate timestamp
);
create table "accounts" (
    id     int primary key,
    userId int
);
