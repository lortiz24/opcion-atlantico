import React, { useEffect, useState } from 'react'
import { listeningQrAttendance } from '../../../firebase/eventos/event-firebase-services';
import { IQrCode } from '../../../interfaces/events-interfaces';

const useGetQrCode = (codeQrID: string) => {
    const [codeQr, setCodeQr] = useState<IQrCode>({} as IQrCode);
    const [loading, setLoading] = useState(true);

    const onSet = (data: IQrCode) => {
        setCodeQr(data)
        setLoading(false)
    }
    useEffect(() => {
        const ubsuscribe = listeningQrAttendance(codeQrID, onSet)
        return () => {
            ubsuscribe()
        }
    }, [])

    return {
        loading,
        codeQr
    }
}

export default useGetQrCode