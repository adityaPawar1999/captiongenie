import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthToken } from "./authService";
import API_CONFIG from "../config/api";

// Fetch All Posts (No Authentication Required)
export const fetchPosts = createAsyncThunk(
    "posts/fetchPosts",
    async (_, { rejectWithValue, getState }) => {
      try {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  
        const response = await fetch(API_CONFIG.POSTS_URL, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` })  // Add token only if it exists
          }
        });
  
        if (!response.ok) {
          const errorText = await response.text();
          return rejectWithValue(`Failed to fetch posts: ${response.status} ${response.statusText}`);
        }
  
        const data = await response.json();
        return data;
      } catch (error) {
        return rejectWithValue(error.message || "Network error while fetching posts");
      }
    }
  );
  


// Submit Post (Requires Authentication)
export const submitPostAsync = createAsyncThunk(
    "posts/submitPost",
    async (postData, { rejectWithValue }) => {
        try {
            const token = getAuthToken();
            if (!token) {
                return rejectWithValue("No valid authentication token found");
            }

            const response = await fetch(`${API_CONFIG.POSTS_URL}/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(postData),
                credentials: "include"
            });

            if (!response.ok) {
                const error = await response.text();
                throw new Error(error || "Failed to submit post");
            }

            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message || "Failed to submit post");
        }
    }
);

// Fetch Single Post (No Authentication Required)
export const fetchSinglePost = createAsyncThunk(
    "posts/fetchSinglePost",
    async (postId, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_CONFIG.POSTS_URL}/${postId}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                return rejectWithValue(`Failed to fetch post: ${response.status} ${response.statusText}`);
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
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
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

export default postsSlice.reducer;
