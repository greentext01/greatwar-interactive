import DateSelector from "./DateSelector";
import { useState } from "react";

const dates = [1914, 1915, 1916, 1917, 1918];

function Overlay() {
  const [selectedDate, setSelectedDate] = useState(0);

  return (
    <div className="flex absolute right-5 left-5 bottom-5 md:right-24 md:left-24 md:bottom-14 h-20 drop-shadow-[0_0px_5px_rgba(255,255,255,0.15)]">
      <div
        className="w-12 h-full bg-themered-900 rounded-l-3xl flex items-center justify-center"
        onClick={() => setSelectedDate((prev) => Math.max(prev - 1, 0))}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          className="bi bi-chevron-left fill-themered-100"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
          />
        </svg>
      </div>
      <DateSelector dates={dates} selectedDate={selectedDate} />
      <div
        className="w-12 h-full bg-themered-900 rounded-r-3xl flex items-center justify-center"
        onClick={() =>
          setSelectedDate((prev) => Math.min(prev + 1, dates.length - 1))
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          className="bi bi-chevron-right fill-themered-100"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </div>
    </div>
  );
}

export default Overlay;
