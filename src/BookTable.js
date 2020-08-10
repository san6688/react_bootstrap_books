import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import BookList from './BookList';
import BookPagination from './BookPagination';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookTable = (props) => {
  const {pageNo} = useParams();
  const [ bookList, setBookList ] = useState([]);
  const [ isFetching, setIsFetching ] = useState(false);
  const [ totalCount, setTotalCount ] = useState(0);

  const getBooks = async (pageNo) => {
    setIsFetching(true);
    const result = await axios.post('http://nyx.vima.ekt.gr:3000/api/books', {page: pageNo});
    setIsFetching(false);
    if(result.data){
      setTotalCount(result.data.count);
      setBookList(result.data.books);
    }
  };

  useEffect(() => { getBooks(pageNo);}, [pageNo]);

  return (
    <Container style={{ marginTop: 50,}}>    
          <Row>
            <Col>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <BookPagination totalItems={totalCount} currPageNo={pageNo} pageSize={20} />
            </div>
            </Col>
          </Row>     
          <Row>
            <Col>
            {
              isFetching ? <div style={{display: 'flex', justifyContent: 'center', margin: 50}}><Spinner animation="border" variant="primary" /></div> : <BookList items={bookList}/>
            }            
            </Col>
          </Row>       
          { !isFetching && <Row>
              <Col>
              <div style={{display: 'flex', justifyContent: 'center'}}>
                <BookPagination totalItems={totalCount} currPageNo={pageNo} pageSize={20} />
              </div>
              </Col>
            </Row>
          }   
        </Container>
  )
}

export default BookTable;