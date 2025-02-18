import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useUser } from "../context/UserContext";


const  Dashboard= () => {
    const { user, setUser } = useUser();
  return (
    <Container className="p-5">
      <Row className="bg-dark p-5 rounded ">
        {user?.name && (
          <div className="text-warning">
            <h1>Welcome  { " "}
              {user?.name}</h1>
          </div>
        )}
      </Row>
      <Row>
        
      </Row>
    </Container>
  );
};

export default Dashboard;
