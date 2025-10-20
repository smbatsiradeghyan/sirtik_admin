import { useCallback, useEffect, useRef, useState } from "react";


type DeviceType = 'isMobile' | 'isTablet' | 'isLaptop' | 'isDesktop' | 'moreThenDesktop'
const getDeviceType = (size: number): DeviceType => {
  if (size < 768) return "isMobile"
  if (size < 1024 && size > 767) return "isTablet"
  if (size < 1400 && size > 1023) return "isLaptop"
  if (size < 1920 && size > 1399) return "isDesktop"
  return 'moreThenDesktop'

}

export const useSize = () => {
  const [deviceType, setDeviceType] = useState<DeviceType>("isDesktop");
  const deviceSize = useRef(window.innerWidth)

  const handleResize = useCallback(() => {
    if (typeof window === 'undefined') return;
    const newDeviceType = getDeviceType(window.innerWidth);
    if (newDeviceType !== deviceType) {
      setDeviceType(newDeviceType);
      deviceSize.current = window.innerWidth
    }
  }, [deviceType]);


  useEffect(() => {
    if (typeof window !== 'undefined') {
      handleResize();
      window.addEventListener('resize', handleResize);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, [handleResize]);


  return {
    deviceType,

    isUpToTablet : deviceSize.current < 1024,
    isUpToLapTop : deviceSize.current < 1400,
    isUpToDesktop: deviceSize.current < 1920,

    isMoreThenMobile : deviceSize.current > 767,
    isMoreThenTablet : deviceSize.current > 1023,
    isMoreThenLaptop : deviceSize.current > 1399,
    isMoreThenDesktop: deviceSize.current > 1920,


  };

}
