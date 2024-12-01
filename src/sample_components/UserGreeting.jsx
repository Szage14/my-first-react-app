import propTypes from 'prop-types';

function UserGreeting(props) {
    const welcomeMessage = <h1 className="welcome-msg">Welcome back {props.username}!</h1>;
    const loginPrompt = <h1 className="login-prompt">Please sign up.</h1>;

    return (
        props.isLoggedIn ? welcomeMessage : loginPrompt
    );
}
UserGreeting.propTypes = {
    isLoggedIn: propTypes.bool,
    username: propTypes.string
}
UserGreeting.defaultProps = {
    isLoggedIn: false,
    username: 'Guest'
}
export default UserGreeting;