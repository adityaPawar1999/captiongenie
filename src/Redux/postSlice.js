import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthToken } from "./authService";
import API_CONFIG from "../config/api";

// Fetch All Posts or By Category
export const fetchPosts = createAsyncThunk(
    "posts/fetchPosts",
    async (category = "All", { rejectWithValue }) => {
      try {
        const token = getAuthToken();
        const url =
          category === "All"
            ? API_CONFIG.POSTS_URL
            : `${API_CONFIG.POSTS_URL}?category=${encodeURIComponent(category)}`;
  
        console.log("Fetching posts from URL:", url); // ✅ Debug log
  
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` })
          },
          credentials: "include",
        });
  
        if (!response.ok) {
          const errorText = await response.text();
          return rejectWithValue(`Failed to fetch posts: ${response.status} ${response.statusText}`);
        }
  
        const fetchedData = await response.json();
        return fetchedData.data || fetchedData; // ✅ Ensure correct response format
      } catch (error) {
        return rejectWithValue(error.message || "Network error while fetching posts");
      }
    }
  );

// Submit New Post
export const submitPostAsync = createAsyncThunk(
  "posts/submitPost",
  async (postData, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) return rejectWithValue("No authentication token found");

      const response = await fetch(`${API_CONFIG.POSTS_URL}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.text();
        return rejectWithValue(error || "Failed to submit post");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message || "Error submitting post");
    }
  }
);

// Fetch a Single Post
export const fetchSinglePost = createAsyncThunk(
  "posts/fetchSinglePost",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_CONFIG.POSTS_URL}/${postId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        return rejectWithValue(`Failed to fetch post: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message || "Network error while fetching post");
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    post: null,
    status: "idle",
    error: null,
    selectedCategory: "All",
  },
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Posts
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Fetch Single Post
      .addCase(fetchSinglePost.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchSinglePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.post = action.payload;
      })
      .addCase(fetchSinglePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Submit Post
      .addCase(submitPostAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(submitPostAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts.push(action.payload);
      })
      .addCase(submitPostAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setSelectedCategory } = postsSlice.actions;
export default postsSlice.reducer;
