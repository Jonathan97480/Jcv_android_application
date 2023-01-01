import { createSlice } from "@reduxjs/toolkit";
import { apiNotification } from "../../interface/api";

export interface notificationPush {
    id: number;
    description: string;
    title: string;
    repeated: boolean;
    isValidated: boolean;
    date: string;
    isPush: boolean;
}

interface NotificationState {
    notificationPush: notificationPush[];
    isLoad: boolean;
    error: string | null;
}

const initialState: NotificationState = {
    notificationPush: [],
    isLoad: false,
    error: null,
}

export const notificationPushSlice = createSlice({
    name: 'notificationPush',
    initialState: initialState,
    reducers: {
        setAllNotificationPush: (state, action) => {
            state.notificationPush = action.payload;
            state.isLoad = true;
            state.error = null;
        },
        setNotificationPush: (state, action) => {
            state.notificationPush.push(action.payload);
            state.isLoad = false;
            state.error = null;

        },
        deleteNotificationPush: (state, action) => {
            const index = state.notificationPush.findIndex((item) => item.id === action.payload);
            state.notificationPush.splice(index, 1);
            state.error = null;
        },
        updateNotificationPush: (state, action) => {
            const index = state.notificationPush.findIndex((item) => item.id === action.payload.id);
            state.notificationPush[index] = action.payload;
            state.error = null;
        },
        clearAllNotificationPush: (state, action) => {
            state.notificationPush = [];
            state.isLoad = false;
            state.error = null;
        }
    }
})

export const { setAllNotificationPush, setNotificationPush, clearAllNotificationPush, updateNotificationPush, deleteNotificationPush } = notificationPushSlice.actions;

export default notificationPushSlice.reducer;

