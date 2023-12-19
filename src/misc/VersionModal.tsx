import Close from "../icons/close.svg?react";
import { settings } from "./settings";

export default function VersionModal({onClose}: {onClose: () => void}) {
  return (
    <div className="fixed bottom-0 top-0 left-0 right-0 bg-black/30">
      <div className="fixed flex items-center justify-center bg-themered-500 shadow-evenInset top-20 left-20 right-20 bottom-20 rounded-3xl">
        <Close
          className="right-6 top-6 w-8 h-8 cursor-pointer absolute bg-red-950/50 rounded-full p-1"
          onClick={onClose}
        />
        <div className="p-4 bg-themered-500 rounded-3xl overflow-clip gap-1 flex flex-col items-center max-w-2xl">
          <img src="/icon.png" alt="Icon" width="150" height="150" />
          <h1 className="font-bold text-5xl text-white text-center">
            Clipboard History
          </h1>
          <h2 className="font-semibold text-3xl text-red-200 text-center mb-3">
            Version {settings.version}
          </h2>
          <h2 className=" text-lg text-red-200 text-center mb-8">
            <p>
              Website made by Olivier (
              <a
                href="https://github.com/greentext01/greatwar-interactive"
                target="_blank"
                className="text-blue-400 underline"
              >
                See the source code!
              </a>
              )
            </p>
            <p>Planning & Communication by Alex and Andre</p>
            <p>Official bossman: Aidan MacLean</p>
          </h2>

          <h2 className="font-semibold text-3xl text-red-200 text-center mb-1">
            Release Notes
          </h2>
          <ul className="list-disc text-red-200 mb-5">
            <li>Added accounts</li>
            <li>Added faded markers</li>
            <li>Moved around the new post button</li>
            <li>Added toast notifications</li>
            <li>Restructured codebase</li>
          </ul>

          <p className="text-red-200 text-center">
            This is an early version of the site; expect occasional bugs.
            Please report any bugs you find to{" "}
            <a
              href="mailto:oaude1@ocdsb.ca"
              className="text-blue-400 underline"
            >
              oaude1@ocdsb.ca
            </a>
            , or just tell me in person
          </p>
        </div>
      </div>
    </div>
  );
}
