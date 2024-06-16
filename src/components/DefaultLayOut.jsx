import AppBar from "./AppBar.jsx";
import {Container} from "react-bootstrap";
import '../style/DefaultLayOut.css';

// eslint-disable-next-line react/prop-types
const DefaultLayOut = ({ children }) => {
    return (
        <>
            <AppBar />
            <Container>
                {children}
            </Container>
        </>
    );
}

export default DefaultLayOut;