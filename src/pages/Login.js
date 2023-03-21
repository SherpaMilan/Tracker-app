import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CustomInput } from "../components/CustomInput";
import { setUser } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "../components/Layout";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-configuration";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [fromDt, setFormDt] = useState({});
  const { userInfo } = useSelector((state) => state.user);

  // to remain in the samepage after refreshed if your are once logged in
  onAuthStateChanged(auth, (user) => {
    user && dispatch(setUser(user));
  });

  useEffect(() => {
    userInfo?.uid && navigate("/dashboard");
  }, [userInfo]);

  const inputs = [
    {
      label: "Email",
      name: "email",
      type: "email",
      required: true,
      placeholder: "sam@email.com",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      required: true,
      placeholder: "****",
    },
  ];

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFormDt({
      ...fromDt,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const responsePending = signInWithEmailAndPassword(
        auth,
        fromDt.email,
        fromDt.password
      );

      toast.promise(responsePending, {
        pending: "Please wait...",
      });

      const { user } = await responsePending;

      if (user?.uid) {
        // sessionStorage.setItem("accessToken", user.accessToken);
        // localStorage.setItem("refreshToken", user.refreshToken);
        const userobj = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        };

        setTimeout(() => {
          dispatch(setUser(userobj));
        }, 2000);
        return toast.success("Logged in successfully, Redirecting now");
      }
    } catch (error) {
      let msg = error.message;
      if (error.message.includes("(auth/wrong-password)")) {
        msg = "Invalid login details";
      }
      toast.error(msg);
    }
  };

  return (
    <Layout user={userInfo}>
      <div className="w-50 m-auto">
        <Form
          onSubmit={handleOnSubmit}
          className=" mt-5 border p-3 py-5 rounded shadow-lg"
        >
          <h3>Welcome back!</h3>
          <hr />
          {inputs.map((item, i) => (
            <CustomInput key={i} {...item} onChange={handleOnChange} />
          ))}

          <div className="d-grid mb-3">
            <Button variant="primary" type="submit">
              Login
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
