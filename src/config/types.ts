export interface Message {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

export interface File {
    name: string;
    isDirectory: boolean;
    children?: File[];
    extension?: string;
    content?: string;
    exist?: boolean;
}