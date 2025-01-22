interface iTrialStatusBadgeProps {
  approvedAt: string;
  publishedAt: string;
  referred: boolean;
  declined: boolean;
}

//----------------------------- main function -------------------------------
export default function TrialStatusBadge({
  approvedAt,
  referred,
  declined,
  // publishedAt,
}: iTrialStatusBadgeProps) {


  //--- getStatusText function ---
  const getStatusText = () => {
    if (declined) return "Declined";
    if (referred) return "Referred";
    if (approvedAt === "0001-01-01T00:00:00") return "Pending Approval";
    if (approvedAt !== "0001-01-01T00:00:00") return "Approved";
    // if (publishedAt !== "0001-01-01T00:00:00") return "Published";
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
