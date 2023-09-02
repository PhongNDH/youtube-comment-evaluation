import { Row, Col, Image } from "react-bootstrap";
import Chatbot from "./../components/chatbot";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="mt-4" style={{ width: "100%" }}>
            {/* <h2 style={{ color: "white", fontFamily: "Aquire" }}>Sentitube</h2> */}
            <Row className="d-flex justify-content-center">
                <Col sm={12} md={12} lg={8} xl={8}>
                    <Chatbot />
                </Col>
            </Row>
        </div>
    );
};

export default Home;
