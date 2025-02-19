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

    const { confirmPassword, password, ...rest } = form;

    // Ensure password and confirmPassword are included
    if (!password || !confirmPassword) {
      return toast.error("Password and confirm password are required");
    }

    if (confirmPassword !== password) {
      return toast.error("Passwords do not match");
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|-]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return toast.error("Password must be strong");
    }

    const userData = {
      name: form.name,
      email: form.email,
      password: form.password, // Ensure password is included
      confirmPassword: form.confirmPassword, // Confirm password if needed
    };

    const pending = postNewUser(userData); // Submit with all fields
    toast.promise(pending, { pending: "Please wait..." });

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
        <div className="d-flex justify-content-end">
          <Form.Check label="suscribe to us" />
        </div>
        <div className="d-grid mt-2">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
        <div className="text-center pt-3">
          Have an account?
          <Link to={"/login"}>
            <b className="mx-3">Login Here</b>
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default SignUpForm;
