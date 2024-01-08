import { DocumentData, GeoPoint, Timestamp } from "firebase/firestore";
import { z } from "zod";
import { extractLongLat } from "./util";

export const Info = z.object({
  id: z.string(),
  type: z.enum(["battle", "info", "event", "context", "important"]),
  body: z.string(),
  name: z.string(),
  dateFrom: z.date(),
  dateTo: z.date(),
  coordinates: z.array(z.number()).length(2),
  ownerName: z.string().optional(),
  ownerId: z.string().optional(),
  delta: z.string(),
});

export type InfoType = z.infer<typeof Info>;

export type Post =
  | InfoType
  | {
      coordinates: GeoPoint;
      dateFrom: Timestamp;
      dateTo: Timestamp;
    };

export function processInfo(doc: DocumentData): InfoType | undefined {
  try {
    return Info.parse({
      ...doc.data(),
      id: doc.id,
      coordinates: extractLongLat(doc.data().coordinates),
      dateFrom: doc.data().dateFrom.toDate(),
      dateTo: doc.data().dateTo.toDate(),
    });
  } catch {
    console.error("Found corrupted entry in database:", doc.id);
    return;
  }
}
