import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
	componentDidMount() {
		window.gapi.load('client:auth2', () => {
			window.gapi.client
				.init({
					clientId: '99164045200-2s7g8diui9n1mlm2ee24bd8r0tte6akd.apps.googleusercontent.com',
					scope: 'email'
				})
				.then(() => {
					this.auth = window.gapi.auth2.getAuthInstance();
					this.onAuthChange(this.auth.isSignedIn.get());
					console.log(this.auth.currentUser.get().getId());
					this.auth.isSignedIn.listen(this.onAuthChange);
				});
		});
	}

	onAuthChange = (isSignedIn) => {
		if (isSignedIn) {
			this.props.signIn(this.auth.currentUser.get().getId());
		} else {
			this.props.signOut();
		}
	};

	onSignInClick = () => {
		this.auth.signIn();
	};

	onSignOutClick = () => {
		let c = window.confirm('Are you sure you want to sign out?');
		if (c) this.auth.signOut();
	};

	renderAuthBtn() {
		if (this.props.isSignedIn === null) {
			return null;
		} else if (this.props.isSignedIn) {
			return (
				<button onClick={this.onSignOutClick} className="ui red google button">
					<i className="google icon" />Sign Out
				</button>
			);
		} else {
			return (
				<button onClick={this.onSignInClick} className="ui blue google button">
					<i className="google icon" />Sign In with Google
				</button>
			);
		}
	}

	render() {
		return <div>{this.renderAuthBtn()}</div>;
	}
}

const mapStateToProps = (state) => {
	return { isSignedIn: state.auth.isSignedIn, userId: state.auth.userId };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
