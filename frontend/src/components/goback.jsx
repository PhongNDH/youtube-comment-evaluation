import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
const Goback = ({ variant, to }) => {
    return (
        <LinkContainer to={to} >
            <Button
                variant={variant}
                className=""
                style={{ verticalAlign: "middle" }}
            >
                <i className="fa-sharp fa-regular fa-circle-left"></i>
                <span> &nbsp; Go back</span>
            </Button>
        </LinkContainer>
    );
};

export default Goback;
