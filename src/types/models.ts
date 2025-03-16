export interface Book {
    id: number;
    name: string;
    genre: Array<Genre>;
    author: string;
    status: string;
    description?: string;
}

export interface Author {
    id: number;
    FIO: string;
}

export interface Genre {
    id: number;
    name: string;
}

export interface User {
    id: number;
    login: string;
    password: string;
    role: 'guest' | 'user';
}
