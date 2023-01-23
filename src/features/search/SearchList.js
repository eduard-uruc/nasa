import React from "react";
import { useSelector } from "react-redux";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";

import { isEmpty } from "../../utils/isObjEmpty";

export const SearchList = () => {
  const collection = useSelector((state) => state.collection);

  if (isEmpty(collection.data)) return;

  return (
    <ListGroup className="search-list">
      {collection.data.collection.items.map((item, i) => {
        return (
          <Link
            to={`/show/${item.data[0].nasa_id}`}
            className="link-router"
            key={item.data[0].nasa_id}
          >
            <Row>
              <Col>
                <ListGroup.Item className="search-list-item">
                  {item.links && (
                    <Image
                      className="search-thumbnail"
                      src={item.links[0].href}
                      thumbnail={true}
                    />
                  )}
                </ListGroup.Item>
              </Col>
              <Col>
                <ListGroup.Item className="search-list-item">
                  {item.data[0].title}
                </ListGroup.Item>
              </Col>
              <Col>
                <ListGroup.Item className="search-list-item">
                  by {item.data[0].photographer}
                </ListGroup.Item>
              </Col>
              <Col>
                <ListGroup.Item className="search-list-item">
                  {item.data[0].center}
                </ListGroup.Item>
              </Col>
            </Row>
          </Link>
        );
      })}
    </ListGroup>
  );
};
