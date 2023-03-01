import React from "react";
import { Button, Table } from "react-bootstrap";

export const DTable = ({ list, handleOnDelete }) => {
  const total = list.reduce((acc, item) => {
    if (item.type === "income") {
      return acc + +item.amount;
    } else {
      return acc - +item.amount;
    }
  }, 0);
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
        {list.map((item, i) => (
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

            <td>
              <Button variant="danger" onClick={() => handleOnDelete(i)}>
                Delete
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
