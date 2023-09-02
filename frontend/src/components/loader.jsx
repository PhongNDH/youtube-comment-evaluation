import { MDBSpinner } from "mdb-react-ui-kit";

const Loader = () => {
    return (
        <div className="d-flex justify-content-center align-items-md-center mt-4">
            <MDBSpinner
                grow
                className="mx-2"
                color="secondary"
                style={{
                    height: "10px",
                    width: "10px",
                    display: "block",
                }}
            >
                <span className="visually-hidden">Loading...</span>
            </MDBSpinner>
            <MDBSpinner
                grow
                className="mx-2"
                color="secondary"
                style={{
                    height: "11px",
                    width: "11px",
                    display: "block",
                }}
            >
                <span className="visually-hidden">Loading...</span>
            </MDBSpinner>
            <MDBSpinner
                grow
                className="mx-2"
                color="secondary"
                style={{
                    height: "12px",
                    width: "12px",
                    display: "block",
                }}
            >
                <span className="visually-hidden">Loading...</span>
            </MDBSpinner>
            <MDBSpinner
                grow
                className="mx-2"
                color="secondary"
                style={{
                    height: "13px",
                    width: "13px",
                    display: "block",
                }}
            >
                <span className="visually-hidden">Loading...</span>
            </MDBSpinner>
            <MDBSpinner
                grow
                className="mx-2"
                color="secondary"
                style={{
                    height: "14px",
                    width: "14px",
                    display: "block",
                }}
            >
                <span className="visually-hidden">Loading...</span>
            </MDBSpinner>
        </div>
    );
};

export default Loader;

//import { Spinner } from "react-bootstrap";

// const Loader = () => {
//     return (
//         <Spinner
//             animation="border"
//             role="status"
//             style={{
//                 height: "100px",
//                 width: "100px",
//                 margin: "auto",
//                 display: "block",
//             }}
//         >
//             <span className='sr-only'>Loading... </span>
//         </Spinner>
//     );
// };
// export default Loader;
