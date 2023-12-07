import DateSelector, { startDate } from "./DateSelector";
import { useState } from "react";
import { range } from "./util";
import { LeftArrow, RightArrow } from "./Arrows";
import Sidebar from "./Sidebar";

function Overlay() {
  const [section, setSection] = useState(0);

  return (
    <>
      <Sidebar  />
      <div className="select-none flex absolute right-5 left-5 bottom-5 md:right-10 md:left-10 md:bottom-8 h-20 drop-shadow-lg">
        <LeftArrow onClick={() => setSection(section - 3)} />
        <DateSelector
          dates={range(section + startDate, section + startDate + 5)}
        />
        <RightArrow onClick={() => setSection(section + 3)} />
      </div>
    </>
  );
}

export default Overlay;
