import { ToastContainer } from "react-bootstrap";
import MyNavbar from "./Components/Navbar";
import SignUp from "./Components/SignUp";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
    <MyNavbar/>
    <SignUp/> 
    <ToastContainer/>
    </div>
  );
}

export default App;
