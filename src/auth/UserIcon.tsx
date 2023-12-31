import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../main";
import { useState } from "react";
import { signOut } from "firebase/auth";
import SignInButton from "./SignInButton";
import { sidebarStateAtom } from "../misc/atoms";
import { useSetAtom } from "jotai";

export default function UserIcon() {
  const [user, loading] = useAuthState(auth);
  const [dropdownShown, setDropdownShown] = useState(false);
  const setSidebarStatus = useSetAtom(sidebarStateAtom);

  if (loading) return <></>;
  else if (user) {
    return (
      <div
        className="fixed top-10 left-10 z-0"
        onMouseEnter={() => setDropdownShown(true)}
        onMouseLeave={() => setDropdownShown(false)}
      >
        <div className="flex items-center justify-center bg-red-600 shadow-evenInset rounded-full w-16 h-16">
          <img
            src={user.photoURL || "/Default_pfp.svg"}
            alt="User Icon"
            className="rounded-full w-14 h-14 bg-white"
          />
        </div>
        {dropdownShown && (
          <div
            className="bg-themered-500 font-semibold p-2 px-4 rounded-xl rounded-tl-sm text-white/90 shadow-faintInset cursor-pointer mt-2 w-max 
                          flex flex-col divide-y divide-white/25"
          >
            <div className="py-2 px-4 hover:text-gray-300" onClick={() => setSidebarStatus({kind: "myPostsShown"})}>My posts</div>
            <div
              className="py-2 px-4 hover:text-gray-300"
              onClick={() => signOut(auth)}
            >
              Sign out
            </div>
          </div>
        )}
      </div>
    );
  } else return <SignInButton setDropdownShown={setDropdownShown} />;
}
