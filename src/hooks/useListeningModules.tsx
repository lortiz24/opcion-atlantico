import React, { useEffect, useState } from 'react'
import { IMenu } from '../interfaces/modules-interface'
import { menuController } from '../controllers/menu/MenuControlller';

const useListeningModules = () => {

  const [modules, setModules] = useState<IMenu[]>([]);
  const [loading, setLoading] = useState(true);
  const onSet = (modulesRealTime: IMenu[]) => {
    setModules(modulesRealTime)
    setLoading(false)
  }
  useEffect(() => {
    const unsubscribe = menuController.listeningMenus(onSet)
    return () => {
      unsubscribe()
    }
  }, [])

  return {
    loading,
    modules
  }
}

export default useListeningModules