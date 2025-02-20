import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useUser } from "../context/UserContext";
import { Form } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";
import { Button } from "react-bootstrap";
import {
  deleteOneTransaction,
  deleteTransactions,
} from "../../helpers/axiosHelper";
import { toast } from "react-toastify";
import MessageModal from "./MessageModal";
import { RiDeleteBin6Line } from "react-icons/ri";

const TransactionTable = () => {
  const [displayTran, setDisplayTran] = useState([]);
  const { transactions, toogleModal, getTransactions } = useUser();
  const [idsToDelete, setIdsToDelete] = useState([]);
  const [idToDelete, setIdToDelete] = useState("");

  // for message modal
  const [show, setShow] = useState(false);
  const [showSingleDelete, setShowSingleDelete] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
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

  const handleOnSingleDelete = async () => {
    setShowSingleDelete(false);

    const pending = deleteOneTransaction(idToDelete);

    toast.promise(pending, {
      pending: "please wait...",
    });

    const { status, message } = await pending;
    toast[status](message);
    status === "success" && getTransactions() && setIdToDelete("");
  };

  const handleOnDelete = async () => {
    // if (confirm(`Delete ${idsToDelete.length} transactions`)) {
    setShow(false);
    const pending = deleteTransactions({ idsToDelete });

    toast.promise(pending, {
      pending: "please wait ...",
    });

    const { status, message } = await pending;
    toast[status](message);
    status === "success" && getTransactions() && setIdsToDelete([]);
    // }
  };

  // Pagination logic
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
      <div className="d-flex justify-content-around pt-3 mb-4 flex-wrap gap-sm-3 text-center">
        <div className="text-white ">
          {" "}
          <h4 className="text-primary ">
            {displayTran.length} transaction's found!
          </h4>
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

      <Table className="table table-sm  text-center" striped hover>
        <thead>
          <tr>
            <th className="text-warning  py-2 ">#</th>
            <th className="text-warning  py-2 ">Date</th>
            <th className="text-warning  py-2 ">Description</th>
            <th className="text-warning  py-2 ">Deposited</th>
            <th className="text-warning  py-2 ">Expense</th>
            <th className="text-warning  py-2 text-center ">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentTransactions.map((t, i) => (
            <tr className="" key={t._id}>
              <td className="py-2 py-sm-3">{i + 1}</td>
              <td className="py-2 py-sm-3">
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

              <td className="text-center text-danger">
                <RiDeleteBin6Line
                  onClick={() => {
                    setShowSingleDelete(true);
                    setIdToDelete(t._id);
                  }}
                />
              </td>
            </tr>
          ))}
          <tr className="fw-bold text-center ">
            <td colSpan={4}>Total balance</td>
            <td
              colSpan={2}
              className={balance > 0 ? "text-success" : "text-danger"}
            >
              ${balance}
            </td>
          </tr>
        </tbody>
      </Table>

      <MessageModal
        show={showSingleDelete}
        onHide={() => setShowSingleDelete(false)}
        onDelete={handleOnSingleDelete}
        message="Are you sure you want to delete this transaction ?"
      />

      {idsToDelete.length > 0 && (
        <div className="d-grid">
          <Button
            variant="danger"
            onClick={() => {
              setShow(true);
            }}
          >
            Delete {idsToDelete.length}
          </Button>
          <MessageModal
            show={show}
            onHide={() => {
              setShow(false);
            }}
            onDelete={handleOnDelete}
            message={`Are you sure want to delete ${idsToDelete.length} transactions`}
          />
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
