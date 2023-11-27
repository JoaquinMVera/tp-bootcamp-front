import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { User,Booking } from "../interfaces/types";

//definimos el tipo para el slice state
interface searchBarState{
    showName:string;
}


//definimos el estado inicial para este tipo
const initialState: searchBarState = {
    showName: ""
}


export const searchBarSlice = createSlice({
    name: 'searchBar',
    //el createSlice infiere el tipo del inicial state
    initialState,
    reducers: {
        updateSearchBar: (state, action: PayloadAction<string>) => {
            state.showName = action.payload
        },
    }
})


export const {updateSearchBar} =searchBarSlice.actions

export const selectCount = (state: RootState) => state.user

export default searchBarSlice.reducer