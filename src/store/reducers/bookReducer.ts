import { BookTodo } from "../../interface";
import { ADD_BOOK, UPDATE_BOOK, DELETE_BOOK } from "../actions/bookActions";

const initialState: BookTodo[] = JSON.parse(localStorage.getItem("books") || "[]");

const bookReducer = (state = initialState, action: any) => {
  let newStateAdd;
  let newStateUpdate;
  let newStateDelete;

  switch (action.type) {
    case ADD_BOOK:
      newStateAdd = [...state, action.payload];
      localStorage.setItem("books", JSON.stringify(newStateAdd));
      return newStateAdd;

    case UPDATE_BOOK:
      newStateUpdate = state.map(book => book.id === action.payload.id ? action.payload : book);
      localStorage.setItem("books", JSON.stringify(newStateUpdate));
      return newStateUpdate;

    case DELETE_BOOK:
      newStateDelete = state.filter(book => book.id !== action.payload);
      localStorage.setItem("books", JSON.stringify(newStateDelete));
      return newStateDelete;

    default:
      return state;
  }
};

export default bookReducer;