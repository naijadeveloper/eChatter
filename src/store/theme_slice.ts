import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface initialStateType {
  value: string;
}

const initialState: initialStateType = {
  value: ""
}

const themeSlice = createSlice({
  name: "themeSlice",
  initialState,
  reducers: {
    changeTheme(state, action: PayloadAction<string>) {
    }
  }
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;