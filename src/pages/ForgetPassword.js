import React from "react";
import { Layout } from "../components/Layout";
import { PassResetForm } from "../components/PassResetForm";

export const ForgetPassword = () => {
  return (
    <Layout>
      <div className="m-auto mt-3" style={{ width: "400px" }}>
        <PassResetForm />
      </div>
    </Layout>
  );
};
