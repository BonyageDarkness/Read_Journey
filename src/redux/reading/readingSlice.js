// redux/reading/readingSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { startReading, stopReading } from "./readingOperations";
import { deleteReadingEntry } from "./readingOperations";

const initialState = {
  currentBook: null,
  diary: [],
  statistics: null,
  isLoading: false,
  error: null,
};

const readingSlice = createSlice({
  name: "reading",
  initialState,
  reducers: {
    setCurrentReadingBook: (state, action) => {
      state.currentBook = action.payload;
    },
    clearReadingState: (state) => {
      state.currentBook = null;
      state.diary = [];
      state.statistics = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(startReading.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(startReading.fulfilled, (state, action) => {
        state.isLoading = false;
        state.diary.push(action.payload);
      })
      .addCase(startReading.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(stopReading.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(stopReading.fulfilled, (state, action) => {
        state.isLoading = false;
        state.diary.push(action.payload); // финальное событие
        state.statistics = action.payload.statistics || null;
      })
      .addCase(stopReading.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteReadingEntry.fulfilled, (state, action) => {
        state.diary = state.diary.filter(
          (entry) => entry._id !== action.payload
        );
      });
  },
});

export const { setCurrentReadingBook, clearReadingState } =
  readingSlice.actions;
export default readingSlice.reducer;
