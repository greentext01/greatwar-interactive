import { atom, useAtom } from "jotai";
import { z } from "zod";
import InfoSidebar from "./InfoSidebar";
import NewPostForm from "./NewPostForm";

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
export const formShownAtom = atom(false);

export default function Sidebar() {
  const [selectedInfo] = useAtom(selectedInfoAtom);
  const [formShown] = useAtom(formShownAtom);

  if (formShown) return <NewPostForm />;
  else if (selectedInfo) return <InfoSidebar selectedInfo={selectedInfo} />;
  else return <></>
}
