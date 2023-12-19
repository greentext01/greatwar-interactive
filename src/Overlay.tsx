import DateSelector from "./timeline/DateSelector";
import { useState } from "react";
import { range, useStickyState } from "./misc/util";
import { LeftArrow, RightArrow } from "./timeline/Arrows";
import Sidebar from "./sidebar/Sidebar";
import Disclaimer from "./map/Disclaimer";
import NewPostButton from "./sidebar/NewPostButton";
import { useAtom } from "jotai";
import VersionModal from "./misc/VersionModal";
import UserIcon from "./auth/UserIcon";
import { formShownAtom, selectedInfoAtom } from "./misc/atoms";
import { settings } from "./misc/settings";

function Overlay() {
  const [section, setSection] = useState(settings.startDate);
  const [modalShown, setModalShown] = useStickyState(true, `modalShown_${settings.version}`);
  const [, setFormShown] = useAtom(formShownAtom);
  const [, setSelectedInfo] = useAtom(selectedInfoAtom);

  return (
    <>
      <Sidebar />
      <div className="select-none flex absolute right-5 left-5 bottom-5 md:right-10 md:left-10 md:bottom-8 h-20 rounded-3xl overflow-clip">
        <LeftArrow onClick={() => setSection(section - 3)} />
        <DateSelector
          dates={range(section, section + 5)}
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
      <UserIcon />
      {modalShown && <VersionModal onClose={() => setModalShown(false)} />}
    </>
  );
}

export default Overlay;
