import { createSlice } from "@reduxjs/toolkit";
import { apiNotification } from "../../interface/api";

interface NotificationState {
    notification: apiNotification[];
    isLoad: boolean;
    error: string | null;
}

const initialState: NotificationState = {
    notification: [],
    isLoad: false,
    error: null,
}

export const notificationSlice = createSlice({
    name: 'notification',
    initialState: initialState,
    reducers: {
        setAllNotification: (state, action) => {
            state.notification = action.payload;
            state.isLoad = true;
            state.error = null;
        },
        setNotification: (state, action) => {
            state.notification.push(action.payload);
            state.isLoad = false;
            state.error = null;

        },
        deleteNotification: (state, action) => {
            const index = state.notification.findIndex((item) => item.id === action.payload);
            state.notification.splice(index, 1);
            state.error = null;
            state.isLoad = false;
        },
        updateNotification: (state, action) => {
            const index = state.notification.findIndex((item) => item.id === action.payload.id);
            state.notification[index] = action.payload;
            state.error = null;
        },
        clearAllNotification: (state, action) => {
            state.notification = [];
            state.isLoad = false;
            state.error = null;
        }
    }
})

export const { setAllNotification, setNotification, clearAllNotification, updateNotification, deleteNotification } = notificationSlice.actions;

export default notificationSlice.reducer;

