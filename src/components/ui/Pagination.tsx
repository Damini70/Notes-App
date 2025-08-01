import React, { useEffect, useState } from 'react';
import { users } from '../../lib/paginationData';

export default function Pagination() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const noOfPage = Math.ceil(users.length / itemsPerPage);

  function paginateData(page: number) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return users.slice(startIndex, endIndex);
  }

  useEffect(() => {
    setData(paginateData(currentPage));
  }, [currentPage]);

  return (
    <div className="m-5 p-5">
      <div>
        {data.length > 0 ? (
          data.map((item: any) => (
            <div key={item.id}>
              <h2>{item.name}</h2>
              <p>{item.email}</p>
            </div>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>

      <nav className="flex justify-end items-center mt-4 space-x-2" aria-label="Pagination">
        <button
          className="p-2 bg-amber-400 disabled:opacity-50"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {Array.from({ length: noOfPage }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setCurrentPage(i + 1)}
            aria-current={currentPage === i + 1 ? 'page' : undefined}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="p-2 bg-amber-400 disabled:opacity-50"
          onClick={() => setCurrentPage((p) => Math.min(noOfPage, p + 1))}
          disabled={currentPage === noOfPage}
        >
          Next
        </button>
      </nav>
    </div>
  );
}
