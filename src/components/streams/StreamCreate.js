import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { createStream } from '../../actions';

class StreamCreate extends React.Component {
	rederInput = ({ input, label, meta }) => {
		console.log(meta);
		const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			<div className={className}>
				<label>{label}</label>
				<input {...input} autoComplete="off" />
				{this.renderError(meta)}
			</div>
		);
	};
	onSubmit = (formValues) => {
		console.log(formValues);
		this.props.createStream(formValues);
	};

	renderError ({ error, touched }) {
		if (touched && error) {
			return (
				<div className="ui error message">
					<div className="header">{error}</div>
				</div>
			);
		}
	}

	render () {
		// console.log(this.props);
		return (
			<form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
				<Field name="title" component={this.rederInput} label="Enter Title" />
				<Field name="discription" component={this.rederInput} label="Enter Discription" />
				<button className="ui button primary">Submit</button>
			</form>
		);
	}
}

const validate = (formValues) => {
	const errors = {};
	if (!formValues.title) {
		errors.title = 'You must enter a title';
	}
	if (!formValues.discription) {
		errors.discription = 'You must enter a discription';
	}

	return errors;
};

const formWrapped = reduxForm({ form: 'streamCreate', validate })(StreamCreate);

export default connect(null, { createStream })(formWrapped);
