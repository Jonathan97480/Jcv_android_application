import { createSlice } from "@reduxjs/toolkit";
import { UpdateCustomer } from "../../api/customers";
import { Customer } from "../../interface";


interface CustomerState {
    customers: Customer[];
    error: string | null;
    loading: boolean;
}


const initialState: CustomerState = {
    customers: [],
    error: null,
    loading: false,
}

export const customersSlice = createSlice({
    name: 'customers',
    initialState: initialState,
    reducers: {
        setData: (state, action) => {
            state.customers = action.payload;
            state.loading = false;
            state.error = null;
        },
        addCustomer: (state, action) => {
            state.customers.push(action.payload);
            state.loading = false;
            state.error = null;
        },
        setLoading: (state) => {
            state.loading = true;
        },
        updateCustomer(state, action) {
            const newCustomer = action.payload;
            const index = state.customers.findIndex((customer: Customer) => customer.id === newCustomer.id);
            state.customers[index] = newCustomer;
            state.loading = false;
            state.error = null;
        },
        deletedCustomer: (state, action) => {
            const id = action.payload.id;
            const index = state.customers.findIndex((customer) => customer.id === id);
            state.customers.splice(index, 1);
            state.loading = false;
            state.error = null;
        }
    }
})


export const { setData, setLoading, addCustomer, updateCustomer, deletedCustomer } = customersSlice.actions;

export default customersSlice.reducer;





