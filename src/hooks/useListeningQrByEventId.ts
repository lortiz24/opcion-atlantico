import React, { useEffect, useState } from 'react'
import { IQrCode } from '../interfaces/events-interfaces';
import { Unsubscribe } from 'firebase/auth';
import { eventController } from '../controllers/events/event.controller';

const useListeningQrByEventId = (eventId: string, qrCodeId: string | undefined) => {
    const [qrToken, setQrToken] = useState<IQrCode>({} as IQrCode);
    const [loading, setLoading] = useState(true);

    const onSet = (qrCode: IQrCode) => {
        setQrToken(qrCode)
        setLoading(false)
    }
    useEffect(() => {
        console.log(qrCodeId)
        if (!qrCodeId) return
        let unsubscribe: Unsubscribe
        console.log(eventId, qrCodeId, onSet)
        unsubscribe = eventController.listeningQrCode(eventId, qrCodeId, onSet)

        return () => {
            unsubscribe()
        }
    }, [qrCodeId])


    return {
        loading,
        qrToken
    }
}

export default useListeningQrByEventId