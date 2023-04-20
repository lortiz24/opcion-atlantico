import React, { useEffect, useState } from 'react'
import { IModules } from '../../../../interfaces/modules-interface';
import { getModule } from '../../../../firebase/menu/menu-services';

const useGetModule = (moduleId: string) => {
    const [module, setModule] = useState<IModules>({} as IModules);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getModuleAsync()
    }, [])

    const getModuleAsync = async () => {
        const data = await getModule(moduleId)
        if (data) {
            setModule(data)
        }
        setLoading(false)
    }
    return {
        loading,
        module
    }
}

export default useGetModule