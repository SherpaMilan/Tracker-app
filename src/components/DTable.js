import { async } from "@firebase/util";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useCallback, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { db } from "../firebase/firebase-configuration";
import { getTransaction } from "../redux/transaction/transAction";

export const DTable = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { trans } = useSelector((state) => state.transaction);

  useEffect(() => {
    dispatch(getTransaction(userInfo.uid));
  }, [dispatch]);

  const total = trans.reduce((acc, item) => {
    if (item.type === "income") {
      return acc + +item.amount;
    } else {
      return acc - +item.amount;
    }
  }, 0);

  const handleOnDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteDoc(doc(db, "transactions", id));
        toast.success("Transaction has been deleted");

        dispatch(getTransaction(userInfo.uid));
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  console.log(total);
  return (
    <Table striped bordered hover className="mt-5">
      <thead>
        <tr>
          <th>#</th>
          <th>Date</th>
          <th>Title</th>
          <th>Income</th>
          <th>Expenses</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {trans.map((item, i) => (
          <tr key={i}>
            <td>{i + 1}</td>
            <td>{item.date}</td>
            <td>{item.title}</td>
            <td className="text-success fw-bolder">
              {item.type === "income" && item.amount}
            </td>
            <td className="text-danger fw-bolder">
              {item.type === "expenses" && "-" + item.amount}
            </td>

            <td className="text-center">
              <Button variant="danger" onClick={() => handleOnDelete(item.id)}>
                <i class="fa-solid fa-trash"></i>
              </Button>
            </td>
          </tr>
        ))}

        <tr className="fw-bolder fs-3">
          <td colSpan={5}>Total</td>
          <td>{total}</td>
        </tr>
      </tbody>
    </Table>
  );
};
