
import {Container} from "react-bootstrap";
import '../style/DefaultLayOut.css';
import AdminAppBar from "./AdminAppBar.jsx";

// eslint-disable-next-line react/prop-types
const AdminLayOut = ({ children }) => {
    return (
        <>
            <AdminAppBar/>
            <Container>
                {children}
            </Container>
        </>
    );
}

export default AdminLayOut;