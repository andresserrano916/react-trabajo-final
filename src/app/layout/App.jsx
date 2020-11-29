import React from 'react';
import { ToastContainer } from 'react-toastify';
import ModalContainter from '../../components/modal/ModalContainter';
import Routes from '../config/Routes';

const App = () => {
    return (<>
        <ModalContainter/>
        <ToastContainer position="bottom-right" />
        <Routes/>
    </>);
};

export default App;