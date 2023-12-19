import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../main";

type Props = {
  setDropdownShown: (shown: boolean) => void;
};

export default function SignInButton({ setDropdownShown }: Props) {
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  return (
    <div
      onClick={() => {
        signInWithGoogle();
        setDropdownShown(false);
      }}
      className="bg-black font-semibold fixed top-10 left-10 p-3 px-5 rounded-2xl text-white gap-2 text-lg shadow-faintInset cursor-pointer flex"
    >
      <img src="/Google__G__logo.svg" alt="Google logo" />
      Sign in with Google
    </div>
  );
}
