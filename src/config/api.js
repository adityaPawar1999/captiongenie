const API_CONFIG = {
    BASE_URL: "http://localhost:5003",
    POSTS_URL: "http://localhost:5003/api/posts",
    AUTH_URL: "http://localhost:5003/api/auth",
    headers: {
        "Content-Type": "application/json",
    },
    getAuthHeaders: (token) => ({
        Authorization: `Bearer ${token}`,
    }),
};

export default API_CONFIG;