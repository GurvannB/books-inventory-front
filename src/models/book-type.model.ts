import {BookWithoutType} from "./book.model.ts";

export type BookType = {
    id: number,
    isbn: number,
    editor: string,
    grade: string,
    subject: string,
    coverUrl: string,
    books: BookWithoutType[]
}

export type BookTypeWithoutBooks = Omit<BookType, 'books'>;