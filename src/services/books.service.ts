import axios from "axios";
import {Book} from "../models/book.model.ts";

export async function getBooks(): Promise<Book[]> {
    const response = await axios.get('/api/books');
    return response.data;
}