import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],  // array of post objects
    status: "idle", // "idle", "loading", "succeeded", "failed"
    error: null     // error message or null
};