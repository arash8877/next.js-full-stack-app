import { applicationStates, iUserTrialApplication } from "@/types";

interface iTrialStatusBadgeProps {
  userApplication: iUserTrialApplication;
}

export default function TrialStatusBadge({ userApplication }: iTrialStatusBadgeProps) {
  return (
    <div
      className={`flex_center rounded-full px-3 py-2`} style={{backgroundColor: applicationStates[userApplication.applicationStates[userApplication.applicationStates.length-1].state].color}}
    >
      <p className="text-sm font-medium">{applicationStates[userApplication.applicationStates[userApplication.applicationStates.length-1].state].stateText}</p>
    </div>
  );
}
