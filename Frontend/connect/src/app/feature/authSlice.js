import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signupService } from "../../services/auth/signupService";
import { loginService } from '../../services/auth/loginService';

const initialState = {
  token: JSON.parse(localStorage.getItem("circle-token")) || null,
  userInfo: JSON.parse(localStorage.getItem("circle-user")) || null,
  isLoggedIn: !!localStorage.getItem("circle-token"),
  authStatus: "idle",
  authError: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await loginService(email, password);
      console.log(res.data.result)
      return res.data.result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const res = await signupService(name, email, password);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: state => {
      state.token = null;
      state.userInfo = null;
      state.isLoggedIn = false;
      localStorage.removeItem("circle-token");
      localStorage.removeItem("circle-user");
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.authStatus = "loading";
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.token = payload.accessToken;
        state.userInfo = payload.user;
        state.isLoggedIn = true;
        localStorage.setItem("circle-token", JSON.stringify(payload.accessToken));
        localStorage.setItem("circle-user", JSON.stringify(payload.user));
        state.authStatus = "success";
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.authStatus = "failed";
        state.authError = payload;
      })
      .addCase(signupUser.pending, state => {
        state.authStatus = "loading";
      })
      .addCase(signupUser.fulfilled, (state, { payload }) => {
        state.token = payload.accessToken;
        state.userInfo = payload.user;
        state.isLoggedIn = true;
        localStorage.setItem("circle-token", JSON.stringify(payload.accessToken));
        localStorage.setItem("circle-user", JSON.stringify(payload.user));
        state.authStatus = "success";
      })
      .addCase(signupUser.rejected, (state, { payload }) => {
        state.authStatus = "failed";
        state.authError = payload;
      });
  },
});

export const { logOut } = authSlice.actions;
export default authSlice.reducer;
