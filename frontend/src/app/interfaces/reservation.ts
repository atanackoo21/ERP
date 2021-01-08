import { ICustomer } from './customer'
import { IStatus } from './status'
import { ITypeOfService } from './typeOfService'

export interface IReservation {
    reservation:string,
    date: Date,
    time: string,
    price: string,
    manager_id: string,
    confirmation: boolean,
    description: string,
    customer: ICustomer,
    worker: object,
    status: IStatus,
    typeOfService: ITypeOfService
}
