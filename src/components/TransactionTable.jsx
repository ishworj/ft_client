import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useUser } from "../context/UserContext";
import { Form } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { deleteTransactions } from "../../helpers/axiosHelper";
import { toast } from "react-toastify";

const TransactionTable = () => {
  const [displayTran, setDisplayTran] = useState([]);
  const { transactions, toogleModal, getTransactions } = useUser();
  const [idsToDelete, setIdsToDelete] = useState([]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // You can change this to any number you like
  const totalPages = Math.ceil(displayTran.length / itemsPerPage);

  useEffect(() => {
    setDisplayTran(transactions);
  }, [transactions]);

  const balance = displayTran.reduce((acc, t) => {
    return t.type === "Income" ? acc + t.amount : acc - t.amount;
  }, 0);

  const handleOnSearch = (e) => {
    const { value } = e.target;
    const filteredTransactions = transactions.filter(({ description }) => {
      return description.toLowerCase().includes(value.toLowerCase());
    });
    setDisplayTran(filteredTransactions);
  };

  // const handleOnSelect = (e) => {
  //   const { checked, value } = e.target;

  //   if (value === "all") {
  //     checked
  //       ? setIdsToDelete(displayTran.map((item) => item._id))
  //       : setIdsToDelete([]);
  //     return;
  //   }

  //   if (checked) {
  //     setIdsToDelete([...idsToDelete, value]);
  //   } else {
  //     setIdsToDelete(idsToDelete.filter((id) => id !== value));
  //   }
  // };

  const handleOnSelect = (e) => {
    const { checked, value } = e.target;

    if (value === "all") {
      if (checked) {
        const newIds = new Set([
          ...idsToDelete,
          ...currentTransactions.map((t) => t._id),
        ]);
        setIdsToDelete([...newIds]);
      } else {
        const newIds = idsToDelete.filter(
          (id) => !currentTransactions.some((t) => t._id === id)
        );
        setIdsToDelete(newIds);
      }
      return;
    }

    if (checked) {
      setIdsToDelete((prev) => [...prev, value]);
    } else {
      setIdsToDelete((prev) => prev.filter((id) => id !== value));
    }
  };

  const handleOnDelete = async () => {
    if (confirm(`Delete ${idsToDelete.length} transactions`)) {
      const pending = deleteTransactions({ idsToDelete });

      toast.promise(pending, {
        pending: "please wait ...",
      });

      const { status, message } = await pending;
      toast[status](message);
      status === "success" && getTransactions() && setIdsToDelete([]);
    }
  };

  // Pagination logic: slice the transactions based on the current page
  const indexOfLastTransaction = currentPage * itemsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - itemsPerPage;
  const currentTransactions = displayTran.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="d-flex justify-content-between pt-3 mb-4">
        <div className="text-white ">
          {" "}
          <h2 className="text-primary fs-1">{displayTran.length}</h2> transaction's found!
        </div>
        <div>
          <Form.Control
            placeholder="Search transactions..."
            type="text"
            onChange={handleOnSearch}
          />
        </div>
        <div>
          <Button onClick={() => toogleModal(true)}>
            <FaPlusCircle /> Add New Transaction
          </Button>
        </div>
      </div>
      <div>
        {currentTransactions.length > 0 && (
          <Form.Check
            label="Select all"
            value="all"
            onChange={handleOnSelect}
            checked={
              currentTransactions.length > 0 &&
              currentTransactions.every((t) => idsToDelete.includes(t._id))
            }
          />
        )}
      </div>

      <Table striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Description</th>
            <th>Deposited</th>
            <th>Expense</th>
          </tr>
        </thead>
        <tbody>
          {currentTransactions.map((t, i) => (
            <tr key={t._id}>
              <td>{i + 1}</td>
              <td>
                <Form.Check
                  label={t.date.slice(0, 10)}
                  value={t._id}
                  onChange={handleOnSelect}
                  checked={idsToDelete.includes(t._id)}
                />
              </td>
              <td>{t.description}</td>
              {t.type === "Income" && (
                <>
                  <td className="in">${t.amount}</td>
                  <td></td>
                </>
              )}
              {t.type === "Expense" && (
                <>
                  <td></td>
                  <td className="out">-${t.amount}</td>
                </>
              )}
            </tr>
          ))}
          <tr className="fw-bold text-center">
            <td colSpan={3}>Total balance</td>
            <td
              colSpan={2}
              className={balance > 0 ? "text-success" : "text-danger"}
            >
              ${balance}
            </td>
          </tr>
        </tbody>
      </Table>

      {idsToDelete.length > 0 && (
        <div className="d-grid">
          <Button variant="danger" onClick={handleOnDelete}>
            Delete {idsToDelete.length}
          </Button>
        </div>
      )}

      {/* Pagination controls */}
      <div className="pagination d-flex justify-content-center pt-3">
        <Button
          disabled={currentPage === 1}
          onClick={() => paginate(currentPage - 1)}
        >
          Previous
        </Button>
        <span className="mx-3">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          disabled={currentPage === totalPages}
          onClick={() => paginate(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default TransactionTable;
