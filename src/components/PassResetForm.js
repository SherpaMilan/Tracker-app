import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { CustomInput } from "./CustomInput";

export const PassResetForm = () => {
  //usestate for adding objects
  const [formDt, setFormDt] = useState({});
  // to show error
  const [error, setError] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    if (name === "password") {
      setError("");
      value.length < 6 && setError("Must contain 6 characters");

      !/[0-9]/.test(value) && setError("At least one number is required.");

      !/[a-z]/.test(value) && setError("At least one lowerCase is required.");

      !/[A-Z]/.test(value) && setError("At least one upperCase is required.");
    }

    setFormDt({
      ...formDt,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(formDt);

    const { confirmPassword, ...rest } = formDt;
    if (confirmPassword !== rest.password) {
      return toast.error("Password do not match");
    }

    //get the data from the local storage

    const userStr = localStorage.getItem("users");
    if (userStr) {
      // parse the JSON data to Object
      let users = JSON.parse(userStr);
      if (users.length) {
        // check if there is any user who has the same email
        const userExist = users.find((item) => item.email === rest.email);
        if (userExist?.email) {
          // loop through the  array and update the password, it should create the new array

          const temUsers = users.map((item) => {
            if (item.email === rest.email) {
              item.password = rest.password;
            }
            return item;
          });
          // store that array to local storage and show the message saying you may login now.
          localStorage.setItem("users", JSON.stringify(temUsers));
          toast.success("Passord reset Successful!");
          return;
        }
      }
    }

    toast.error("Users not found or invalid request");
  };

  return (
    <div className="border  p-2 rounded shadow-lg">
      <h3 className="text-center">Reset password here</h3>

      <hr />
      <Form onSubmit={handleOnSubmit}>
        <CustomInput
          onChange={handleOnChange}
          label="Email *"
          name="email"
          type="email"
          placeholder="smilan@gmail.com"
          required={true}
        />
        <CustomInput
          onChange={handleOnChange}
          label="New Password *"
          name="password"
          type="password"
          placeholder="*******"
          required={true}
        />
        <CustomInput
          onChange={handleOnChange}
          label="Confirm Password *"
          name="confirmPassword"
          type="password"
          placeholder="*******"
          required={true}
        />
        <Form.Text>
          Must contain at least 6 characters, 1 upperCase and 1 lowerCase!
          {error && (
            <ul>
              <li className="text-danger fw-bolder ">{error}</li>
            </ul>
          )}
        </Form.Text>

        <div className="d-grid py=3">
          <Button type="submit" variant="outline-danger" disabled={error}>
            Reset Password
          </Button>
        </div>
      </Form>
    </div>
  );
};
