import { useState, useEffect } from 'react';

interface WindowSize {
    width: number;
    height: number;
    isMobile: boolean;
}

const useGetMonitorSize = (): WindowSize => {
    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: 1920,
        height: 1080,
        isMobile: false
    });
    useEffect(() => {

        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
                isMobile: window.innerWidth < 500
            });
        }

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
};

export default useGetMonitorSize;