import { useEffect, useRef, useState } from "react";
import Pointer from "./Pointer";
import Separator from "./Separator";
import useMousePosition from "./useMousePos";

type Props = {
  dates: number[];
  selectedDate: number;
};

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

function DateSelector({ dates, selectedDate: initialSelectedDate }: Props) {
  const [selectedDate, setSelectedDate] = useState(initialSelectedDate);
  const [dragging, setDragging] = useState(false);
  const pointerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useMousePosition();

  useEffect(() => {
    if (!pointerRef.current) return;

    const parentElement = pointerRef.current.parentElement!;
    const parentBoundRect = parentElement.getBoundingClientRect();

    const barWidth = parentBoundRect.width;
    const pointerPos = clamp(
      mousePosition.x - parentBoundRect.left,
      0,
      barWidth
    );

    if (dragging) {
      // The +48 is to account for the red arrows on the side
      pointerRef.current.style.left = `${pointerPos + 48}px`;

      setSelectedDate(
        Math.min(
          Math.floor((pointerPos / barWidth) * dates.length),
          dates.length - 1
        )
      );
    } else {
      // Note to whomever is reading this:
      // just figure it out it's not that hard
      pointerRef.current.style.left = `${
        (selectedDate / 5) * barWidth + 48 + barWidth / 10
      }px`;
    }
  }, [mousePosition, dragging, dates.length, selectedDate]);

  useEffect(() => {
    setSelectedDate(initialSelectedDate)
  }, [initialSelectedDate])

  useEffect(() => {
    const setDraggingFalse = () => setDragging(false);

    document.addEventListener("mouseup", setDraggingFalse);

    return () => document.removeEventListener("mouseup", setDraggingFalse);
  }, []);

  return (
    <>
      <div className="bg-themered-500 grow shadow-[inset_0_0px_4px_0_rgba(0,0,0,0.5)] flex items-center select-none justify-evenly text-xl font-medium text-themered-100">
        <Pointer ref={pointerRef} onMouseDown={() => setDragging(true)} />
        {dates.map((date) => (
          <>
            <span>{date}</span>
            {date !== dates[dates.length - 1] && <Separator />}
          </>
        ))}
      </div>
    </>
  );
}

export default DateSelector;
