import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = { data: {} };

export const fetchData = createAsyncThunk("show/fetchData", async (url) => {
  const response = await fetch(url);
  const json = await response.json();
  return json;
});

const searchSlice = createSlice({
  name: "show",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default searchSlice.reducer;
