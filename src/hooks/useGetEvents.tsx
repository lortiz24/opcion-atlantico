import React, { useEffect, useState } from 'react'
import { Timestamp } from 'firebase/firestore';
import { IEvent } from '../interfaces/events-interfaces';
import dayjs from 'dayjs';
import { addTimeToDate } from '../services/date-treatment/conversions-date.utils';


const listEvents: IEvent[] = [
    {
        id: 'e51f5e1f5e1f65ef',
        img: 'https://www.cuc.edu.co/wp-content/uploads/2022/11/IMG_1377-scaled-600x450.jpg',
        title: 'Reunion beca opcion',
        desciption: 'Reunion que se realiza los dias miercoles con el fin de que todos los becados esten al tanto de las nuevas iniciativas del programa, conocer su desempeño en el semestre y compartir un espacio en el que pueda dialogar y tener encuentros que fortalezcan los lasos que unen a cada uno de los miembros',
        place:'Sala de eventos 2',
        dateStart: Timestamp.fromDate(addTimeToDate(dayjs(Timestamp.now().toDate()),20,'minute').toDate()),
        dateEnd: Timestamp.fromDate(addTimeToDate(dayjs(Timestamp.now().toDate()),20,'minute').toDate()),
        assistants: [
            {
                id: 'fe6f6efefeefedd',
                name: 'Luis Ortiz'
            },
            {
                id: 'e5g1e5g1e51g5e15146185gf41eg',
                'name': 'Andres Barros'
            }
        ]
    },
    {
        id: 'e51f5e1f1egf1eg5e1f65ef',
        img: 'https://www.cuc.edu.co/wp-content/uploads/2022/11/IMG_1377-scaled-600x450.jpg',
        title: 'Reunion beca opcion',
        desciption: 'Reunion que se realiza los dias miercoles con el fin de que todos los becados esten al tanto de las nuevas iniciativas del programa, conocer su desempeño en el semestre y compartir un espacio en el que pueda dialogar y tener encuentros que fortalezcan los lasos que unen a cada uno de los miembros',
        place:'Sala de eventos 2',
        dateStart: Timestamp.now(),
        dateEnd: Timestamp.fromDate(addTimeToDate(dayjs(Timestamp.now().toDate()),2,'minute').toDate()),
        assistants: [
            {
                id: 'fe6f6efefeefedd',
                name: 'Luis Ortiz'
            },
            {
                id: 'e5g1e5g1e51g5e15146185gf41eg',
                'name': 'Andres Barros'
            }
        ]
    },
    {
        id: 'e51f5eefe45fe5f5ef65ef',
        img: 'https://www.cuc.edu.co/wp-content/uploads/2022/11/IMG_1377-scaled-600x450.jpg',
        title: 'Reunion beca opcion',
        desciption: 'Reunion que se realiza los dias miercoles con el fin de que todos los becados esten al tanto de las nuevas iniciativas del programa, conocer su desempeño en el semestre y compartir un espacio en el que pueda dialogar y tener encuentros que fortalezcan los lasos que unen a cada uno de los miembros',
        place:'Sala de eventos 2',
        dateStart: Timestamp.now(),
        dateEnd: Timestamp.fromDate(addTimeToDate(dayjs(Timestamp.now().toDate()),3,'minute').toDate()),
        assistants: [
            {
                id: 'fe6f6efefeefedd',
                name: 'Luis Ortiz'
            },
            {
                id: 'e5g1e5g1e51g5e15146185gf41eg',
                'name': 'Andres Barros'
            }
        ]
    },
    {
        id: '12f6e2f61e1f6e1f',
        img: 'https://www.cuc.edu.co/wp-content/uploads/2022/11/IMG_1377-scaled-600x450.jpg',
        title: 'Reunion beca opcion',
        desciption: 'Reunion que se realiza los dias miercoles con el fin de que todos los becados esten al tanto de las nuevas iniciativas del programa, conocer su desempeño en el semestre y compartir un espacio en el que pueda dialogar y tener encuentros que fortalezcan los lasos que unen a cada uno de los miembros',
        place:'Sala de eventos 2',
        dateStart: Timestamp.fromDate(addTimeToDate(dayjs(Timestamp.now().toDate()),-10,'minute').toDate()),
        dateEnd: Timestamp.fromDate(addTimeToDate(dayjs(Timestamp.now().toDate()),-5,'minute').toDate()),
        assistants: [
            {
                id: 'fe6f6efefeefedd',
                name: 'Luis Ortiz'
            },
            {
                id: 'e5g1e5g1e51g5e15146185gf41eg',
                'name': 'Andres Barros'
            }
        ]
    }
]
const useGetEvents = () => {
    const [events, setEvents] = useState<IEvent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setEvents(listEvents)
            setLoading(false)
        }, 2000)

    }, [])


    return {
        loading,
        events
    }
}

export default useGetEvents