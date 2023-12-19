import { GeoPoint, Timestamp } from "firebase/firestore";
import { z } from "zod";

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
});

export type InfoType = z.infer<typeof Info>;

export type Post =
  | InfoType
  | {
      coordinates: GeoPoint;
      dateFrom: Timestamp;
      dateTo: Timestamp;
    };
