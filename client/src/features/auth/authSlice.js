import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🔹 Base URL (change if needed)
const API_URL = "http://localhost:5000/api/auth";



// Login User
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/login`, userData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Register User
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const logoutUser=createAsyncThunk(
  "/auth/logoutUser",
   async (userData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/logout`, {}, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
)
export const loggedInUser=createAsyncThunk(
  "/auth/authMe",
   async (userData, thunkAPI) => {
    try {
      const {data} = await axios.get(`${API_URL}/authMe`, {
        withCredentials: true,
      });
      return data.userData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
)



const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};



const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Load user from localStorage on app start
    loadUserFromStorage: (state) => {
      const user = localStorage.getItem("user");

      if (user) {
        state.user = JSON.parse(user);
      }
    },

    // Logout
    logout: (state) => {
      state.user = null;
      state.token = null;

      localStorage.removeItem("user");
    },
  },

  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        // Strip token from payload and persist only user info
        const { token, ...userWithoutToken } = action.payload || {};
        state.user = userWithoutToken;
        state.token = null; 

        localStorage.setItem("user", JSON.stringify(userWithoutToken));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;

        const { token, ...userWithoutToken } = action.payload || {};
        state.user = userWithoutToken;
        state.token = null;

        localStorage.setItem("user", JSON.stringify(userWithoutToken));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        localStorage.removeItem("user");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET AUTHENTICATED USER
      .addCase(loggedInUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loggedInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload || null;
        localStorage.setItem("user", JSON.stringify(action.payload || null));
      })
      .addCase(loggedInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;