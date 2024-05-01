import React from 'react'
import { useSearchParams } from 'react-router-dom';

const Pagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = +(searchParams.get("page") || 1);
  const changePaginationHandler = (page: number) => {
    setSearchParams(`?page=${page}`);
  };
  const isTherePreviousPages = currentPage === 1;
  return (
    <div className="flex gap-4 mt-4">
    <button
      disabled={isTherePreviousPages}
      className="bg-blue-500 text-white p-2 disabled:bg-gray-500 disabled:cursor-not-allowed rounded shadow-sm cursor-pointer"
      onClick={changePaginationHandler.bind(
        null,
        currentPage - 1 
      )}
    >
      Previous
    </button>
    <button
      className="bg-blue-500 text-white p-2 rounded shadow-sm cursor-pointer"
      onClick={changePaginationHandler.bind(null, currentPage + 1)}
    >
      Next
    </button>
  </div>
  )
}

export default Pagination