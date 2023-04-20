import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { menuApi } from './apis/menuApis';
import { menusSlice } from './slices/menus/menuSlice'
import { statusConectionSlice } from './slices/status-conection/statusConectionSlice';
import { sessionSlice } from './slices/session/sessionSlice';


export const store = configureStore({
    reducer: {
        menu: menusSlice.reducer,
        statusConection: statusConectionSlice.reducer,
        sessionState: sessionSlice.reducer
        // [menuApi.reducerPath]: menuApi.reducer
    },
    /* middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(menuApi.middleware), */
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

