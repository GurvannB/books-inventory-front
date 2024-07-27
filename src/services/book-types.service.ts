import axios from "axios";
import {BookType, BookTypeDto} from "../models/book-type.model.ts";

export async function getBookTypes(): Promise<BookType[]> {
    const response = await axios.get('/api/bookTypes');
    return response.data;
}

export async function saveBookType(values: BookTypeDto): Promise<BookType> {
    const response = await axios.post('/api/bookTypes', values);
    return response.data;
}

export async function updateBookType(bookTypeId: number, values: BookTypeDto): Promise<BookType> {
    const response = await axios.put(`/api/bookTypes/${bookTypeId}`, values);
    return response.data;
}

export async function deleteBookType(bookTypeId: number): Promise<BookType> {
    const response = await axios.delete(`/api/bookTypes/${bookTypeId}`);
    return response.data;
}
