import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { db } from "../firebase/firebase-configuration";
import { getTransaction } from "../redux/transaction/transAction";

const initialState = {
  type: "",
  title: "",
  amount: "",
  date: "",
};
export const MyForm = ({ addTransaction }) => {
  const dispatch = useDispatch();
  const [formDt, setFormDt] = useState(initialState);

  const { userInfo } = useSelector((state) => state.user);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFormDt({
      ...formDt,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // TODO
    // 1. send datat to fire store
    const obj = { ...formDt, userId: userInfo.uid, createAt: Date.now() };

    // dispatch(postTransaction(obj));
    const docRef = await addDoc(collection(db, "transactions"), obj);

    if (docRef?.id) {
      setFormDt(initialState);
      dispatch(getTransaction(userInfo.uid));
      // 2. if success on create transact, fetch data from store and mount on the redux
      return toast.success("The transaction has been added");
    }
  };

  return (
    <Form onSubmit={handleOnSubmit} className="border p-3 rounded shadow-lg">
      <Row className="gap-2">
        <Col md={2}>
          <Form.Select name="type" onChange={handleOnChange} required>
            <option value="">Select </option>
            <option value="income" selected={formDt.type === "income"}>
              Income
            </option>
            <option value="expenses" selected={formDt.type === "expenses"}>
              Expenses
            </option>
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
            placeholder="amount"
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
