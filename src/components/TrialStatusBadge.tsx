interface iTrialStatusBadgeProps {
  isApproved: boolean;
  isPublished: boolean;
  referred: boolean;
  declined: boolean;
}

//----------------------------- main function -------------------------------
export default function TrialStatusBadge({
  isApproved,
  referred,
  declined,
  // isPublished,
}: iTrialStatusBadgeProps) {


  //--- getStatusText function ---
  const getStatusText = () => {
    if (declined) return "Declined";
    if (referred) return "Referred";
    if (!isApproved) return "Pending Approval";
    if (isApproved) return "Approved";
    // if (isPublished ) return "Published";
  };

  const getBgColor = () => {
    const status = getStatusText();
    if (status === "Pending Approval") return "bg-bgColor-yellow2 text-black";
    if (status === "Approved") return "bg-bgColor-green2 text-white";
    if (status === "Referred") return "bg-bgColor-blue text-black";
    if (status === "Declined") return "bg-bgColor-red2 text-white";
    // if (status === "Published") return "bg-blue-500 text-white";
    return "bg-transparent";
  };

  //-------------------------- JSX ------------------------------
  return (
    <div className={`flex_center rounded-full px-3 py-2 ${getBgColor()}`}>
      <p className="text-sm font-medium">{getStatusText()}</p>
    </div>
  );
}
