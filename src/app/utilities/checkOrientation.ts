// utils/CheckOrientation.ts
import { useEffect, useState } from "react";

const useOrientationCheck = () => {
    const [isPortrait, setIsPortrait] = useState<boolean>(false);

    useEffect(() => {
        const handleOrientationChange = () => {
            setIsPortrait(window.innerWidth < window.innerHeight);
        };

        window.addEventListener('resize', handleOrientationChange);
        handleOrientationChange(); // Initial check

        return () => {
            window.removeEventListener('resize', handleOrientationChange);
        };
    }, []);

    return isPortrait;
};

export default useOrientationCheck;
