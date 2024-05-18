import React from "react";

const PaginationButton = ({
  currentPage,
  totalPages,
  title = "Daha Fazla Göster",
  onClick,
  margin = "mx-auto mt-10 mb-0",
}) => {
  if (currentPage >= totalPages) return null;

  return (
    <button
      className={`bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded ${margin}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default PaginationButton;
