import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CustomInput from "./CustomInput";
import { toast, Bounce } from "react-toastify";
import { postNewUser } from "../../helpers/axiosHelper";
import useForm from "../hooks/useForm";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const SignUpForm = () => {
  const fields = [
    {
      label: "Name",
      placeholder: "ishwor karki",
      required: true,
      type: "text",
      name: "name",
    },
    {
      label: "Email",
      placeholder: "ishwor@email.com",
      required: true,
      type: "email",
      name: "email",
    },
    {
      label: "Password",
      placeholder: "******",
      required: true,
      type: "password",
      name: "password",
    },
    {
      label: "Confirm Password",
      placeholder: "******",
      required: true,
      type: "password",
      name: "confirmPassword",
    },
  ];
  const { form, setForm, handleOnChange } = useForm(initialState);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const { confirmPassword, ...rest } = form;
    if (confirmPassword != rest.password) {
      return toast.error("password do not match");
    }

    const { status, message } = await postNewUser(rest);

    toast[status](message);

    status === "success" && setForm(initialState);
  };
  return (
    <div className="border rounded p-4">
      <h4 className="mb-5">Sign up Quickly! </h4>
      <Form onSubmit={handleOnSubmit}>
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

export default SignUpForm;
