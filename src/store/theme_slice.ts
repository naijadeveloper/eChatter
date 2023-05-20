import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { cookieStorage } from "@/utilities/cookie_storage";

interface initialStateType {
  value: string;
}

const initialState: initialStateType = {
  value: "dark"
}

const themeSlice = createSlice({
  name: "themeSlice",
  initialState,
  reducers: {
    changeTheme(state, action: PayloadAction<string>) {
      state.value = action.payload;
      // Save to document.cookie when window is available
      if(typeof window !== "undefined") {
        const date = new Date();
        date.setDate(date.getDate() + 30);

        cookieStorage.setItem("theme", `${action.payload};expires=${date.toUTCString()}`);
      }
    }
  }
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;