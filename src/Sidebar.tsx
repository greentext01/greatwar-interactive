import DOMPurify from "dompurify";
import { atom, useAtom } from "jotai";
import { z } from "zod";
import Close from "./icons/close.svg?react";

export const Info = z.object({
  id: z.string(),
  type: z.enum(["battle", "info", "event", "context", "important"]),
  body: z.string(),
  name: z.string(),
  dateFrom: z.date(),
  dateTo: z.date(),
  coordinates: z.array(z.number()).length(2),
});

export type InfoType = z.infer<typeof Info>;

export const selectedInfoAtom = atom<InfoType | undefined>(undefined);

export default function Sidebar() {
  const [selectedInfo, setSelectedInfo] = useAtom(selectedInfoAtom);

  if (selectedInfo)
    return (
      <>
        <div className="absolute top-10 left-10 w-[500px] h-[350px] rounded-3xl shadow-evenInset z-10 pointer-events-none" />
        <div className="absolute top-10 left-10 w-[500px] h-[350px] rounded-3xl bg-themered-500 overflow-y-scroll scrollbar-thumb-themered-200 scrollbar-track-themered-950 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin p-1 border-[20px] border-transparent">
          <Close
            className="w-4 h-4 cursor-pointer sticky top-0"
            onClick={() => setSelectedInfo(undefined)}
          />
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
      </>
    );
  else return <></>;
}
