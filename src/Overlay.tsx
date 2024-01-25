import DateSelector from "./timeline/DateSelector";
import React from "react";
import { range, useStickyState } from "./misc/util";
import { LeftArrow, RightArrow } from "./timeline/Arrows";
import Disclaimer from "./map/Disclaimer";
import NewPostButton from "./sidebar/NewPostButton";
import { useSetAtom } from "jotai";
import VersionModal from "./misc/VersionModal";
import UserIcon from "./auth/UserIcon";
import { settings } from "./misc/settings";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./main";
import { ErrorBoundary } from "react-error-boundary";
import { fallbackRender } from "./misc/Error";
import { sidebarStateAtom } from "./misc/atoms";
const Sidebar = React.lazy(() => import("./sidebar/Sidebar"));

function Overlay() {
  const [section, setSection] = useStickyState(settings.startDate, "section");
  const [modalShown, setModalShown] = useStickyState(
    true,
    `modalShown_${settings.version}`
  );
  const setSidebarStatus = useSetAtom(sidebarStateAtom);
  const [user] = useAuthState(auth);

  return (
    <>
      <ErrorBoundary fallbackRender={fallbackRender}>
        <Sidebar />
      </ErrorBoundary>
      <ErrorBoundary fallbackRender={fallbackRender}>
        <div className="select-none flex absolute right-5 left-5 bottom-5 md:right-10 md:left-10 md:bottom-8 h-20 rounded-3xl overflow-clip">
          <LeftArrow onClick={() => setSection(section - 3)} />
          <DateSelector dates={range(section, section + 5)} />
          <RightArrow onClick={() => setSection(section + 3)} />
          <div className="shadow-faintInset h-full w-full rounded-3xl absolute pointer-events-none" />
        </div>
      </ErrorBoundary>
      {user && (
        <NewPostButton
          onClick={() => setSidebarStatus({ kind: "formShown" })}
        />
      )}
      <Disclaimer />
      <ErrorBoundary fallbackRender={fallbackRender}>
        <UserIcon />
      </ErrorBoundary>
      <ErrorBoundary fallbackRender={fallbackRender}>
        {modalShown && <VersionModal onClose={() => setModalShown(false)} />}
      </ErrorBoundary>
    </>
  );
}

export default Overlay;
