interface iTrialStatusBadgeProps {
  approvedAt: string | null;
  publishedAt: string | null;
}

//----------------------------- main function -------------------------------
export default function TrialStatusBadge({
  approvedAt,
  publishedAt,
}: iTrialStatusBadgeProps) {
  //--- getStatusText function ---
  const getStatusText = () => {
    if (!approvedAt && !publishedAt) return "";
    if (publishedAt) return "Published";
    if (approvedAt) return "Approved";
  };

  const getBgColor = () => {
    const status = getStatusText();
    if (status === "Published") return "bg-bgColor-green";
    if (status === "Approved") return "bg-bgColor-yellow";
    return "bg-transparent";
  };

  //-------------------------- JSX ------------------------------
  return (
    <div className={`flex_center rounded-full px-3 py-2 ${getBgColor()}`}>
      <p className="text-sm text-white font-medium">{getStatusText()}</p>
    </div>
  );
}
