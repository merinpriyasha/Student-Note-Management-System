import axios from "axios";
import { useCookies } from "react-cookie";

// let cookie;

function Cookie() {
  const [cookie] = useCookies();
  return cookie;
}

export const http = axios.create({
  baseURL: "http://ec2-13-229-44-15.ap-southeast-1.compute.amazonaws.com:4000",
  headers: {
    "Content-type": "application/json",
    "x-auth-token": Cookie,
  },
});
