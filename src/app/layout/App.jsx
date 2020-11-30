import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import LoadingComponent from '../../components/common/LoadingComponent';
import ModalContainter from '../../components/modal/ModalContainter';
import { getJwt } from '../config/auth/credentials';
import Routes from '../config/Routes';
import {getUser, logout} from './../store/actions/authActions';
import PropTypes from 'prop-types';

const actions = {
    getUser,
    logout
};

const App = ({getUser, logout}) => {
    const [appLoaded, setAppLoaded] = useState(false);

    useEffect(() => {
        const token = getJwt();

        if(token){
            getUser();
        }else{
            logout();
        }
        setAppLoaded(true);
    }, [getUser]);

    if(!appLoaded){
        return <LoadingComponent content="Cargando aplicacion..." />;
    }

    return (<>
        <ModalContainter/>
        <ToastContainer position="bottom-right" />
        <Routes/>
    </>);
};

App.propTypes = {
    getUser: PropTypes.func.isRequired
};

export default connect(null, actions)(App);