export interface LoginRequestDto {
    login: string;
    password: string;
}

export interface LoginResponseDto {
    access_token: string;
    username: string;
    role: string;
}

export interface AddBookResponseDto {
    id: number;
    name: string;
    genre?: Array<{
        id: number;
        name: string;
    }>;
    author: string;
    status: string;
    description?: string;
}

export interface UpdateBookResponseDto {
    id: number;
    name: string;
    genre?: Array<{
        id: number;
        name: string;
    }>;
    author: string;
    status: string;
    description?: string;
}


export interface AddAuthorResponseDto {
    id: number;
    FIO: string;
}

export interface UpdateAuthorResponseDto {
    id: number;
    FIO: string;
}

export interface AddGenreResponseDto {
    id: number;
    name: string
}

export interface UpdateGenreResponseDto {
    id: number;
    name: string;
}

export interface AiRequestDto {
    prompt: string;
}

export interface AiResponseDto {
    response: string;
}