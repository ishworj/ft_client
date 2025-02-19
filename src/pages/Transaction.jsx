import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TransactionFrom from "../components/TransactionFrom";
import TransactionTable from "../components/TransactionTable";
import { useUser } from "../context/UserContext";
import { useEffect } from "react";
import { CustomModal } from "../components/CustomModal";

const Transaction = () => {
  const { getTransactions } = useUser();
  useEffect(() => {
    getTransactions();
  }, []);
  return (
    <Container className=" p-md-5">
      <Row className="bg-dark p-md-5 rounded ">
        <Col>
          <CustomModal>
            <TransactionFrom />
          </CustomModal>
          <TransactionTable />
        </Col>
      </Row>
    </Container>
  );
};

export default Transaction;
