import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

import { CustomInput } from "../components/CustomInput";

import { Layout } from "../components/Layout";
import { toast } from "react-toastify";
import { randomStrGenerator } from "../utils.js";

//creating variables for making the form empty after submit
const initialState = {
  fName: "",
  LName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const Registration = () => {
  const [frm, setFrm] = useState({});

  // creating state for finding the error
  const [error, setError] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    if (name === "password") {
      setError("");
      value.length < 6 && setError("Password must be 6 characters long");

      !/[0-9]/.test(value) && setError("Number is required");
      !/[A-Z]/.test(value) && setError("Uppercase is required");
      !/[a-z]/.test(value) && setError("Lowercase is required");
    }

    setFrm({
      ...frm,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(frm);

    //using toastify for confirming password
    const { confirmPassword, ...rest } = frm;
    if (confirmPassword !== rest.password) {
      return toast.error("Password do not match");
    }
    //checking or reading if there are already account created
    const oldUsersStr = localStorage.getItem("users");
    const oldUsers = oldUsersStr ? JSON.parse(oldUsersStr) : [];

    localStorage.setItem(
      "users",
      JSON.stringify([...oldUsers, { ...rest, id: randomStrGenerator(6) }])
    );

    toast.success("Great News! Your account is created");

    setFrm(initialState);
  };

  const inputs = [
    {
      value: frm.fName,
      label: "First Name",
      name: "fName",

      required: true,
      placeholder: "miliii",
    },
    {
      value: frm.lName,
      label: "Last Name",
      name: "lName",

      required: true,
      placeholder: "sherpa",
    },
    {
      value: frm.email,
      label: "Email",
      name: "email",
      type: "email",
      required: true,
      placeholder: "smilan@gmail.com",
    },
    {
      value: frm.password,
      label: "Password",
      name: "password",
      type: "password",
      required: true,
      placeholder: "****",
    },
    {
      value: frm.confirmPassword,
      label: "Password",
      name: "confirmPassword",
      type: "password",
      required: true,
      placeholder: "****",
    },
  ];

  return (
    <Layout>
      <div className="w-50 m-auto">
        <Form
          onSubmit={handleOnSubmit}
          className=" mt-5 border p-3 py-5 rounded shadow-lg"
        >
          <h3>Join our system now!</h3>
          <hr />
          {inputs.map((item, i) => (
            <CustomInput key={i} {...item} onChange={handleOnChange} />
          ))}

          <Form.Group>
            <Form.Text>
              Must contain at least 6 characters(include min 1 upper case and 1
              lowewr case)
            </Form.Text>

            {/* using javascript to show the error  */}

            {error && (
              <ul>
                <li className="text-danger fw-bolder mt-3">{error}</li>
              </ul>
            )}
          </Form.Group>

          <div className="d-grid py-3">
            {/* disabeling the register button in some case  */}
            <Button disabled={error} variant="primary" type="submit">
              Register
            </Button>
          </div>

          <div className="text-end">
            Forget password? <a href="/password-reset">Reset </a> now
          </div>
        </Form>
      </div>
    </Layout>
  );
};
