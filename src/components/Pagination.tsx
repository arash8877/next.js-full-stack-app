import { useState } from "react";
import { Pagination, useMediaQuery } from "@mui/material";

interface CustomPaginationProps {
  allTrials: number;
  trialsPerPage: number;
  currentPage: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}
//------------------------------ main component --------------------------------
const CustomPagination = ({
  allTrials,
  trialsPerPage,
  currentPage,
  onPageChange,
}: CustomPaginationProps) => {
  const totalPages = Math.ceil(allTrials / trialsPerPage);
  const isMobile = useMediaQuery("(max-width:944px)");

  const [nextItems, setNext] = useState(trialsPerPage);
  const handleShowMore = () => {
    setNext(nextItems + trialsPerPage);
    onPageChange(
      {} as React.ChangeEvent<unknown>,
      Math.ceil(nextItems / trialsPerPage) + 1
    );
  };

  //-------------------------------- JSX --------------------------------
  return (
    <div className="pagination-container flex justify-center mt-4">
      {isMobile ? (
        <button
          onClick={handleShowMore}
          disabled={currentPage >= totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
        >
          Show More
        </button>
      ) : (
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={onPageChange}
          siblingCount={1}
          boundaryCount={1}
          size="medium"
          shape="rounded"
          sx={{
            "& .MuiPagination-ul": {
              flexWrap: "nowrap",
            },
          }}
        />
      )}
    </div>
  );
};

export default CustomPagination;
