import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CustomInput from "./CustomInput";
import { useEffect, useState } from "react";
import { toast, Bounce } from "react-toastify";
import { loginUser, postNewUser } from "../../helpers/axiosHelper";
import { useUser } from "../context/UserContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
const initialState = {
  email: "",
  password: "",
};
const SignInForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [form, setForm] = useState(initialState);

  const goTO = location?.state?.from?.pathname || "/transaction";

  useEffect(() => {
    user?._id && navigate(goTO);
  }, [user?._id, navigate]);

  const fields = [
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
  ];

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const pendingRequest = loginUser(form);

    toast.promise(pendingRequest, {
      pending: "please wait ....",
    });
    const { status, message, user, accessJWT } = await pendingRequest;

    toast[status](message);
    setUser(user);
    localStorage.setItem("accessJWT", accessJWT);
  };
  return (
    <div className="border rounded p-4">
      <h4 className="mb-5">Sign In Quickly! </h4>
      <Form onSubmit={handleOnSubmit}>
        {fields.map((input) => (
          <CustomInput key={input.name} {...input} onChange={handleOnChange} />
        ))}
        <div className="d-grid">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
        <div className="text-center pt-3">
          Dont have an account ? 
          <Link to="/signup">
          Signup here?</Link>
        </div>
      </Form>
    </div>
  );
};

export default SignInForm;
