import React, { useEffect, useState } from 'react'
import { IMenu } from '../../../../interfaces/modules-interface';
import { menuController } from '../../../../controllers/menu/MenuControlller';

const useListeningModule = (moduleId: string) => {
    const [module, setModule] = useState<IMenu>({} as IMenu);
    const [loading, setLoading] = useState(true);
    const onSet = (modulesRealTime: IMenu) => {
        setModule(modulesRealTime)
        setLoading(false)
    }
    useEffect(() => {
        const unsubscribe = menuController.listeningMenu(moduleId, onSet)
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