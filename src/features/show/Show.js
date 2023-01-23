import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import moment from "moment";

import { fetchData } from "./showSlice";
import { isEmpty } from "../../utils/isObjEmpty";
import { Title } from "../../components/Title";

export const Show = () => {
  const collection = useSelector((state) => state.searchedItem);

  const { nasa_id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchData(`https://images-api.nasa.gov/search?nasa_id=${nasa_id}`)
    );
  }, [nasa_id, dispatch]);

  if (isEmpty(collection.data)) return;

  return (
    <section className="page-section">
      <Title text="Show page" />
      <ListGroup>
        <ListGroup.Item active>
          {collection.data.collection.items[0].data[0].title}
        </ListGroup.Item>
        <ListGroup.Item>
          <b>Location:</b> {collection.data.collection.items[0].data[0].center}
        </ListGroup.Item>
        <ListGroup.Item>
          <b>Photographer:</b>{" "}
          {collection.data.collection.items[0].data[0].photographer}
        </ListGroup.Item>
        <ListGroup.Item>
          <b>Description:</b>{" "}
          {collection.data.collection.items[0].data[0].description}
        </ListGroup.Item>
        <ListGroup.Item>
          <b>Keywords:</b>{" "}
          {collection.data.collection.items[0].data[0].keywords.toString()}
        </ListGroup.Item>
        <ListGroup.Item>
          <b>Date:</b>{" "}
          {moment(
            collection.data.collection.items[0].data[0].date_created
          ).format("LL")}
        </ListGroup.Item>
        <ListGroup.Item>
          {collection.data.collection.items[0].links.map((img, i) => (
            <Image src={img.href} width="200px" height="100px" key={i} />
          ))}
        </ListGroup.Item>
        <ListGroup.Item>
          <Link to="/">Go back</Link>
        </ListGroup.Item>
      </ListGroup>
    </section>
  );
};
