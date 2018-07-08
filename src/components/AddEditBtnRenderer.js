import React, { Component } from "react";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as stuffActions from '../actions/stuffActions';
import PropTypes from 'prop-types';

export class AddEditBtnRenderer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cell: {
                row: this.props.value,
                col: this.props.colDef.headerName
            }
        };

        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
    }

    edit() {
        console.log(this.props)
        this.props.stuffActions.editUser(this.props.data);
    }

    delete() {
        this.props.stuffActions.deleteUser(this.props.rowIndex);
    }

    render() {
        return (
            <div style={{textAlign:'center'}}>
                <button onClick={this.edit} style={{marginRight:'10px'}} className="btn-sm btn-info">Edit</button>
                <button onClick={this.delete} className="btn-sm btn-danger">Delete</button>
            </div>
            
        );
    }
}

AddEditBtnRenderer.propTypes = {
    stuffActions: PropTypes.object
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
)(AddEditBtnRenderer);