interface iTrialStatusBadgeProps {
  approvedAt: string;
  publishedAt: string;
  declined: boolean;
}

//----------------------------- main function -------------------------------
export default function TrialStatusBadge({
  approvedAt,
  publishedAt,
  declined,
}: iTrialStatusBadgeProps) {
  //--- getStatusText function ---
  const getStatusText = () => {
    if (approvedAt === "0001-01-01T00:00:00"  && publishedAt === "0001-01-01T00:00:00") return "Pending";
    if (publishedAt) return "Published";
    if (approvedAt) return "Approved";
    if (declined) return "Declined";
  };

  const getBgColor = () => {
    const status = getStatusText();
    if (status === "Published") return "bg-blue-500";
    if (status === "Approved") return "bg-bgColor-green2";
    if (status === "Pending") return "bg-bgColor-yellow2";
    if (status === "Declined") return "bg-bgColor-red2";
    return "bg-transparent";
  };

  //-------------------------- JSX ------------------------------
  return (
    <div className={`flex_center rounded-full px-3 py-2 ${getBgColor()}`}>
      <p className="text-sm text-white font-medium">{getStatusText()}</p>
    </div>
  );
}
