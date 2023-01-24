import ReactPaginate from "react-paginate";
import "./Pagination.css";

const Pagination = ({ pageCount, onPageChange }) => {
  return (
    <>
      <div id="react-paginate" className="reactPaginate">
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={10}
          onPageChange={onPageChange}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
    </>
  );
};

export default Pagination;