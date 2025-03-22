import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import booksReducer from "./books/booksSlice";
import filtersReducer from "./filters/filtersSlice";
import readingFilterReducer from "./readingFilter/readingFilterSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    books: booksReducer,
    filters: filtersReducer,
    readingFilter: readingFilterReducer,
  },
});

export default store;
