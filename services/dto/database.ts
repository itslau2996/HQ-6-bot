export interface Users {
    userId: number,
    discordId: string,
    username: string,
    created_at: string;
}
export interface Counts {
    CountID: number,
    reservationCount: number,
    projectCount: number,
    winCount: number;
}

export interface NodeScheduling {
    nodeId: number,
    cronTime: string,
    type: string;
}
export interface ResetTablesAt {
    tableResetID: number,
    title: string,
    description: string,
    nodeId: number; // Foreign Key origin:nodeScheduling
}
export interface NotificationScheduling {
    notificationId: number,
    title: string,
    notificationTitle: string,
    notificationDescription: string,
    notificationImage: string;
    nodeId: number; // FK origin: nodescheduling
}
export interface Devices {
    deviceId: number,
    deviceName: string;
}
export interface Projects {
    projectId: number,
    name: string,
    category: string;
    description: string,
    date: string,
    endDate: string;
}
export interface Accounts {
    accountId: number,
    birthday: string,
    created_at: string,
    specialties: string[];
}
export interface Reservations {
    reservationsId: number,
    userId: number, // FK origin: users
    deviceId: number, // FK origin: devices
    project: string,
    timeslot: number;
}
export interface AccountsJoin {
    id: number,
    userId: number, // FK origin: users 
    countId: number, // FK origin: counts
    accountId: number, // FK origin: accounts
}

export interface ProjectUserHistory {
    projectUserHistoryId: number,
    projectId: number, // FK origin: projects
    userId: number, // FK origin: users
    role: string,
    roleDescription: string,
    link: string;
}
