import React, { useContext } from 'react';
import './index.css';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/ContextProvider';
import { Card, ListGroup } from 'react-bootstrap';
function Person() {
  let { data, setData } = useContext(AuthContext);
  
  const handleCleanup = () => {
    setData({});
  };
  return (
    <div className="person">
      <Card className="Card">
        <Card.Body>
          <Card.Title>
            <h1>{data.name}</h1>
          </Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h4>Eye Color : {data.eye_color}</h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>Birth Year : {data.birth_year}</h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>Gender : {data.gender}</h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>Height : {data.height}</h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>Mass : {data.mass}</h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>Hair : {data.hair_color}</h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>Skin Color : {data.skin_color}</h4>
            </ListGroup.Item>
          </ListGroup>
          <Link to="/">
            {' '}
            <Button onClick={handleCleanup} variant="outline-danger">
              GO BACK
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Person;
