import { configureStore } from '@reduxjs/toolkit'
import showsReducer from './slices/eventsSlice'
import userReducer from './slices/userSlice'
import SearchBarReducer from './slices/searchBarSlice'

export const store = configureStore({
  reducer: {
	shows: showsReducer,
    user : userReducer,
    searchBar: SearchBarReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


    //const products = useAppSelector((state) => state.products.products);
	//const dispatch = useAppDispatch();