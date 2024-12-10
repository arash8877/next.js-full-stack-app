interface iTrialStatusBadgeProps {
  approvedAt: string;
  publishedAt: string;
}

//----------------------------- main function -------------------------------
export default function TrialStatusBadge({
  approvedAt,
  publishedAt,
}: iTrialStatusBadgeProps) {
  //--- getStatusText function ---
  const getStatusText = () => {
    if (approvedAt === "0001-01-01T00:00:00"  && publishedAt === "0001-01-01T00:00:00") return "";
    if (publishedAt) return "Published";
    if (approvedAt) return "Approved";
  };

  const getBgColor = () => {
    const status = getStatusText();
    if (status === "Published") return "bg-bgColor-green2";
    if (status === "Approved") return "bg-bgColor-red2";
    return "bg-transparent";
  };

  //-------------------------- JSX ------------------------------
  return (
    <div className={`flex_center rounded-full px-3 py-2 ${getBgColor()}`}>
      <p className="text-sm text-white font-medium">{getStatusText()}</p>
    </div>
  );
}
