import { applicationStates } from "@/types";
import React from "react";
import Image from "next/image";
import useLanguageStore from "@/stores/language-store";

interface iStatusBoxProps {
  currentState: number;
}

//------------------------ Main function ------------------------
const StatusBox: React.FC<iStatusBoxProps> = ({ currentState }) => {
  const { l } = useLanguageStore();

  //------------------------ JSX ------------------------
  return (
    <div
      className="h-20 rounded-2xl pl-6 flex items-center"
      style={{ backgroundColor: applicationStates[currentState].color }}
    >
      <div className="m-3">
        <Image
          src={applicationStates[currentState].icon}
          alt="icon"
          width={20}
          height={20}
        />
      </div>
      <div className="flex flex-col justify-center">
        <h4 className="text-sm font-semibold">
          {l("trialdetails.applicationstate.header") || "Application Status"}
        </h4>
        <p className="text-xs font-normal">
          {l(applicationStates[currentState].stateKey) ||
            applicationStates[currentState].stateText}
        </p>
      </div>
    </div>
  );
};

export default StatusBox;
