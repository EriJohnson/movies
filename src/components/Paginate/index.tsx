import ReactPaginate, { ReactPaginateProps } from 'react-paginate';

import './styles.css';

const MOVIE_DB_API_MAX_PAGE = 500;

export function Paginate({ ...props }: ReactPaginateProps) {
  const pageCount =
    props.pageCount <= MOVIE_DB_API_MAX_PAGE ? props.pageCount : 500;

  return (
    <ReactPaginate
      containerClassName="pagination"
      pageClassName="page-item"
      activeClassName="active"
      breakLabel="..."
      pageRangeDisplayed={5}
      renderOnZeroPageCount={null}
      disableInitialCallback
      nextLabel=""
      previousLabel=""
      {...props}
      pageCount={pageCount}
    />
  );
}
