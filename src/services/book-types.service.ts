import axios from "axios";
import {BookType} from "../models/book-type.model.ts";

export async function getBookTypes(): Promise<BookType[]> {
    const response = await axios.get('/api/bookTypes');
    return response.data;
}