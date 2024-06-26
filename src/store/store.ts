import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { menusSlice } from './menus/menuSlice'
import { statusConectionSlice } from './status-conection/statusConectionSlice';
import { authSlice } from './auth/authSlice';
import { formModuleSlice } from './form-modules/formModulesSlices';
import { formEventSlice } from './form-events/formEventSlice';
import { showEventSlice } from './show-events/ShowEventSlice';


export const store = configureStore({
    reducer: {
        menu: menusSlice.reducer,
        statusConection: statusConectionSlice.reducer,
        auth: authSlice.reducer,
        formModule: formModuleSlice.reducer,
        formEvent: formEventSlice.reducer,
        showEvents: showEventSlice.reducer
        // [menuApi.reducerPath]: menuApi.reducer
    },
    /* middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(menuApi.middleware), */
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

