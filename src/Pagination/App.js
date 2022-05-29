import React, { useState, useMemo } from "react";
import Pagination from "../Pagination";
import "./style.scss";

export default function App(props) {
  console.log(props.data);
  // const PageSize = props.data.per_page; // Reading PageSize from the site.
  const PageSize = 5; // to confirm that the pagination works as it should
  const [currentPage, setCurrentPage] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return props.data.data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  let searchedIndex = -1;
  let displayData = [];

  if (currentIndex >= 0) {
    for (let data of currentTableData) {
      if (data.id == currentIndex) {
        displayData.push(data);
      }
    }
  } else {
    displayData = [...currentTableData];
  }

  return (
    <>
      <input
        type="number"
        min="1"
        onChange={(e) => {
          searchedIndex = e.target.value;
        }}
      ></input>
      <button
        type="button"
        onClick={() => {
          setCurrentIndex(searchedIndex);
        }}
      >
        Search
      </button>
      <button
        type="button"
        onClick={() => {
          setCurrentIndex(-1);
        }}
      >
        Show All
      </button>
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
          {displayData.map((item) => {
            return (
              <tr style={{ backgroundColor: item.color }}>
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
        totalCount={props.data.data.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
}
