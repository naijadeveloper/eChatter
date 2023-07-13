import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface initialStateType {
  value: {
    _id: string;
    email: string;
    username: string;
  }
}

const initialState: initialStateType = {
  value: {
    _id: "",
    email: "",
    username: ""
  }
}

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    saveUserInfo(state, action: PayloadAction<{_id: string, email: string, username: string}>) {
      state.value = action.payload;
    }
  }
});

export const { saveUserInfo } = userSlice.actions;

export default userSlice.reducer;