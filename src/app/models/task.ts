import { TaskStatus } from './enums/TaskStatus.enum';

export class Task {
    _id?: string;
    title?: string;
    message?: string;
    status?: TaskStatus;
    startAt?: Date;
    endAt?: Date;
}
