import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import moment from "moment";

import { fetchData } from "./searchSlice";
import Spinner from "../../components/Spinner";
import { validateYear } from "../../utils/validateYear";

export const SearchForm = () => {
  const [query, setQuery] = useState("");
  const [yearStart, setYearStart] = useState("");
  const [yearEnd, setYearEnd] = useState("");
  const [queryErr, setQueryErr] = useState("");
  const [yearStartErr, setYearStartErr] = useState("");
  const [yearEndErr, setYearEndErr] = useState("");
  const [status, setStatus] = useState("idle");

  const dispatch = useDispatch();

  const onQueryChange = (e) => setQuery(e.target.value);
  const onYearStartChange = (e) => setYearStart(e.target.value);
  const onYearEndChange = (e) => setYearEnd(e.target.value);

  const validation = () => {
    let isQueryValid, isValidYearStart, isValidYearEnd;

    if (query === "") {
      isQueryValid = false;
      setQueryErr("You must insert a value!");
    } else {
      isQueryValid = true;
      setQueryErr("");
    }

    // these fields are optional
    if (yearStart) {
      isValidYearStart = validateYear(yearStart);
      !isValidYearStart && setYearStartErr("Type a valid year!");
    } else {
      isValidYearStart = true;
      setYearStartErr("");
    }

    if (yearEnd) {
      isValidYearEnd = validateYear(yearEnd);
      !isValidYearEnd && setYearEndErr("Type a valid year!");
    } else {
      isValidYearEnd = true;
      setYearEndErr("");
    }

    return (
      isQueryValid && isValidYearStart && isValidYearEnd && status === "idle"
    );
  };

  const onSearch = async () => {
    if (!validation()) return false;

    const yearStartParam = yearStart
      ? `&year_start=${moment(yearStart).year()}`
      : "";
    const yearEndParam = yearEnd ? `&year_end=${moment(yearEnd).year()}` : "";

    try {
      setStatus("pending");

      await dispatch(
        fetchData(
          `https://images-api.nasa.gov/search?description=${query}${yearStartParam}${yearEndParam}`
        )
      );
    } catch (err) {
      console.error(err);
    } finally {
      setStatus("idle");
    }
  };

  return (
    <>
      {status === "pending" && <Spinner />}

      <Form style={{ marginTop: "3em" }}>
        <Form.Group className="mb-3" controlId="searchQuery">
          <Form.Control
            type="email"
            placeholder="Type a keyword"
            onChange={onQueryChange}
            value={query}
          />
          <Form.Text className="err-msg">{queryErr}</Form.Text>
        </Form.Group>

        <Form.Group>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="yearStart">
                <Form.Label>From</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Date start"
                  onChange={onYearStartChange}
                  value={yearStart}
                />
                <Form.Text className="err-msg"> {yearStartErr} </Form.Text>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="yearEnd">
                <Form.Label>To</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Date end"
                  onChange={onYearEndChange}
                  value={yearEnd}
                />
                <Form.Text className="err-msg">{yearEndErr} </Form.Text>
              </Form.Group>
            </Col>
          </Row>
        </Form.Group>

        <Button
          variant="primary"
          type="button"
          onClick={onSearch}
          disabled={!query}
        >
          Submit
        </Button>
      </Form>
    </>
  );
};
