import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface initialStateType {
  value: {
    _id?: string;
    email?: string;
    username?: string;
    verified?: boolean;
    theme?: string;
  }
}

type payloadType = {
  _id?: string;
  email?: string;
  username?: string;
  verified?: boolean;
  theme?: string;
}

const initialState: initialStateType = {
  value: {
    _id: "",
    email: "",
    username: "",
    verified: false,
    theme: ""
  }
}

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    saveUserInfo(state, action: PayloadAction<payloadType>) {
      state.value = {...state.value, ...action.payload};
    }
  }
});

export const { saveUserInfo } = userSlice.actions;

export default userSlice.reducer;