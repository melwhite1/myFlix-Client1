import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';

import { setFilter } from '../../actions/actions';

function VisibilityFilterInput(props) {
  return <Form.Control
    onChange={e => props.setFilter(e.target.value)}
    value={props.visibilityFilter}
    placeholder="filter"
  />;
}

VisibilityFilterInput.propTypes = {
	user:PropTypes.string.isRequired
 };

export default connect(
  null,
  { setFilter }
)(VisibilityFilterInput);
