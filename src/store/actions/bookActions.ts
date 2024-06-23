import { BookTodo } from "../../interface";

export const ADD_BOOK = 'ADD_BOOK';
export const UPDATE_BOOK = 'UPDATE_BOOK';
export const DELETE_BOOK = 'DELETE_BOOK';

export const addBook = (book: Omit<BookTodo, 'id'>) => {
  const newBook = { ...book, id: Date.now() };
  return { type: ADD_BOOK, payload: newBook };
};

export const updateBook = (book: BookTodo) => {
  return { type: UPDATE_BOOK, payload: book };
};

export const deleteBook = (id: number) => {
  return { type: DELETE_BOOK, payload: id };
};