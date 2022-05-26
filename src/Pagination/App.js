import React, { useState, useMemo } from 'react';
import Pagination from '../Pagination';
import data from './data/data.json';
import './style.scss';
const PageSize = 5;

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>YEAR</th>
            <th>COLOR</th>
            <th>PANTONE_VALUE</th>
          </tr>
        </thead>
        <tbody>
          {currentTableData.map(item => {
            return (
              <tr  style={{backgroundColor: item.color}}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.year}</td>
                <td>{item.color}</td>
                <td>{item.pantone_value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={data.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />
    </>
  );
}
