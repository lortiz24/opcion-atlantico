import React, { useEffect, useState } from 'react'
import { IRol } from '../interfaces/rols-interfaces'

const rolsList: IRol[] = [
    {
        id: 'vegfef5ef5e1f5ef41',
        value: 'user'
    },
    {
        id: '5f4156e4165e41f65e',
        value: 'admin'
    },
    {
        id: '6e4gf56er41gf5615g',
        value: 'invited'
    },
    {
        id: '6e4gf56er41gf5615g',
        value: 'super-admin'
    },
]

const useGetRols = () => {
    const [rolList, setRols] = useState<IRol[]>([])
    const [isLoadingRols, setIsLoadingRols] = useState(true)

    useEffect(() => {
        setRols(rolsList)
        setIsLoadingRols(false)
    }, [])

    return {
        rolList,
        isLoadingRols
    }
}

export default useGetRols