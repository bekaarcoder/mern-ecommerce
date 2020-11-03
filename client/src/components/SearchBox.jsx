import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <Form onSubmit={submitHandler} className="flex-grow-1 mx-auto">
      <InputGroup>
        <Form.Control
          placeholder="Search Products"
          aria-label="Search Products"
          type="text"
          onChange={(e) => setKeyword(e.target.value)}
          name="q"
        />
        <InputGroup.Append>
          <Button variant="outline-success" type="submit">
            <i className="fas fa-search"></i>
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  );
};

export default SearchBox;
