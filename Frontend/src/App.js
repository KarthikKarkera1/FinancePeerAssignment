import "./styles.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Components/Home";
import Posts from "./Components/Posts";
import SignIn from "./Components/SignIn";
import FileUpload from "./Components/FileUpload";
export default function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/posts" exact component={Posts} />
        <Route path="/fileupload" exact component={FileUpload} />
        <Route path="/signin" exact component={SignIn} />
      </Router>
    </div>
  );
}
