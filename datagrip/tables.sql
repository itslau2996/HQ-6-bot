DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
CREATE TABLE "users"
(
    userId     int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    discordId  varchar(15) UNIQUE,
    username   varchar(10) NOT NULL,
    created_at timestamp   NOT NULL
);
CREATE TABLE "counts"
(
    CountId          int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    reservationCount int NOT NULL DEFAULT (0),
    projectCount     int NOT NULL DEFAULT (0),
    winCount         int NOT NULL DEFAULT (0)
);
CREATE TABLE "nodeScheduling"
(
    nodeId   int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    cronTime varchar(20) NOT NULL,
    type     varchar(10) NOT NULL
);
CREATE TABLE "ResetTablesAt"
(
    tableResetId int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title        varchar(10) NOT NULL,
    description  text        NOT NULL,
    nodeId       int         NOT NULL,
    CONSTRAINT foreign_key
        FOREIGN KEY (nodeId)
            REFERENCES "nodeScheduling" (nodeId)

);
CREATE TABLE "notificationsScheduling"
(
    notificationId          int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title                   varchar(10)  NOT NULL,
    notificationTitle       varchar(256) NOT NULL,
    notificationDescription varchar(4096),
    notificationImage       text,
    nodeId                  int          NOT NULL,
    CONSTRAINT foreign_key
        FOREIGN KEY (nodeId)
            REFERENCES "nodeScheduling" (nodeId)

);

CREATE TABLE "devices"
(
    deviceId   int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    deviceName varchar(20)
);
CREATE TABLE "projects"
(
    projectId   int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name        varchar(30) NOT NULL,
    category    varchar(10) NOT NULL,
    description text,
    date        timestamp   NOT NULL,
    endDate     timestamp
);
CREATE TABLE "accounts"
(
    accountId   int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    birthday    timestamp,
    created_at  timestamp NOT NULL,
    specialties text[]
);
CREATE TABLE "reservations"
(
    reservationsId int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    userid         int NOT NULL,
    deviceId       int NOT NULL,
    project        text,
    timeslot       int NOT NULL,
    CONSTRAINT foreign_keys
        FOREIGN KEY (userid)
            REFERENCES users (userId),
    FOREIGN KEY (deviceId)
        REFERENCES devices (deviceId)
        ON DELETE CASCADE
);
CREATE TABLE "accounts-join"
(
    id        int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    userId    int NOT NULL,
    countId   int NOT NULL,
    accountId int NOT NULL,
    CONSTRAINT foreign_keys
        FOREIGN KEY (accountId)
            REFERENCES accounts (accountId),
    FOREIGN KEY (countId)
        REFERENCES counts (CountId),
    FOREIGN KEY (userId)
        REFERENCES users (userId)
        ON DELETE CASCADE
);
CREATE TABLE "projectUserHistory"
(
    projectUserHistoryId int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    projectId            int         NOT NULL,
    userId               int         NOT NULL,
    role                 varchar(20) NOT NULL,
    roleDescription      text        NOT NULL,
    link                 text,
    CONSTRAINT foreign_key
        FOREIGN KEY (projectId)
            REFERENCES projects (projectId),
    FOREIGN KEY (userId)
        REFERENCES users (userId)
        ON DELETE CASCADE
)
