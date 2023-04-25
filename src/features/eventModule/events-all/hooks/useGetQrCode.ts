import React, { useEffect, useState } from 'react'
import { IQrCode } from '../../../../interfaces/events-interfaces';
import { listeningQrAttendanceFirebase } from '../../../../firebase/eventos/event-firebase.service';

const useGetQrCode = (codeQrID: string) => {
    const [codeQr, setCodeQr] = useState<IQrCode>({} as IQrCode);
    const [loading, setLoading] = useState(true);

    const onSet = (data: IQrCode) => {
        setCodeQr(data)
        setLoading(false)
    }
    useEffect(() => {
        const ubsuscribe = listeningQrAttendanceFirebase(codeQrID, onSet)
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