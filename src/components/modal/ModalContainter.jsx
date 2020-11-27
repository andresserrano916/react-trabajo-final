import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {closeModal} from '../../app/store/actions/modalActions';

const mapState = (state) => ({
    body: state.modal.body,
    open: state.modal.open,
    size: state.modal.size,
    closeIcon: state.modal.closeIcon
});

const actions = {
    closeModal
};

const ModalContainter = ({body, open, size, closeModal, closeIcon}) => {
    return (
        <Modal open={open} onClose={closeModal} size={size} closeIcon={closeIcon}>
            <Modal.Content>{body}</Modal.Content>
        </Modal>
    );
};

ModalContainter.propTypes = {
    open: PropTypes.bool.isRequired,
    body: PropTypes.any,
    closeModal: PropTypes.func.isRequired,
    size: PropTypes.string,
    closeIcon: PropTypes.bool
};

ModalContainter.defaultProps = {
    body: null,
    size: 'mini',
    closeIcon: false
};

export default connect(mapState, actions)(ModalContainter);
