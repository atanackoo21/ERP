import { IUser } from './user';

export interface IManager{
    manager_id: string,
    user: IUser;
}