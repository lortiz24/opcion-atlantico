import React, { useEffect, useState } from 'react';
import { IMenu } from '../../../../interfaces/modules-interface';
import { menuController } from '../../../../controllers/menu/MenuControlller';

const useGetModule = (moduleId: string) => {
	const [module, setModule] = useState<IMenu>({} as IMenu);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (moduleId) getModuleAsync();
	}, [moduleId]);

	const getModuleAsync = async () => {
		const data = await menuController.getMenu(moduleId);
		if (data) {
			setModule(data);
		}
		setLoading(false);
	};
	return {
		loading,
		module,
	};
};

export default useGetModule;
