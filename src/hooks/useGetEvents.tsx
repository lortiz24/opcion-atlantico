import React, { useEffect, useState } from 'react'
import { IEvents } from '../features/eventModule/interfaces/events-interfaces'
import { Timestamp } from 'firebase/firestore';


const listEvents: IEvents[] = [
    {
        id: 'e51f5e1f5e1f65ef',
        img:'https://www.cuc.edu.co/wp-content/uploads/2022/11/IMG_1377-scaled-600x450.jpg',
        title: 'Reunion beca opcion',
        desciption: 'Reunion de todos los becados',
        date: Timestamp.now(),
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
        img:'https://www.cuc.edu.co/wp-content/uploads/2022/11/IMG_1377-scaled-600x450.jpg',
        title: 'Reunion beca opcion',
        desciption: 'Reunion de todos los becados',
        date: Timestamp.now(),
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
        img:'https://www.cuc.edu.co/wp-content/uploads/2022/11/IMG_1377-scaled-600x450.jpg',
        title: 'Reunion beca opcion',
        desciption: 'Reunion de todos los becados',
        date: Timestamp.now(),
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
        img:'https://www.cuc.edu.co/wp-content/uploads/2022/11/IMG_1377-scaled-600x450.jpg',
        title: 'Reunion beca opcion',
        desciption: 'Reunion de todos los becados',
        date: Timestamp.now(),
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
    const [events, setEvents] = useState<IEvents[]>([]);
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