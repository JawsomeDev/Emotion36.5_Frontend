import React from 'react';

function PageComponent({ serverData, movePage }) {
  if (!serverData || !Array.isArray(serverData.pageNumList)) {
    return null; // 서버 데이터나 페이지 목록이 없으면 아무 것도 렌더링 안 함
  }

  return (
    <div className='m-6 flex justify-center'>
      {serverData.prev && (
        <div
          className='m-2 p-2 w-16 text-center font-bold text-gray-700 hover:text-gray-900 cursor-pointer'
          onClick={() => movePage({ page: serverData.prevPage })}
        >
          Prev
        </div>
      )}

      {serverData.pageNumList.map((pageNum) => (
        <div
          key={pageNum}
          className={`m-2 p-2 w-12 text-center rounded shadow text-sm font-medium cursor-pointer
            ${
              serverData.currentPage === pageNum
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
            }`}
          onClick={() => movePage({ page: pageNum })}
        >
          {pageNum}
        </div>
      ))}

      {serverData.next && (
        <div
          className='m-2 p-2 w-16 text-center font-bold text-gray-700 hover:text-gray-900 cursor-pointer'
          onClick={() => movePage({ page: serverData.nextPage })}
        >
          Next
        </div>
      )}
    </div>
  );
}

export default PageComponent;
