import { ValueParametersFirebaseService } from "../../firebase/valor-parametros/valor-parametros-firebase.service";
import { IParameter, IValueParameter } from "../../interfaces/value-parameter.interface";

export class ValueParametersController {

    constructor(
        private readonly valueParametersService = new ValueParametersFirebaseService()
    ) { }

    async createParameter(newParameter: IParameter) {
        const idParameter = await this.valueParametersService.createParameter(newParameter)
        return idParameter
    }
    async createValueParameter(parameterId: string, newValueParameter: IValueParameter) {
        const idParameter = await this.valueParametersService.createValueParameter(parameterId, newValueParameter)
        return idParameter
    }

    async getParameters() {
        return await this.valueParametersService.getParameters()
    }
    async getParameter(parameterId: string) {
        return await this.valueParametersService.getParameterById(parameterId)
    }
    async getValueParameters(parameterId: string) {
        return await this.valueParametersService.getValueParameters(parameterId)
    }
    async getValueParameterById(parameterId: string, valueParameterId: string) {
        return await this.valueParametersService.getValueParameterById(parameterId, valueParameterId)
    }

    async updateParameter(parameterId: string, newParameter: Partial<IParameter>) {
        return await this.valueParametersService.updateParameter(parameterId, newParameter)
    }
    async updateValueParameter(parameterId: string, valueParameterId: string, newValueParameter: Partial<IValueParameter>) {
        return await this.valueParametersService.updateValueParameter(parameterId, valueParameterId, newValueParameter)
    }
}