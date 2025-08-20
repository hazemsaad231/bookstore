import React from "react";

interface PaginationProps {
  current: any;
  setCurrent: (page: number) => void;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ current, setCurrent, totalPages }) => {
  return (
    <div className="">
      <button
        onClick={() => setCurrent(current > 1 ? current - 1 : current)}
        className="px-3 py-2 mx-1 text-white bg-primary rounded-full"
        disabled={current === 1}
      >
        Prev
      </button>

      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => setCurrent(index + 1)}
          className={`px-3 py-2 mx-1 rounded-full ${
            current === index + 1 ? "bg-primary text-white" : "bg-gray-300"
          }`}
        >
          {index +1}
        </button>
      ))}

      <button
        onClick={() => setCurrent(current < totalPages ? current + 1 : current)}
        className="px-3 py-2 mx-1 text-white bg-primary rounded-full"
        disabled={current === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default React.memo(Pagination)
