export interface User {
    id: string;
    name: string;
    email: string;
    password: string;    
}

export interface CreateUserDto extends Omit<User, 'id'> { }