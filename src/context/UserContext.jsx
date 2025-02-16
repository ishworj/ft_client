import { createContext, useContext, useState } from "react";
import { fetchTransactions } from "../../helpers/axiosHelper";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [transactions, setTransactions] = useState([]);

  const [show, setShow] = useState(false);
  const toogleModal = (value) => setShow(value);

  const getTransactions = async () => {
    const { status, transactionData } = await fetchTransactions();
    status === "success" && setTransactions(transactionData);
  };
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        getTransactions,
        transactions,
        show,
        toogleModal,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
