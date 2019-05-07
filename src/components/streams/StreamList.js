import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions/index';
import { Link } from 'react-router-dom';

class StreamList extends React.Component {
	state = {
		tripsPerPage: 10,
		currentPage: 1,
		tripCount: 0,
		trips: {}
	};
	componentDidMount() {
		this.props.fetchStreams();
		this.setState({ trips: this.props.streams });
	}

	renderList() {
		return this.props.streams.map((stream) => {
			return (
				<div className="item" key={stream.id}>
					{this.renderAdmin(stream)}
					<i className="large middle aligned icon camera" />
					<div className="content">
						{stream.title}
						<div className="description">{stream.discription}</div>
					</div>
				</div>
			);
		});
	}

	renderAdmin(stream) {
		if (stream.userId === this.props.currentUserId) {
			return (
				<div className="right floated content">
					<Link className="ui button primary" to={`/streams/edit/${stream.id}`}>
						Edit
					</Link>
					<button className="ui button negative">Delete</button>
				</div>
			);
		}
	}

	renderCreate() {
		if (this.props.isSignedIn) {
			return (
				<div style={{ textAlign: 'right' }}>
					<Link className="ui button primary" to="/streams/new">
						Create a Stream
					</Link>
				</div>
			);
		}
	}

	render() {
		return (
			<div>
				<h2>Streams</h2>
				<div className="ui celled list">{this.renderList()}</div>
				<div className="right aligned content">{this.renderCreate()}</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		streams: Object.values(state.streams),
		currentUserId: state.auth.userId,
		isSignedIn: state.auth.isSignedIn
	};
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
