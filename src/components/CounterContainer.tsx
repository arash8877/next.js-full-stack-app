//--------------- main function --------------------------
export default function CounterMyTrials({
    counts,
    style,
  }: {
    counts: number;
    style: string;
  }) {
  
    //-------------------- return ----------------------------
    return (
      <div
        className={`flex_center bg-white border rounded-[44px] px-3 absolute  text-primary-700 border-primary-700 ${style}`}
      >
        <span>{counts}</span>
      </div>
    );
  }
  