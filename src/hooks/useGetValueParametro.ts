import React, { useEffect, useState } from 'react'

interface IParametres {
    parameter: string
}


const listOpcion = [
    {
        parametre: 'promocion',
        value: 2019
    },
    {
        parametre: 'promocion',
        value: 2020
    },
    {
        parametre: 'promocion',
        value: 2021
    },
    {
        parametre: 'promocion',
        value: 2022
    },
    {
        parametre: 'promocion',
        value: 2023
    },
]

const useGetValueParametro = ({ parameter }: IParametres) => {
    const [parametre, setParametre] = useState<{
        parametre: string;
        value: any;
    }[]>()
    const [isLoading, setIsLoading] = useState(true)



    useEffect(() => {
        setParametre(listOpcion)
        setIsLoading(false)
    }, [])


    return {
        parametre,
        isLoading
    }
}

export default useGetValueParametro