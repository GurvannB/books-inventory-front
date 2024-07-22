import {BookTypeWithoutBooks} from "./book-type.model.ts";

export type Book = {
    id: number,
    number: number,
    bookCondition: string,
    comment: string,
    type: BookTypeWithoutBooks
}

export type BookWithoutType = Omit<Book, 'type'>;

export type BookDto = {
    bookNumber: number,
    bookTypeId: number,
    bookCondition: string,
    comment?: string
}