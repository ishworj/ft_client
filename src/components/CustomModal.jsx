import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useUser } from "../context/UserContext";

export const CustomModal = ({ children }) => {
  const { show, toogleModal } = useUser();
  return (
    <Modal
      show={show}
      onHide={() => toogleModal(false)}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton >Note!</Modal.Header>
      <Modal.Body className="p-5 ">{children}</Modal.Body>
    </Modal>
  );
};
