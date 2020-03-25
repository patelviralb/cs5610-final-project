import React, {Component} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import CreateQuestion from "../components/createQuestion";
import ViewQuestion from "../components/displayQuestionAnswer";
import Home from "../components/home";

class AppRouter extends Component {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route
                        path="/home"
                        component={Home}
                    />

                    <Route
                        path="/create/question"
                        component={CreateQuestion}
                    />

                    <Route
                        path="/question/:questionId"
                        render={(props) => <ViewQuestion {...props} />}
                        /*component={viewQuestion}*/
                    />

                    <Route
                        path="*"
                        render={() => {
                            return (<Redirect to="/home"/>);
                        }}
                    />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default AppRouter;
