import React, { useEffect, useState } from 'react'
import { IModules } from '../../../../interfaces/modules-interface';
import { listeningModule } from '../../../../firebase/menu/menu-services';

const useListeningModule = (moduleId: string) => {
    const [module, setModule] = useState<IModules>({} as IModules);
    const [loading, setLoading] = useState(true);
    const onSet = (modulesRealTime: IModules) => {
        setModule(modulesRealTime)
        setLoading(false)
    }
    useEffect(() => {
        const unsubscribe = listeningModule(moduleId, onSet)
        return () => {
            unsubscribe()
        }
    }, [])

    return {
        loading,
        module
    }
}

export default useListeningModule