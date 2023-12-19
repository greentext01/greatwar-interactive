import DOMPurify from "dompurify";
import { InfoType } from "../misc/types";

export default function InfoSidebar({
  selectedInfo,
}: {
  selectedInfo: InfoType;
}) {
  return (
    <>
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
        <h3 className="font-semibold text-themered-100 text-center mt-2">
          Written by {selectedInfo.ownerName ?? "Anonymous"}
        </h3>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(selectedInfo.body),
          }}
          className="mt-3 text-white/80 mx-5 text-justify"
        />
      </div>
    </>
  );
}
