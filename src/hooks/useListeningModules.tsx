import React, { useEffect, useState } from 'react'
import { IModules } from '../interfaces/modules-interface'
import { listeningModules } from '../firebase/menu/menu-services';

const useGetModules = () => {

  const [modules, setModules] = useState<IModules[]>([]);
  const [loading, setLoading] = useState(true);

  const onSet = (modulesRealTime: IModules[]) => {
    console.log('modulesRealTime', modulesRealTime)
    setModules(modulesRealTime)
    setLoading(false)
  }
  useEffect(() => {
    const unsubscribe = listeningModules(onSet)
    return () => {
      console.log('Desmontando listeningModules')
      unsubscribe()
    }
  }, [])

  return {
    loading,
    modules
  }
}

export default useGetModules