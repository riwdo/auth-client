import React from 'react';
import './SignIn.css';

class SignIn extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "", 
        }
    }

    signIn() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: this.state.username, password: this.state.password })
        };
        
        fetch("https://localhost:8080/signIn", requestOptions)
        .then((res) => {
            if (res.ok) {
                return res.json();
            } 
            throw new Error("Something went wrong when fetching from the backend")
        })
        .then((jsonResult) => {
            if (jsonResult.jwt !== undefined) {
                this.setState({ jwt: jsonResult.jwt })
            } else {
                alert("Something went wrong during sign in. Try again.")
            }
        });
    }

    testAuth() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + this.state.jwt },
        };
        console.log(requestOptions.body);
        fetch("https://localhost:8080/testAuth", requestOptions)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            console.log(res)
            throw new Error("Something went wrong when fetching from the backend")
        })
        .then((jsonResult) => {
            console.log(jsonResult)
        });
    }


    signUp() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: this.state.username, password: this.state.password })
        };
        console.log(requestOptions.body);
        fetch("https://localhost:8080/signUp", requestOptions)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            console.log(res)
            throw new Error("Something went wrong when fetching from the backend")
        })
        .then((jsonResult) => {
            console.log(jsonResult)
        });
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        return (
            <div className="Container">
                <div className="contentContainer">
                    <div className="logo"></div>
                    <div className="flex1">
                        <h3> Spring Login </h3>
                    </div>
                    <form className="form">
                        <div className="textInput">
                            <h4> Name </h4>
                            <input type="text" name="username" onChange={this.changeHandler} />
                        </div>
                        
                        <div className="textInput">
                            <h4> Password </h4>
                            <input type="password" name="password" onChange={this.changeHandler} />
                        </div>
                    
                    
                    </form>
                
                    <div className="flexRow">
                        <button className="signInButton" onClick={() => this.signIn()}>
                            Login
                        </button>
                        <button className="signUpButton" onClick={() => this.signUp()}>
                            Create user
                        </button>    
                        <button className="signUpButton" onClick={() => this.testAuth()}>
                            Test auth
                        </button>    
                    </div>
                </div>
            </div>
        )
    }
}

export default SignIn;