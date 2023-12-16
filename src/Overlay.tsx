import DateSelector, { startDate } from "./timeline/DateSelector";
import { useState } from "react";
import { range } from "./util";
import { LeftArrow, RightArrow } from "./timeline/Arrows";
import Sidebar, { formShownAtom, selectedInfoAtom } from "./sidebar/Sidebar";
import Disclaimer from "./map/Disclaimer";
import NewPostButton from "./sidebar/NewPostButton";
import { useAtom } from "jotai";

function Overlay() {
  const [section, setSection] = useState(0);
  const [, setFormShown] = useAtom(formShownAtom);
  const [, setSelectedInfo] = useAtom(selectedInfoAtom);

  return (
    <>
      <Sidebar />
      <div className="select-none flex absolute right-5 left-5 bottom-5 md:right-10 md:left-10 md:bottom-8 h-20 rounded-3xl overflow-clip">
        <LeftArrow onClick={() => setSection(section - 3)} />
        <DateSelector
          dates={range(section + startDate, section + startDate + 5)}
        />
        <RightArrow onClick={() => setSection(section + 3)} />
        <div className="shadow-faintInset h-full w-full rounded-3xl absolute pointer-events-none" />
      </div>
      <NewPostButton
        onClick={() => {
          setFormShown(true);
          setSelectedInfo(undefined);
        }}
      />
      <Disclaimer />
    </>
  );
}

export default Overlay;
