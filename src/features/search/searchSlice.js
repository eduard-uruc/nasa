import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  error: null,
};

export const fetchData = createAsyncThunk("search/fetchData", async (url) => {
  const response = await fetch(url);
  const json = await response.json();
  return json;
});

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default searchSlice.reducer;
