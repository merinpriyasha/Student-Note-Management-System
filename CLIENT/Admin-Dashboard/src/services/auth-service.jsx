import axios from "axios";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import jwt from 'jwt-decode' // import dependency
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Set token into cookie
export default function AuthService() {
  const history= useHistory();
  const [, setCookie] = useCookies(['token']);

  //Base URL
const http = axios.create({
  baseURL: "http://localhost:3002/",
  headers: {
    "Content-type": "application/json",
  }});


    // Creae account function
    async function AuthCreateAccount(data) {
      // destructure the data Object
      const {  email } = data;
      return http
        .post("/auth/add", {  email })
        .then((res) => toast.success(res.data.message))
        .catch((err) => toast.error("something wrong"));
    }

  // signin function
  async function AuthSignin(data) {
    // set jwt token as a cookie if signedin
    const { email, password } = data;
      return http
      .post("/auth/login", { email, password })
      .then((res) => {
        
        toast.success("User Logged Successfully");
        setCookie("token", res.data.token);
        const user = jwt(res.data.token);
        
        if( user.countLogin >= 1) {
         
          history.push("/dashboard");}
        else if(user.countLogin == 0 ) history.push("/editprofile");
        
        
      })
      .catch((err) => toast.error("something wrong") ); // error notification //console.log(err));
  }


  //return allbackend APIs  
  return { AuthSignin, AuthCreateAccount};
}
