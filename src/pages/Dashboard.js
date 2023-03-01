import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { DTable } from "../components/DTable";
import { Layout } from "../components/Layout";
import { MyForm } from "../components/MyForm";

export const Dashboard = () => {
  const [list, setList] = useState([]);

  const addTransaction = (data) => {
    console.log(data);
    setList([...list, data]);
  };

  const handleOnDelete = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      const tempArg = list.filter((item, i) => i !== id);
      setList(tempArg);
    }
  };
  return (
    <Layout>
      <Container>
        <Row>
          <Col>
            <h2 className="text-center mt-5 title">Finance Tracker App</h2>
          </Col>
        </Row>
        <hr />

        {/* form */}
        <MyForm addTransaction={addTransaction} />
        {/* table */}

        <DTable list={list} handleOnDelete={handleOnDelete} />
      </Container>
    </Layout>
  );
};
