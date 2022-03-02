import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./components/Home"
import Footer from "./components/Footer"
import About from "./components/About"
import Class from "./components/Class"


export default function App () {
  return (
    <div
      style={{
        //padding: "16px",
        //margin: "16px",
        alignItems: "center"
      }}
    >
      
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/about" exact component={() => <About />} />
          <Route path="/class" exact component={() => <Class />} />
        </Switch>
        <Footer />
      </Router>
      

    </div>
  );
};
