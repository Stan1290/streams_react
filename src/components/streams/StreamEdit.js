import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
	componentDidMount() {
		this.props.fetchStream(this.props.match.params.id);
	}

	onSubmit = (formValues) => {
		console.log(formValues);
		this.props.editStream(this.props.match.params.id, formValues);
	};

	render() {
		console.log(this.props);
		if (!this.props.stream) {
			return <dv>Loading...</dv>;
		}
		return (
			<div>
				<h3>Edit the stream</h3>
				<StreamForm
					onSubmit={this.onSubmit}
					initialValues={_.pick(this.props.stream, 'title', 'discription')}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	let id = ownProps.match.params.id;
	return {
		stream: state.streams[id]
	};
};

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);
