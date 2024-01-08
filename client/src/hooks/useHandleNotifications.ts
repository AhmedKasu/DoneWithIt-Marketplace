import { useEffect } from 'react';

const useHandleNotifications = (
  notficationState: boolean,
  setNotficationState: React.Dispatch<React.SetStateAction<boolean>>,
  delay: number = 4000
) => {
  useEffect(() => {
    if (!notficationState) return;

    setNotficationState(true);
    const timer = setTimeout(() => {
      setNotficationState(false);
    }, delay);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notficationState]);
};

export default useHandleNotifications;
