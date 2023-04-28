import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { eventController } from '../../controllers/events/event.controller';
import { Result } from 'antd';
import { ResultStatusType } from 'antd/es/result';
import { useAppSelector } from '../../store/store';

const CheckingTokenQrView = () => {
  const { eventId, token } = useParams();
  const [status, setStatus] = useState<ResultStatusType>('success')
  const [text, setText] = useState('')
  const { uid } = useAppSelector(selector => selector.auth)

  const chekingQr = async () => {
    if (!token || !uid || !eventId) return
    const check = await eventController.checkingToken(token, uid, eventId)
    if (check === undefined) {
      setStatus('error')
      setText('Ocurrio un problema, intentelo denuevo')
      return
    }

    console.log('check', check)
    if (check.alreadycheck) {
      setStatus('success')
      setText('Se ha tomado su asistencia con exito')
      return
    }

    if (!check.checking) {
      setStatus('403')
      setText('No es valida su asistencia, intentelo de nuevo')
      return
    }

    setStatus('success')
    setText('Se ha tomado su asistencia con exito')
  }

  useEffect(() => {
    chekingQr()
  }, [])

  return (
    <Result status={status} title={text} />
  )
}

export default CheckingTokenQrView