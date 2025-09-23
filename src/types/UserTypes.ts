import type { IUser } from "./IUser"

export type LoginCredentials = Pick<IUser, 'email'|'password'>;
export type IUserResponse = Omit<IUser, "password">;