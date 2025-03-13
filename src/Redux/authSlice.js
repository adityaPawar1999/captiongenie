import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; 

// ✅ Async thunk for login
export const login = createAsyncThunk("auth/login", async (userData, { rejectWithValue }) => {
  try {
    console.log("Logging in auth...");
    const response = await axios.post(
      "http://localhost:3001/api/auth/login",  // ✅ Ensure backend is running
      userData,
      { withCredentials: true }
    );

    console.log("Data sent successfully", response.data);

    // ✅ Save token & user in localStorage
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Login failed");
  }
});

// ✅ Async thunk for signup
export const signup = createAsyncThunk("auth/signup", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/auth/signup",
      userData,
      { withCredentials: true }
    );

    console.log("Signup successful", response.data);

    // ✅ Save token & user in localStorage
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Signup failed");
  }
});

// ✅ Redux slice
const authSlice = createSlice({
  name: "auth",
  initialState: { 
    user: JSON.parse(localStorage.getItem("user")) || null, 
    token: localStorage.getItem("token") || null, 
    error: null 
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("token");  // ✅ Remove token from localStorage
      localStorage.removeItem("user");   // ✅ Remove user data from localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

// ✅ Export actions and reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;
