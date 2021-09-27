import React from 'react';
import './Button.css';

class Button extends React.Component {

    render() {
        return (
            <div className="Button">
                <h1> {this.props.text} </h1>
            </div>
        )
    }
}

export default Button;