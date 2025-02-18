import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CustomInput from "./CustomInput";
import { toast, Bounce } from "react-toastify";
import { postNewUser } from "../../helpers/axiosHelper";
import useForm from "../hooks/useForm";
import { Link } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const SignUpForm = () => {
  const { form, setForm, handleOnChange } = useForm(initialState);

  const fields = [
    {
      label: "Name",
      placeholder: "ishwor karki",
      required: true,
      type: "text",
      name: "name",
      value: form.name,
    },
    {
      label: "Email",
      placeholder: "ishwor@email.com",
      required: true,
      type: "email",
      name: "email",
      value: form.email,
    },
    {
      label: "Password",
      placeholder: "******",
      required: true,
      type: "password",
      name: "password",
      value: form.password,
    },
    {
      label: "Confirm Password",
      placeholder: "******",
      required: true,
      type: "password",
      name: "confirmPassword",
      value: form.confirmPassword,
    }
  ];

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const { confirmPassword, ...rest } = form;
    if (confirmPassword != rest.password) {
      return toast.error("password do not match");
    }
    const pending = postNewUser(rest);
    toast.promise(pending,{
      pending:"please wait"
    })
    const { status, message } = await pending;

    toast[status](message);

    status === "success" && setForm(initialState);
  };
  return (
    <div className="border rounded p-4 m-2">
      <h4 className="mb-5">Sign up Quickly! </h4>
      <Form onSubmit={handleOnSubmit}>
        {fields.map((input) => (
          <CustomInput key={input.name} {...input} onChange={handleOnChange} />
        ))}
        <Form.Check label="suscribe to us" />
        <div className="d-grid mt-2">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
        <div className="">
        <p>Have an account ?</p>
        <Link to={"/login"}>Logiin Here</Link>
        </div>
      </Form>
    </div>
  );
};

export default SignUpForm;
