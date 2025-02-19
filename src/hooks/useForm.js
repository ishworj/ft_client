import { useState } from "react";
const handleOnChange = (e, form, setForm) => {
  const { name, value } = e.target;

   if (name === "amount" && Number(value) < 1) {
     setForm({
       ...form,
       [name]: "",
     });
     return;
   }

  if (name === "date" && new Date(value) < new Date()) {
    setForm({
      ...form,
      [name]: new Date().toLocaleDateString("en-CA"),
    });
    return;
  }

  setForm({
    ...form,
    [name]: value,
  });
};

export const useForm = (initialState) => {
  const [form, setForm] = useState(initialState);

  return {
    form,
    setForm,
    handleOnChange: (e) => handleOnChange(e, form, setForm),
  };
};

export default useForm;
