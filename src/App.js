import "./App.css";
import { createBrowserHistory } from "history";
import { Router, Switch } from "react-router-dom";
import { HomeTemplate } from "./templates/HomeTemplate";
import HomePages from "./pages/Home";
import { LoginTemplate } from "./templates/AuthenticationTemplate/LoginTemplate";
import LoginPage from "./pages/Authentication/Login";
import { RegisterTemplate } from "./templates/AuthenticationTemplate/RegisterTemplate";
import RegisterPage from "./pages/Authentication/Register";
import UsersModal from "./pages/User";
import AddUserPage from "./pages/User/AddUser";
import EditUserPage from "./pages/User/EditUser";
import FilmPage from "./pages/FIlms/FilmList";
import AddNewFilmPage from "./pages/FIlms/AddFilm";
import EdiFilmPage from "./pages/FIlms/EditFilm";
import AddShowTime from "./pages/FIlms/AddShowTime";
export const history = createBrowserHistory();
function App() {
  return (
    <Router history={history}>
      <Switch>
        <HomeTemplate path="/" exact Component={HomePages} />
        {/* <HomeTemplate path="/home" exact Component={HomePages} /> */}
        <HomeTemplate path="/user" exact Component={UsersModal} />
        <HomeTemplate path="/user/adduser" exact Component={AddUserPage} />
        <HomeTemplate
          path="/user/edituser/:id"
          exact
          Component={EditUserPage}
        />
        <HomeTemplate path="/film" exact Component={FilmPage} />
        <HomeTemplate
          path="/film/addnewfilm"
          exact
          Component={AddNewFilmPage}
        />
        <HomeTemplate path="/film/editfilm/:id" exact Component={EdiFilmPage} />
        <HomeTemplate
          path="/film/addshowtime/:id"
          exact
          Component={AddShowTime}
        />
        <LoginTemplate path="/login" exact Component={LoginPage} />
        <RegisterTemplate path="/register" exact Component={RegisterPage} />
      </Switch>
    </Router>
  );
}

export default App;
