import { useCookies } from "react-cookie";
import axios from "axios";

export default function DataService(){
   const [cookies] = useCookies(['token']);

const http = axios.create({
  baseURL: "http://localhost:3002/",
  headers: {
    "Content-type": "application/json",
    "x-auth-token": cookies.token
  }});

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

    async function getStudentorById(id) {
      const data = await http.get("/admin/get/" + id).then((res) => res.data.Result);
      console.log(data);
      //  return data
    }

    async function getNoteById(id) {
      const data = await http.get("/subject/get/" + id).then((res) => res.data.Result);
      console.log(data);
      //  return data
    }

    async function updateNote(Id, notes) {

      const { title, description } = notes;

      const data = await http.put("/subject/updateNote/" + Id, {title, description})
      .then((res) => console.log(res.data.message))
      .catch((err) => console.log(err));
      // return data;
    }
  
    async function deleteNote(Id) {
      const data = await http.delete("/subject/deleteNote/" + Id).then((res) => res);
      console.log(
        data.status === 200
          ? data.data.message
          : "Oops! something went wrong when deleting note"
      );
      // return data;
    }
  

    return {getStudents, AuthEdit, getStudentorById, getNoteById, updateNote, deleteNote}
}
