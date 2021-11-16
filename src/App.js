import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Department from "./components/Department";
import Employee from "./components/Employee";
import Navigation from "./components/Navigation";
import Home from "./Home";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <h3 className="m-3 d-flex justify-content-center">Employee Management</h3>
      </div>

      <Navigation/>

      <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/department" component={Department}/>
        <Route path="/employee" component={Employee}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
