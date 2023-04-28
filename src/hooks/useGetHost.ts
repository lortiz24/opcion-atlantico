import React, { useEffect, useState } from 'react'

const useGetHost = () => {
    const [host, sethost] = useState('')

    useEffect(() => {
        sethost(window.location.host)
    }, [])

    return {
        host
    }
}

export default useGetHost