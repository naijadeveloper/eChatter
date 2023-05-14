import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface initialStateType {
  value: string | (() => string)
}

const initialState: initialStateType = {
  // Get theme from localStorage if exist
  value: () => {
    let theme = localStorage.getItem("theme");
    if(theme == null) return "dark";
    
    return theme;
  }
}

const themeSlice = createSlice({
  name: "themeSlice",
  initialState,
  reducers: {
    changeTheme(state, action: PayloadAction<string>) {
      state.value = action.payload;
      // Save to localStorage
      localStorage.setItem("theme", action.payload);
      //set a cookie for the theme later
    }
  }
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;