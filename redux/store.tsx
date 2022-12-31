import { configureStore } from '@reduxjs/toolkit';

import userReducer from './slice/userSlice';
import customersReducer from './slice/customersSlice';
import notificationReducer from './slice/notificationSlice';


export default configureStore({
    reducer: {
        user: userReducer,
        customers: customersReducer,
        notification: notificationReducer,
    }
})


