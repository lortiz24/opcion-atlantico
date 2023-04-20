import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { menuApi } from './apis/menuApis';
import { menusSlice } from './menus/menuSlice'
import { statusConectionSlice } from './status-conection/statusConectionSlice';
import { authSlice } from './auth/authSlice';


export const store = configureStore({
    reducer: {
        menu: menusSlice.reducer,
        statusConection: statusConectionSlice.reducer,
        auth: authSlice.reducer
        // [menuApi.reducerPath]: menuApi.reducer
    },
    /* middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(menuApi.middleware), */
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

