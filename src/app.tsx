import * as React from "react";
import { HashRouter as Router, Route, Link, } from "react-router-dom";
import { NoteContext } from "./context/noteProvider";

import Add from "./components/add";
import AlertError from "./components/alertError";

const Sections = React.lazy(() =>
    import("./components/sections")
);

import "./style/app.less";
function App() {
    const connect = React.useContext(NoteContext);
    const items = connect("items");

    console.log("------------------------------------");
    console.log("#Rending the app");
    return (
        <div id="app">
            {/* {error && AlertError({ msg: "unable to fetch server for notes" })} */}
            <Add />

            <Router>
                <Link to="/all">
                    <h2>show all notes (load extra data) </h2>
                </Link>

                <React.Suspense fallback={<h2>Loading</h2>}>
                    <Route path="/all">
                        <Sections />
                    </Route>
                </React.Suspense>
            </Router>
        </div>
    )
}

export default App;