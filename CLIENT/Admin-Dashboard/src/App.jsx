import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Students from "./pages/Students";
import CreateAccount from "./pages/CreateAccount";
import SignIn from "./pages/SignIn";
import Notes from "./pages/Notes";
import EditProfile from "./pages/EditProfile"
import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/create-account" exact component={CreateAccount} />
        <Route path="/sign-in" exact component={SignIn} />
        <Route exact path="/editprofile"  component={EditProfile} />
        <Main>   
          <Route exact path="/students" component={Students} />
          <Route exact path="/notes" component={Notes} />
          <Route exact path="/dashboard" component={Home} />
          <Redirect from="*" to="/dashboard" />
        </Main>
      </Switch>
    </div>
  );
}

export default App;
