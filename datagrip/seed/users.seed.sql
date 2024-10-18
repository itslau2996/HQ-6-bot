-- Test data for users table
INSERT INTO "users" (discordId, username, created_at) VALUES
('123456789012345', 'UserOne', '2023-01-01 09:00:00'),
('987654321098765', 'UserTwo', '2023-02-10 10:15:00'),
('192837465012345', 'UserThree', '2023-03-15 11:30:00'),
('109876543210987', 'UserFour', '2023-04-20 14:45:00'),
('564738291056473', 'UserFive', '2023-05-25 16:00:00');

-- Test data for counts table
INSERT INTO "counts" (reservationCount, projectCount, winCount) VALUES
(2, 1, 5),
(1, 3, 2),
(0, 2, 1),
(4, 0, 3),
(3, 5, 0);

-- Test data for devices table
INSERT INTO "devices" (deviceName) VALUES
('Device A'),
('Device B'),
('Device C'),
('Device D'),
('Device E');

-- Test data for projects table
INSERT INTO "projects" (name, category, description, date, endDate) VALUES
('Project Alpha', 'Tech', 'A project focused on AI development.', '2024-01-01 10:00:00', '2024-06-01 17:00:00'),
('Project Beta', 'Health', 'Research on health data analytics.', '2023-11-10 09:30:00', '2024-03-15 18:00:00'),
('Project Gamma', 'Education', 'E-learning platform development.', '2024-02-20 08:45:00', NULL),
('Project Delta', 'Finance', 'Financial risk analysis system.', '2024-03-01 12:00:00', '2024-12-01 16:00:00'),
('Project Epsilon', 'Tech', 'Blockchain-based project management tool.', '2024-05-10 13:00:00', NULL);

-- Test data for accounts table
INSERT INTO "accounts" (birthday, created_at, specialties) VALUES
('1985-05-15 00:00:00', '2023-01-01 09:00:00', ARRAY['Java', 'Python']),
('1990-08-22 00:00:00', '2023-03-05 10:00:00', ARRAY['SQL', 'Data Analysis']),
('1992-12-05 00:00:00', '2023-07-19 11:30:00', ARRAY['Project Management', 'Agile']),
('1988-03-18 00:00:00', '2023-09-25 14:00:00', ARRAY['Blockchain', 'Cloud Computing']),
('1979-11-30 00:00:00', '2023-12-12 08:45:00', ARRAY['Cybersecurity', 'DevOps']);

-- Test data for reservations table
INSERT INTO "reservations" (userid, deviceId, project, timeslot) VALUES
(1, 1, 'Project Alpha', 1),
(2, 2, 'Project Beta', 2),
(3, 3, 'Project Gamma', 3),
(4, 4, 'Project Delta', 4),
(5, 5, 'Project Epsilon', 5);

-- Test data for accounts-join table
INSERT INTO "accounts-join" (userId, countId, accountId) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(4, 4, 4),
(5, 5, 5);

-- Test data for projectUserHistory table
INSERT INTO "projectUserHistory" (projectId, userId, role, roleDescription, link) VALUES
(1, 1, 'Developer', 'Worked on backend systems for AI model training', 'https://github.com/userone/project-alpha'),
(2, 2, 'Data Analyst', 'Analyzed health data trends and patterns', 'https://github.com/usertwo/project-beta'),
(3, 3, 'Project Manager', 'Managed the e-learning platform development team', 'https://github.com/userthree/project-gamma'),
(4, 4, 'Financial Analyst', 'Assessed financial risks for the system', 'https://github.com/userfour/project-delta'),
(5, 5, 'Blockchain Engineer', 'Developed blockchain-based project management tools', 'https://github.com/userfive/project-epsilon');
