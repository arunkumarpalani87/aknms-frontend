import { Auth } from "aws-amplify";
import React, { Component } from "react";
import { ControlLabel, FormControl, FormGroup } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import store from '../store/store';
import "./css/Home.css";

export default class Login extends Component {
    constructor(props) {
        super(props);
        store.subscribe(() => { this.forceUpdate() });

        this.state = {
            isLoading: false,
            email: "",
            password: ""
        };

    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }


    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();

        this.setState({ isLoading: true });

        try {
            await Auth.signIn(this.state.email, this.state.password);
            this.props.userHasAuthenticated(true);

            store.dispatch({
                type: "LOGIN",
                username: this.state.email
            });

            let info = await Auth.currentSession()
            let userInfo = JSON.stringify(info.idToken.payload);
            sessionStorage.setItem('username', this.state.email )
            sessionStorage.setItem('sort_dir',"DESC");
            sessionStorage.setItem('sort_key',"id");
            
            if (userInfo.match("cognito:groups.*admin")){
                sessionStorage.setItem('userrole', 'admin' );
                this.props.history.push("/");
                
            } else {
                sessionStorage.setItem('userrole', 'networkoperator' );
                this.props.history.push("/eventsPage");
            }
        } catch (e) {
            alert(e.message);
            this.setState({ isLoading: false });
        }
    }

    render() {
        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="email" bsSize="large">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>
                    <LoaderButton
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                        isLoading={this.state.isLoading}
                        text="Login"
                        loadingText="Logging in…"
                    />

                </form>
            </div>
        );
    }
}
