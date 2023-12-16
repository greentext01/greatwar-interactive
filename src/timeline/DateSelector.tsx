import { atom, useAtom } from "jotai";
import { Fragment } from "react";

type Props = {
  dates: number[];
};

export const startDate = 1914;
export const dateAtom = atom(startDate);

function DateSelector({ dates }: Props) {
  const [selectedDate, setDate] = useAtom(dateAtom);

  return (
    <div className="bg-themered-500 grid grid-cols-5 grow text-xl font-medium text-themered-100 divide-x-2 divide-themered-200/50">
      {dates.map((date) => (
        <Fragment key={date}>
          <span
            className={`w-full h-full flex items-center justify-center ${
              date === selectedDate ? "bg-themered-800 shadow-inner" : ""
            }`}
            onClick={() => setDate(date)}
          >
            {date}
          </span>
        </Fragment>
      ))}
    </div>
  );
}

export default DateSelector;
