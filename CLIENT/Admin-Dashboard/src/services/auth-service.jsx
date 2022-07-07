import axios from "axios";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import jwt from 'jwt-decode' // import dependency

export default function AuthService() {
  const history= useHistory();
  const [, setCookie] = useCookies(['token']);

const http = axios.create({
  //baseURL: "http://ec2-13-229-44-15.ap-southeast-1.compute.amazonaws.com:4000",
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
        .then((res) => console.log(res.data.message))
        .catch((err) => console.log(err));
    }

  // signin function
  async function AuthSignin(data) {
    // set jwt token as a cookie if signedin
    const { email, password } = data;
      return http
      .post("/auth/login", { email, password })
      .then((res) => {
        setCookie("token", res.data.token);
        const user = jwt(res.data.token);
        
        if( user.countLogin >= 1) {
          history.push("/dashboard");}
        else if(user.countLogin == 0 ) history.push("/editprofile");
      
      })
      .catch((err) => console.log(err));
  }

  return { AuthSignin, AuthCreateAccount};
}
