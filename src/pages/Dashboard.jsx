import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useUser } from "../context/UserContext";
import DashboardChart from "../components/DashboardChart";
import AiSuggestions from "../components/AiSuggestions";

const Dashboard = () => {
  const { user, setUser } = useUser();
  return (
    <Container className="p-md-5">
      <Row className="bg-dark my-2 py-2 p-md-5 rounded ">
        <Col>
          {user?.name && (
            <div className="text-warning pb-3">
              <h3 className="fs-2">
                Welcome {user?.name?.split(" ")[0] || "Guest"}
              </h3>
            </div>
          )}
        </Col>
        <Col className="text-center d-flex justify-content-center align-items-center gap-3">
          <p className="m-0 ">AI Financial Advisor</p>
          <AiSuggestions />
        </Col>
      </Row>
      <DashboardChart />
    </Container>
  );
};

export default Dashboard;
