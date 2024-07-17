import React, {createContext, useEffect, useState} from 'react';
import {Book} from "../models/book.model.ts";
import {BookType} from "../models/book-type.model.ts";
import {getBooks} from "../services/books.service.ts";
import {getBookTypes} from "../services/book-types.service.ts";

export type AppContextType = {
    books: Book[],
    booksLoading: boolean,
    bookTypes: BookType[],
    bookTypesLoading: boolean,
    reloadBooks: VoidFunction,
    reloadBookTypes: VoidFunction
}

interface AppContextProviderProps {
    children: React.JSX.Element;
}

export function useApp(): AppContextType {
    return React.useContext(AppContext) as AppContextType;
}

export const AppContext = createContext<AppContextType>(undefined as unknown as AppContextType);
export const AppContextProvider = ({children}: AppContextProviderProps): React.JSX.Element => {
    const [books, setBooks] = useState<Book[]>([]);
    const [booksLoading, setBooksLoading] = useState<boolean>(false);
    const [bookTypes, setBookTypes] = useState<BookType[]>([]);
    const [bookTypesLoading, setBookTypesLoading] = useState<boolean>(false);

    async function reloadBooks() {
        try {
            setBooksLoading(true);
            const books = await getBooks();
            setBooks(books);
        } finally {
            setBooksLoading(false);
        }
    }

    async function reloadBookTypes() {
        try {
            setBookTypesLoading(true);
            const bookTypes = await getBookTypes();
            setBookTypes(bookTypes);
        } finally {
            setBookTypesLoading(false);
        }
    }

    const value: AppContextType = {
        books,
        booksLoading,
        bookTypes,
        bookTypesLoading,
        reloadBooks,
        reloadBookTypes
    };
    return (<AppContext.Provider value={value}>{children}</AppContext.Provider>);
};
