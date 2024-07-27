import axios from "axios";
import {Book, BookDto} from "../models/book.model.ts";


export async function getBooks(): Promise<Book[]> {
    const response = await axios.get('/api/books');
    return response.data;
}

export async function saveBook(bookDto: BookDto): Promise<Book> {
    const response = await axios.post('/api/books', bookDto);
    return response.data;
}

export async function deleteBook(id: number): Promise<void> {
    await axios.delete(`/api/books/${id}`);
    return;
}

export async function updateBook(id: number, values: BookDto): Promise<Book> {
    const response = await axios.put(`/api/books/${id}`, values);
    return response.data
}