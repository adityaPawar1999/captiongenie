import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Function to get token
const getAuthToken = () => localStorage.getItem("token");

// ✅ Define Async Thunk for Submitting a Post
export const submitPostAsync = createAsyncThunk(
    "posts/submitPost",
    async (postData, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem("token"); // Get stored token
        console.log("🚀 Sending Token:", token); // Debugging log
  
        const response = await fetch("http://localhost:3001/api/posts/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ✅ Include token
          },
          body: JSON.stringify(postData),
          credentials: "include",
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to submit post");
        }
  
        return await response.json();
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

// ✅ Define Async Thunk for Fetching Posts
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (_, { rejectWithValue }) => {
    try {
      const token = getAuthToken(); // Get stored token
      const response = await fetch("http://localhost:3001/api/posts/all", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Send token for fetching posts too
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
  
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  });
  

// ✅ Define the Slice
const postSlice = createSlice({
  name: "posts",
  initialState: { posts: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(submitPostAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitPostAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(action.payload.post); // Add new post to state
      })
      .addCase(submitPostAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ✅ Export Reducer
export default postSlice.reducer;
