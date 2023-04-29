import { CollectionReference, addDoc, collection, doc, getDoc, getDocs, query, updateDoc } from "firebase/firestore";
import { parameterCollectionRef } from "../providers";
import { IParameter, IValueParameter } from "../../interfaces/value-parameter.interface";

export class ValueParametersFirebaseService {

    constructor(
        private readonly parameterCollection = parameterCollectionRef
    ) { }

    async createParameter(newParameter: IParameter) {
        try {
            const querySnapshot = await addDoc(this.parameterCollection, newParameter);
            const newModuleId = querySnapshot.id;
            return newModuleId
        } catch (error) {
            throw new Error('internal error')
        }
    }
    async createValueParameter(parameterId: string, newValueParameter: IValueParameter) {
        try {
            const valueParameter = this.getValueParamterCollection(parameterId)

            const querySnapshot = await addDoc(valueParameter, newValueParameter);

            const newValueParameterId = querySnapshot.id;

            return newValueParameterId

        } catch (error) {
            throw new Error('internal error')
        }
    }

    async getParameters() {
        try {
            let queryData = query<Omit<IParameter, "id">>(this.parameterCollection);
            const parameters: IParameter[] = []
            const querySnapshot = await getDocs<Omit<IParameter, "id">>(queryData);
            querySnapshot.forEach(snapshot => {
                parameters.push({ id: snapshot.id, ...snapshot.data() })
            })

            return parameters
        } catch (error) {
            throw new Error('internal error')
        }
    }

    async getParameterById(parameterId: string) {
        try {
            const parameterRef = doc(this.parameterCollection, parameterId);

            const querySnapshot = await getDoc<Omit<IParameter, "id">>(parameterRef);


            return { id: querySnapshot.id, ...querySnapshot.data() } as IParameter
        } catch (error) {
            throw new Error('internal error')
        }
    }
    async getValueParameters(parameterId: string) {
        try {
            const valueParameterRef = this.getValueParamterCollection(parameterId)

            let queryData = query<Omit<IValueParameter, "id">>(valueParameterRef);
            const valueParameters: IValueParameter[] = []
            const querySnapshot = await getDocs<Omit<IValueParameter, "id">>(queryData);
            querySnapshot.forEach(snapshot => {
                valueParameters.push({ id: snapshot.id, ...snapshot.data() })
            })

            return valueParameters
        } catch (error) {
            throw new Error('internal error')
        }
    }

    async getValueParameterById(parameterId: string, valueParameterId: string) {
        try {

            const valueParameterRef = this.getValueParamterCollection(parameterId)

            const parameterRef = doc(valueParameterRef, valueParameterId);

            const querySnapshot = await getDoc<Omit<IValueParameter, "id">>(parameterRef);

            return { id: querySnapshot.id, ...querySnapshot.data() } as IParameter

        } catch (error) {
            throw new Error('internal error')
        }
    }

    async updateParameter(parameterId: string, newParameter: Partial<IParameter>) {
        try {
            const parameterDocRed = doc(this.parameterCollection, parameterId)
            await updateDoc(parameterDocRed, newParameter)
        } catch (error) {
            throw new Error('not-update')
        }

    }
    async updateValueParameter(parameterId: string, valueParameterId: string, newValueParameter: Partial<IValueParameter>) {
        try {
            const valueParameterRed = this.getValueParamterCollection(parameterId)
            const parameterDocRed = doc(valueParameterRed, valueParameterId)
            await updateDoc(parameterDocRed, newValueParameter)
        } catch (error) {
            throw new Error('not-update')
        }
    }

    getValueParamterCollection(parameterId: string) {
        const parameterDocRed = doc(this.parameterCollection, parameterId)
        const valueParameter = collection(parameterDocRed, 'value-parameters') as CollectionReference<Omit<IValueParameter, 'id'>>;
        return valueParameter
    }


}