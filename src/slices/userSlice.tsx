import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { User,Booking } from "../interfaces/types";

//definimos el tipo para el slice state
interface UserState{
    user: User | null;
    bookings: Booking[];
}


//definimos el estado inicial para este tipo
const initialState: UserState = {
    user: null,
    bookings : []
}


export const userSlice = createSlice({
    name: 'users',
    //el createSlice infiere el tipo del inicial state
    initialState,
    reducers: {
        updateUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },

        updateBooking:(state,action:PayloadAction<Booking[]>) => {
            state.bookings = action.payload
        },

        addBooking:(state,action:PayloadAction<Booking>) => {
            state.bookings = [...state.bookings,action.payload]
        }
    }
})


export const {updateUser,updateBooking,addBooking} =userSlice.actions

export const selectCount = (state: RootState) => state.user

export default userSlice.reducer