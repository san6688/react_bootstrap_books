import React from 'react';
import { Pagination } from 'react-bootstrap';
import { withRouter } from "react-router";

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
}

const fetchPageNumbers = (totalPages, currentPage, pageNeighbours) => {

  const totalNumbers = (pageNeighbours * 2) + 3;
  const totalBlocks = totalNumbers + 2;

  if (totalPages > totalBlocks) {
    
    const startPage = Math.max(2, currentPage - pageNeighbours);
    const endPage = Math.min(totalPages - 1, (currentPage + pageNeighbours));
    
    let pages = range(startPage, endPage);

    const hasLeft = startPage > 2;
    const hasRight = (totalPages - endPage) > 1;
    const spillOffset = totalNumbers - (pages.length + 1);
    

    switch (true) {
      
      case (hasLeft && !hasRight): {
        const extraPages = range(startPage - spillOffset, startPage - 1);
        pages = [LEFT_PAGE, ...extraPages, ...pages];
        break;
      }
      
      case (!hasLeft && hasRight): {
        const extraPages = range(endPage + 1, endPage + spillOffset);
        pages = [...pages, ...extraPages, RIGHT_PAGE];
        break;
      }
      
      case (hasLeft && hasRight):
      default: {
        pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
        break;
      }
    }

    return [1, ...pages, totalPages];

  }

  return range(1, totalPages);

}

const BookPagination = (props) => {
  const { totalItems, pageSize, currPageNo, history } = props;
  const totalPages = totalItems === 0 ? 0 : Math.ceil(totalItems/pageSize);
  let items = [];    
  let pages = fetchPageNumbers(totalPages, Number(currPageNo), 3);
  for(let i = 0 ; i < pages.length; i++){
    if(pages[i] === 'LEFT' || pages[i] === 'RIGHT'){
      items.push(<Pagination.Ellipsis />);
    } else {
      const handleClick = () => history.push(`/books/${pages[i]}`);
      items.push(
        <Pagination.Item key={pages[i]} active={pages[i] === Number(currPageNo)} onClick={handleClick}>
          {pages[i]}
        </Pagination.Item>,
      );
    }
  }
  
  return (
    <Pagination>
      {items}
    </Pagination>
  );
}

export default withRouter(BookPagination);