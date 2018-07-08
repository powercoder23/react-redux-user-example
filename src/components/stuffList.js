import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as stuffActions from '../actions/stuffActions';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';
import './styles.css';

import AddEditBtnRenderer from "./AddEditBtnRenderer";

Modal.setAppElement('#root')

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        width: '500px',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};
class stuffList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.addUser = this.addUser.bind(this);
        

        this.columnDefs = [
            { headerName: "Name", field: "name" },
            { headerName: "Phone ", field: "phone" },
            { headerName: "Company Name", field: "company.name" },
            { headerName: "Edit / Delete", field: 'id', cellRendererFramework: AddEditBtnRenderer }
        ]
    }

    addUser(){
        
        let data = {
            name: 'hello',
            phone: '123456678',
            company: {
                name: 'My Compnay'
            }
        }
        this.props.stuffActions.addUser(data);
        this.setState({ modalIsOpen: false });
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        //this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    componentWillMount() {
        this.props.stuffActions.fetchStuff();
    }

    renderData(item) {
        return <div key={item.id}>{item.name}</div>;
    }

    render() {
        console.log(this.props)
        if (!this.props.stuff) {
            return (
                <div>
                    Loading Stuff...
                </div>
            )
        } else {
            return (
                <div className="">
                    <div className="nav">
                        <button className="btn btn-default pull-right" onClick={this.openModal}>Add</button>
                    </div>
                    <div
                        className="ag-theme-balham"
                        style={{
                            margin: '0 auto',
                            height: "300px",
                            width: "100%"
                        }}
                    >
                        <AgGridReact
                            columnDefs={this.columnDefs}
                            rowData={this.props.stuff}>
                        </AgGridReact>
                    </div>

                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Employee"
                    >
                        <div className="modal-header">
                        Add
                        </div>

                        <form>
                            <div>
                                <label> Name</label>
                                <input className="form-control" type="text" />
                            </div>

                            <div >
                                <label> Phone</label>
                                <input className="form-control" type="text" />
                            </div>

                            <div>
                                <label> Company</label>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-success" onClick={this.addUser}>Add</button>
                                <button className="btn btn-danger" onClick={this.closeModal}>Cancel</button>
                            </div>
                        </form>
                    </Modal>
                </div>
            )
        }
    }
}

stuffList.propTypes = {
    stuffActions: PropTypes.object,
    stuff: PropTypes.array
};

function mapStateToProps(state) {
    return {
        stuff: state.stuff
    };
}

function mapDispatchToProps(dispatch) {
    return {
        stuffActions: bindActionCreators(stuffActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(stuffList);