import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../features/search/searchSlice";
import showReducer from "../features/show/showSlice";

export default configureStore({
  reducer: { collection: searchReducer, searchedItem: showReducer },
});
