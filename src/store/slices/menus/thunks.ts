import { Action, ThunkAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../store";
import { startLoading, setModules } from "./menuSlice";
import { modulesCollectionRef } from "../../../settings/firebase/providers";
import { getDocs } from "firebase/firestore/lite";
import { MenuProps } from "antd";

type ThunkResult<R> = ThunkAction<R, RootState, undefined, Action<string>>;

export const getModules = (): ThunkResult<void> => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(startLoading());

        try {
            const querySnapshot = await getDocs(modulesCollectionRef);
            const modules = querySnapshot.docs.map((doc) => doc.data());
            dispatch(setModules({ modules }));
        } catch (error) {
            console.error("Error getting documents: ", error);
        }
    };
};


//Esto si queremos usar createAsyncThunk
/* export const getModules = createAsyncThunk(
    'menu/getModules',
    async () => {
        const response = await fetch(`/api/modules?page=${0}`);
        const data = await response.json();
        return { modules: ['Epaaa'] };
    }
); */

