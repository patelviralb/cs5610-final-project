import React, {Component} from 'react';
import './navBarStyle.css'
import {Link} from "react-router-dom";
import loginService from '../../services/loginAndRegistrationService'
import {connect} from "react-redux";
import userProfileActions from "../../redux/actions/userProfileActions";
import Utils from "../../common/utils";

class NavBarComponent extends Component {

    logout = () => {
        loginService.logoutService().then(response => {
            if (response.status === 1) {
                this.props.resetLoginState();
            }
        });
    };

    render() {
        let chowkPath = "/welcome";
        if (true === this.props.isLoggedIn) {
            chowkPath = "/home";
        }

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="navbar-brand titleStyle">
                    <Link
                        title="Chowk"
                        to={chowkPath}
                    >
                        Chowk
                    </Link>
                    {this.renderProfile()}
                </div>
                <div className="navbar-nav ml-auto nav-right">
                    {
                        this.props.isLoggedIn
                        &&
                        <Link
                            className="btn btn-primary ml-3"
                            title="Create Question"
                            to={`/create/questions`}
                        >
                            <i className="fa fa-plus" aria-hidden="true"></i> &nbsp;
                            Question
                        </Link>
                    }
                </div>

                <div className="navbar-nav nav-right my-2 my-lg-0">
                    {
                        this.props.isLoggedIn
                        &&
                        <button
                            className="btn btn-danger ml-3"
                            onClick={this.logout}
                        >
                            Logout
                        </button>
                    }
                </div>
            </nav>
        );
    }

    renderProfile() {
        let isLoggedIn = this.props.isLoggedIn;
        if (Utils.isNull(isLoggedIn) || false === isLoggedIn) {
            return (<React.Fragment/>);
        }

        let user = this.props.userDetails;

        return (
            <Link
                className={"ml-5"}
                title="Profile"
                to={`/profiles/${user.id}`}
            >
                <span>
                    {user.name}'s Profile
                </span>
            </Link>
        );
    }
}

const stateMapper = (state) => {
    return {
        userDetails: state.userProfile.userDetails,
        isAdmin: state.userProfile.isAdmin,
        isLoggedIn: state.userProfile.isLoggedIn
    }

};

const dispatchMapper = (dispatch) => {
    return {
        resetLoginState: () => {
            dispatch(userProfileActions.resetLoginStatus());
        }
    }

};
export default connect(stateMapper, dispatchMapper)(NavBarComponent);
