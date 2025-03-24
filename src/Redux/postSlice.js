import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthToken } from "./authService";
import API_CONFIG from "../config/api";

// Define Async Thunk for Fetching Posts
export const fetchPosts = createAsyncThunk(
    "posts/fetchPosts",
    async (_, { rejectWithValue }) => {
        try {
            const token = getAuthToken();
            if (!token) {
                console.error("Authentication token not found");
                return rejectWithValue("Please login to view posts");
            }

            console.log("Attempting to fetch posts from:", API_CONFIG.POSTS_URL);
            const response = await fetch(API_CONFIG.POSTS_URL, {
                method: "GET",
                headers: {
                    ...API_CONFIG.headers,
                    ...API_CONFIG.getAuthHeaders(token)
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Failed to fetch posts:", {
                    status: response.status,
                    statusText: response.statusText,
                    error: errorText
                });
                return rejectWithValue(`Failed to fetch posts: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            console.log("Successfully fetched posts:", data);
            return data;
        } catch (error) {
            console.error("Error in fetchPosts:", error);
            return rejectWithValue(error.message || "Network error while fetching posts");
        }
    }
);

// Define Async Thunk for Submitting a Post
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
            Authorization: `Bearer ${token}`
          },
          body: postData,
          credentials: 'include'
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

export const fetchSinglePost = createAsyncThunk(
    "posts/fetchSinglePost",
    async (postId, { rejectWithValue }) => {
        try {
            const token = getAuthToken();
            if (!token) {
                return rejectWithValue("Please login to view posts");
            }

            const response = await fetch(`${API_CONFIG.POSTS_URL}/${postId}`, {
                method: "GET",
                headers: {
                    ...API_CONFIG.headers,
                    ...API_CONFIG.getAuthHeaders(token)
                },
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
