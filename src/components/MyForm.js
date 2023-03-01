import { useState } from "react";
import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const initialState = {
  type: "",
  title: "",
  amount: "",
  date: "",
};
export const MyForm = ({ addTransaction }) => {
  const [formDt, setFormDt] = useState(initialState);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFormDt({
      ...formDt,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    addTransaction(formDt);
    setFormDt(initialState);
  };

  console.log(formDt);

  return (
    <Form onSubmit={handleOnSubmit} className="border p-3 rounded shadow-lg">
      <Row className="gap-2">
        <Col md={2}>
          <Form.Select
            name="type"
            onChange={handleOnChange}
            required
            defaultValue={formDt.type}
          >
            <option value="">Type... </option>
            <option value="income">Income</option>
            <option value="expenses">Expenses</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Control
            name="title"
            placeholder="Shopping"
            onChange={handleOnChange}
            required
            value={formDt.title}
          />
        </Col>
        <Col md={2}>
          <Form.Control
            name="amount"
            value={formDt.amount}
            type="number"
            placeholder="233"
            onChange={handleOnChange}
            required
          />
        </Col>
        <Col md={2}>
          <Form.Control
            type="date"
            name="date"
            value={formDt.date}
            onChange={handleOnChange}
            required
          />
        </Col>
        <Col md={2}>
          <Button type="submit">
            <i className="fa-solid fa-plus"></i> Add
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
