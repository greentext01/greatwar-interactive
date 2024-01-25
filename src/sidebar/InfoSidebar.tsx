import DOMPurify from "dompurify";
import { InfoType } from "../misc/types";
import DateDisplay from "./DateDisplay";
import ThreeDots from "../icons/three-dots.svg?react";
import { useState } from "react";
import { useSetAtom } from "jotai";
import { sidebarStateAtom } from "../misc/atoms";
import { firebaseToForm } from "../misc/postFns";
import { auth, db } from "../main";
import { useAuthState } from "react-firebase-hooks/auth";
import { deleteDoc, doc } from "firebase/firestore";
import toast from "react-hot-toast";

export default function InfoSidebar({
  selectedInfo,
}: {
  selectedInfo: InfoType;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const setSidebarState = useSetAtom(sidebarStateAtom);
  const [user] = useAuthState(auth);

  return (
    <div
      className="h-full overflow-y-auto scrollbar-thumb-themered-200 relative
        scrollbar-track-themered-950 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin"
    >
      <div
        className="absolute right-0 flex flex-col items-end"
        onMouseEnter={() => setMenuOpen(true)}
        onMouseLeave={() => setMenuOpen(false)}
      >
        {user?.uid === selectedInfo.ownerId && (
          <div className="bg-red-800 text-white rounded-lg px-3 py-1 w-min flex">
            <ThreeDots height={20} width={20} className="fill-white" />
          </div>
        )}
        {user?.uid === selectedInfo.ownerId && menuOpen && (
          <div
            className="bg-themered-500 font-semibold mt-1 p-2 px-4 rounded-xl rounded-tr-sm text-white/90 shadow-faintInset cursor-pointer 
                              flex flex-col divide-y divide-white/25 w-max"
          >
            <div
              className="py-1.5 px-2 hover:text-gray-300 text-center"
              onClick={() =>
                setSidebarState({
                  kind: "formShown",
                  info: firebaseToForm(selectedInfo),
                })
              }
            >
              Edit
            </div>
            <div
              className="py-1.5 px-2 hover:text-gray-300 text-center"
              onClick={() => {
                toast.promise(deleteDoc(doc(db, "points", selectedInfo.id)), {
                  error: "Failed to delete post",
                  loading: "Deleting post...",
                  success: () => {                  
                    setSidebarState({ kind: "closed" });
                    return "Post deleted";
                  },
                });
              }}
            >
              Delete
            </div>
          </div>
        )}
      </div>
      <h1 className="font-bold text-3xl text-white text-center">
        {selectedInfo.name}
      </h1>
      <h2 className="text-2xl text-themered-100 text-center">
        <DateDisplay
          dateFrom={selectedInfo.dateFrom}
          dateTo={selectedInfo.dateTo}
        />
      </h2>
      <h3 className="font-semibold text-themered-100 text-center mt-2">
        Posted by {selectedInfo.ownerName ?? "Anonymous"}
      </h3>
      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(selectedInfo.body),
        }}
        className="mt-3 text-white/80 mx-5 text-justify break-words"
      />
    </div>
  );
}
