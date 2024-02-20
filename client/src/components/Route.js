import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Home } from "./Home";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default Routes;
