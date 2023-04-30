import React from 'react';
import loadingImage from '../../assets/Logo-Opcion-Atlantico-2022.svg';
import './css/loadingComponent.css';
import { LoadingComponentProps } from './interfaces/loading_interface';


const LoadingComponent = ({ isLoading,size=400 }:LoadingComponentProps) => {
	if (!isLoading) return null;

	return (
		<div className='loading-container'>
			<img src={loadingImage} style={{height:size}} alt='Loading...' className='loading-image' />
		</div>
	);
};

export default LoadingComponent;
