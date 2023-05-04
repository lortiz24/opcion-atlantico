import { useState, useEffect } from 'react';

interface WindowSize {
    width: number;
    height: number;
}

const useGetMonitorSize = () => {
    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: 1920,
        height: 1080,
    });

    const [isTable, setIsTable] = useState(false);
    const [isMobile, setisMobile] = useState(false)

    useEffect(() => {

        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
            setisMobile(window.innerWidth < 500)
            setIsTable(window.innerWidth < 1000)
        }

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return {
        windowSize,
        isTable,
        isMobile
    };
};

export default useGetMonitorSize;