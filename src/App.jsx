import "./App.css";
import { ToastContainer, toast,Bounce} from "react-toastify";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DefaultLayout from "./components/layout/DefaultLayout";
import Dashboard from "./pages/Dashboard";
import Transaction from "./pages/Transaction";
import Auth from "./auth/Auth.jsx";
import { useEffect } from "react";
import { useUser } from "./context/UserContext.jsx";
import { autoLogin } from "./utils/users.js";
import Contact from "./pages/Contact.jsx";
import Home from "./pages/Home.jsx";

function App() {
  const { user, setUser } = useUser();
  useEffect(() => {
    !user?._id && updateUser();
  }, [user?._id]);

  const updateUser = async () => {
    const user = await autoLogin();
    setUser(user);
  };
  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="login" element={<Login />}></Route>
          <Route path="signup" element={<Signup />}></Route>
          <Route path="contact" element={<Contact />}></Route>
          <Route index element={<Home />}></Route>
          <Route
            path="dashboard"
            element={
              <Auth>
                <Dashboard />
              </Auth>
            }
          ></Route>
          <Route
            path="transaction"
            element={
              <Auth>
                <Transaction />
              </Auth>
            }
          ></Route>
        </Route>
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
}

export default App;
