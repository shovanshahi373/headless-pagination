import { useRef, useEffect } from "react";

interface IUseMountProps {
  onMount: () => void;
  onUnmount?: () => void;
}

const useMount = ({ onMount, onUnmount }: IUseMountProps, ...deps: any[]) => {
  const mountRef = useRef(false);

  useEffect(() => {
    mountRef.current && onMount();
  }, [...deps]);

  useEffect(() => {
    mountRef.current = true;
    return () => {
      mountRef.current = false;
      onUnmount && onUnmount();
    };
  }, []);

  return {
    isMounted: mountRef.current,
  };
};

export default useMount;
