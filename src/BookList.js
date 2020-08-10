import React from 'react';
import { Table } from 'react-bootstrap';

const BookList = (props) => {
  const { items } = props;
  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Author</th>
          <th>Year</th>
          <th>City</th>
          <th>Country</th>
        </tr>
      </thead>
      <tbody>
        {
          items.map(item => <tr style={{ fontSize: 15}}>
            <td>{item['id']}</td>            
            <td>{item['book_title']}</td>
            <td>{item['book_author'].join()}</td>
            <td>{item['book_publication_year']}</td>
            <td>{item['book_publication_city']}</td>
            <td>{item['book_publication_country']}</td>
          </tr>)
        }
      </tbody>
      </Table>
  );
}

export default BookList;