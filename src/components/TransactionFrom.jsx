import React, { useState } from "react";
import useForm from "../hooks/useForm";
import { Button, Form, Toast } from "react-bootstrap";
import CustomInput from "./CustomInput";
import { postNewTransaction } from "../../helpers/axiosHelper.js";
import { toast } from "react-toastify";
import { useUser } from "../context/UserContext.jsx";
const initialState = {
  type: "",
  amount: "",
  date: "",
  description: "",
};
const TransactionFrom = () => {
  const { form, setForm, handleOnChange } = useForm(initialState);
  const { getTransactions, toogleModal } = useUser();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

   
    const pending = postNewTransaction(form);
    toast.promise(pending, {
      pending: "please wait",
    });
    const { status, message } = await pending;
    toast[status](message);

    if (status === "success") {
      setForm(initialState);
      getTransactions();
      toogleModal(false);
    }
  };

  const fields = [
    {
      label: "Description",
      placeholder: "Salary",
      required: true,
      type: "text",
      name: "description",
      value: form.description,
    },
    {
      label: "Amount",
      placeholder: "44",
      required: true,
      type: "number",
      name: "amount",
      value: form.amount,
      min:1
    },
    {
      label: "Transaction Date",

      required: true,
      type: "date",
      name: "date",
      value: form.date,
    },
  ];
  return (
    <div className="border rounded p-4">
      <h4 className="mb-5">Add your transaction!</h4>
      <Form onSubmit={handleOnSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Transaction type</Form.Label>
          <Form.Select name="type" onChange={handleOnChange} required>
            <option value="">-- select --</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </Form.Select>
        </Form.Group>
        {fields.map((input) => (
          <CustomInput key={input.name} {...input} onChange={handleOnChange} />
        ))}

        <div className="d-grid">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default TransactionFrom;
