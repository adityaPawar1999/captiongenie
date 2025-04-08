import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching posts
const fetchPosts = createAsyncThunk('posts/fetchPosts', async (category = '', { rejectWithValue }) => {
  try {
    const url = category && category !== 'All' ? `/api/posts?category=${category}` : '/api/posts';
    console.log("Fetching posts from URL:", url); // Debug log
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message || "Network error while fetching posts");
  }
});

// Async thunk for creating a post
const createPost = createAsyncThunk('posts/createPost', async (postData) => {
  const response = await axios.post('/api/posts/create', postData);
  return response.data;
});

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: 'idle',
    error: null,
    selectedCategory: 'All'
  },
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
  }
});

export default postSlice.reducer;

export { fetchPosts, createPost };