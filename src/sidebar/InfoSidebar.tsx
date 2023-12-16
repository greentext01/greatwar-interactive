import { useAtom } from "jotai";
import Close from "../icons/close.svg?react";
import { InfoType, selectedInfoAtom } from "./Sidebar";
import DOMPurify from "dompurify";

export default function InfoSidebar({
  selectedInfo,
}: {
  selectedInfo: InfoType;
}) {
  const [_, setSelectedInfo] = useAtom(selectedInfoAtom);

  return (
    <>
      <div className="absolute top-10 left-10 w-[500px] h-[350px] rounded-3xl shadow-evenInset z-10 pointer-events-none" />
      <div className="absolute top-10 left-10 w-[500px] h-[350px] rounded-3xl p-5 bg-themered-500 ">
        <Close
          className="left-4 top-4 w-6 h-6 cursor-pointer absolute bg-red-950/50 rounded-full p-1"
          onClick={() => setSelectedInfo(undefined)}
        />
        <div
          className="h-full overflow-y-auto scrollbar-thumb-themered-200
        scrollbar-track-themered-950 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin"
        >
          <h1 className="font-bold text-3xl text-white text-center">
            {selectedInfo.name}
          </h1>
          <h2 className="text-2xl text-themered-100 text-center">
            {selectedInfo.dateFrom.getUTCFullYear() ===
            selectedInfo.dateTo.getUTCFullYear() ? (
              selectedInfo.dateFrom.getUTCFullYear()
            ) : (
              <>
                {selectedInfo.dateFrom.getUTCFullYear()}-
                {selectedInfo.dateTo.getUTCFullYear()}
              </>
            )}
          </h2>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(selectedInfo.body),
            }}
            className="mt-3 text-white/80 mx-5 text-justify"
          />
        </div>
      </div>
    </>
  );
}
