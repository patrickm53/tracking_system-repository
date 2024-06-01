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
      className={`bg-gray-700 hover:bg-gray-500 text-white font-bold py-2 px-4 border-b-4 border-gray-900 hover:border-gray-700 rounded ${margin}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default PaginationButton;
