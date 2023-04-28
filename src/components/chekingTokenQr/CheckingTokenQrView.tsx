import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { eventController } from '../../controllers/events/event.controller';
import { Button, Result } from 'antd';
import { ResultStatusType } from 'antd/es/result';
import { useAppDispatch, useAppSelector } from '../../store/store';
import LoadingComponent from '../loading/LoadingComponent';
import { logout } from '../../store/auth';

const CheckingTokenQrView = () => {
  const { eventId = '', token = '' } = useParams();
  const [status, setStatus] = useState<ResultStatusType | 'cheking'>('cheking')
  const [text, setText] = useState('')
  const { uid } = useAppSelector(selector => selector.auth)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  if (uid === null) {
    dispatch(logout({}))
    return <Navigate to={'/auth/login'} />
  }
  console.log(status)
  const handledError = (status: '500' | '403' | 'success' | 'warning' | '404') => {
    switch (status) {
      case '500':
        setStatus('500')
        setText('Lo sentimos, ocurrio un error inesperado al marcar su asistencia')
        break;
      case '403':
        setStatus('403')
        setText('El token es invalido, vuelva a escanearlo')
        break;
      case 'success':
        console.log('epale')
        setStatus('success')
        setText('Se ha tomado su asistencia con exito')
        break;
      case 'warning':
        setStatus('success')
        setText('Ya se encuentra marcada su asistencia')
        break;
      case '404':
        setStatus('404')
        setText('El evento no existe')
        break;
      default:
        break;
    }
  }

  const chekingQr = async () => {
    if (status === 'success') return

    const eventExist = await eventController.eventExist(eventId)
    const isAlreadyCheck = await eventController.alreadyCheck(uid, eventId)
    if (isAlreadyCheck === undefined || eventExist === undefined) {
      handledError('500')
    }
    if (!eventExist) {
      return handledError('404')
    }
    if (isAlreadyCheck) {
      handledError('warning')
      return
    }
    const validToken = await eventController.checkingToken(token, uid, eventId)
    if (validToken === undefined) {
      handledError('500')
      return
    }

    if (!validToken) {
      handledError('403')
      return
    }
    const createAttendance = await eventController.createCheck(uid, eventId)
    if (createAttendance === 201) handledError('success')
    if (createAttendance === 500) handledError('500')
  }


  useEffect(() => {
    chekingQr()
  }, [uid])


  if (status === 'cheking') return <LoadingComponent isLoading={status === 'cheking'} />
  return (
    <Result
      status={status}
      title={text}
      extra={[
        <Button type="primary" key="console" onClick={() => navigate('/events/all-events')}>
          Ver todos los eventos
        </Button>,
      ]}
    />
  )
}

export default CheckingTokenQrView