import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';

class StreamEdit extends React.Component {
	componentDidMount () {
		console.log(this.props.match.params.id);
		this.props.fetchStream(this.props.match.params.id);
	}
	render () {
		console.log(this.props);
		if (!this.props.stream) {
			return <dv>Loading...</dv>;
		}
		return <div>{this.props.stream.title}</div>;
	}
}

const mapStateToProps = (state, ownProps) => {
	let id = ownProps.match.params.id;
	return {
		stream : state.streams[id]
	};
};

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);
