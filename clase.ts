
type Status ='disponibles' | 'no-disponible'


interface IObjecto {
    id: string;
    title: string;
    cantidad: number;
    disponible: boolean;
    status:Status
}

const objetos:IObjecto[] = []


interface ICasa {
    barrio:string;
    objetosCasa:IObjecto
}


objetos.push({
    id: 'e6gf41ef5e1fg',
    title: 'EPALE',
    cantidad: 1,
    disponible: true,
    status:"disponibles"
})


const objeto = {
    id: 'e6gf41ef5e1fg',
    title: 'EPALE',
    cantidad: 15,
    disponible: true
}

const xd = (objeto: IObjecto) => {

}
const xd2 = (casa: ICasa) => {
    if(casa.objetosCasa.status==='disponibles'){

    }
}





