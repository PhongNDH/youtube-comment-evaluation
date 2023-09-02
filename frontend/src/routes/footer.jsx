import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { LinkContainer } from 'react-router-bootstrap';


const members = [
    {
        fullname: "Trần Tùng Dương",
        id: "20215233",
    },
    {
        fullname: "Nguyễn Như Đại",
        id: "20215233",
    },
    {
        fullname: "Nguyễn Thành Đạt",
        id: "20215233",
    },
    {
        fullname: "Vũ Đức Minh",
        id: "20215233",
    },
    {
        fullname: "Nguyễn Đình Hồng Phong",
        id: "20215233",
    },
];

const Footer = () => {
    return (
        <MDBFooter bgColor='light' className='text-center text-lg-start text-muted' style={{marginTop:"20vh"}}>
          <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
            <div className='me-5 d-none d-lg-block'>
              <span>Get connected with us on social networks:</span>
            </div>
    
            <div>
              <LinkContainer to='' className='me-4 text-reset'>
                <MDBIcon fab icon="facebook-f" />
              </LinkContainer>
              <LinkContainer to='' className='me-4 text-reset'>
                <MDBIcon fab icon="twitter" />
              </LinkContainer>
              <LinkContainer to='' className='me-4 text-reset'>
                <MDBIcon fab icon="google" />
              </LinkContainer>
              <LinkContainer to='' className='me-4 text-reset'>
                <MDBIcon fab icon="instagram" />
              </LinkContainer>
              <LinkContainer to='' className='me-4 text-reset'>
                <MDBIcon fab icon="linkedin" />
              </LinkContainer>
              <LinkContainer to='' className='me-4 text-reset'>
                <MDBIcon fab icon="github" />
              </LinkContainer>
            </div>
          </section>
    
         
        </MDBFooter>
      );
};

export default Footer;
