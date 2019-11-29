import { UserStatus } from './enums/UserStatus.enum';

export class User {
    _id?: string;
    name?: string;
    username?: string;
    status?: UserStatus;
    password?: string;
    joindate?: Date;
}
