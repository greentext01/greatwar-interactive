// Credit: https://www.joshwcomeau.com/snippets/react-hooks/use-mouse-position/

import { useEffect, useState } from "react";

type State = {
  x: number,
  y: number,
}

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState<State>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    
    window.addEventListener("mousemove", updateMousePosition);
    
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return mousePosition;
};

export default useMousePosition;
