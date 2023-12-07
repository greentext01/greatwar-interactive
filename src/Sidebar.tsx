import DOMPurify from "dompurify";
import { atom, useAtom } from "jotai";
import { z } from "zod";

export const Info = z.object({
  type: z.enum(["battle", "info", "event", "context"]),
  body: z.string(),
  name: z.string(),
  dateFrom: z.date(),
  dateTo: z.date(),
  coordinates: z.array(z.number()).length(2).optional(),
});

export type InfoType = z.infer<typeof Info>;

export const selectedInfoAtom = atom<InfoType | undefined>(undefined);

export default function Sidebar() {
  const [selectedInfo, setSelectedInfo] = useAtom(selectedInfoAtom);

  if (selectedInfo)
    return (
      <div className="absolute top-10 left-10 w-[550px] h-[350px] rounded-3xl bg-themered-500 p-5 shadow-lg">
        <img
          src="/close.svg"
          className="w-4 h-4"
          onClick={() => setSelectedInfo(undefined)}
        />
        <h1 className="font-bold text-3xl text-white text-center">
          {selectedInfo.name}
        </h1>
        <h2 className="text-2xl text-themered-100 text-center">
          {selectedInfo.dateFrom === selectedInfo.dateTo ? (
            <>
              {selectedInfo.dateFrom.getUTCFullYear()}-
              {selectedInfo.dateTo.getUTCFullYear()}
            </>
          ) : (
            selectedInfo.dateFrom.getUTCFullYear()
          )}
        </h2>
        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedInfo.body) }}  />
      </div>
    );
  else return <></>;
}
