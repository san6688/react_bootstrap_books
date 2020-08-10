import React from 'react';
import './App.scss';
import { Container, Row, Col } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,  
  Redirect
} from "react-router-dom";
import BookTable from './BookTable';

function App() {
 
  return (
    <Container>
    <Row>
      <Col style={{ height: '100vh'}}>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                  return (                 
                    <Redirect to="/books/1" /> 
                  )
              }}
            />
            <Route exact path="/books/:pageNo" component={BookTable} />
          </Switch>
          </Router>              
        </div>
      </Col>
    </Row>
  </Container>
  );
}

export default App;
