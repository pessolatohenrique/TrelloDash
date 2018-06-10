import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export default class CustomToast extends Component {
    render() {
        return (
        <div>
            <ToastContainer></ToastContainer>
        </div>
        );
    }
}