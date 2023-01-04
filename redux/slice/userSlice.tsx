import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../interface";

interface UserState {
    user: User | null;
    isLogged: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: null,
    isLogged: false,
    error: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.isLogged = false;
            state.error = null;
        },
        logout: (state) => {
            state.user = null;
            state.isLogged = false;
            state.error = null;

        }, setIsLogged: (state, action) => {
            state.isLogged = action.payload;
        },
 
    }
})

export const { login, logout, setIsLogged } = userSlice.actions;

export default userSlice.reducer;

