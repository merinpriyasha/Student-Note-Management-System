import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Set cookie
export default function DataService(){
   const [cookies] = useCookies(['token']);

   //Base URL
const http = axios.create({
  baseURL: "http://localhost:3002/",
  headers: {
    "Content-type": "application/json",
    "x-auth-token": cookies.token
  }});

  //Get Student APIs intergration
  async function getStudents(){
    const data = await http.get("/admin").then((res) => res.data.Result)
     return data
  }
 

    // Edit profile function
    async function AuthEdit(data) {
      // destructure the data Object
      const { firstName,lastName,dateOfBirth, mobile, password } = data;
      return http
        .put("auth/updateAuthUser", { firstName,lastName,dateOfBirth, mobile, password})
        .then((res) => console.log(res.data.message))
        .catch((err) => console.log(err));
    }

    //get Student details by ID API 
    async function getStudentorById(id) {
      const data = await http.get("/admin/get/" + id).then((res) => res.data.Result);
      console.log(data);
      //  return data
    }

    //Get Note by ID API
    async function getNoteById(id) {
      const data = await http.get("/subject/get/" + id).then((res) => res.data.Result);
      console.log(data);
      //  return data
    }

    //Update note details
    async function updateNote(Id, notes) {

      const { title, description } = notes;

      const data = await http.put("/subject/updateNote/" + Id, {title, description})
      .then((res) => console.log(res.data.message))
      .catch((err) => console.log(err));
      // return data;
    }
  
    //Delete note details
    async function deleteNote(Id) {
      const data = await http.delete("/subject/deleteNote/" + Id).then((res) => toast.success(res.data.status));
      console.log(
        data.status === 200
          ? data.data.message
          : "Oops! something went wrong when deleting note"
      );
      // return data;
    }
  

    //Return ALL backend APIs
    return {getStudents, AuthEdit, getStudentorById, getNoteById, updateNote, deleteNote}
}
