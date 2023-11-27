import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { Performance,Show,Venue,Zone,RemainingTickets,ShowInfo } from "../interfaces/types";

//definimos el tipo para el slice state
interface ShowsState{
    shows: ShowInfo[];
    venues: Venue[];
}


//definimos el estado inicial para este tipo
const initialState: ShowsState = {
    shows: [],
    venues: []
}


export const showsSlice = createSlice({
    name: 'shows',
    //el createSlice infiere el tipo del inicial state
    initialState,
    reducers: {

        updateVenues: (state,action:PayloadAction<Venue[]>) => {
            state.venues = action.payload;
        },

        updateShows: (state, action: PayloadAction<ShowInfo>) => {
            state.shows =[...state.shows,action.payload]
        }
    }
})


export const {updateShows,updateVenues} = showsSlice.actions

export const selectCount = (state: RootState) => state.shows

export default showsSlice.reducer