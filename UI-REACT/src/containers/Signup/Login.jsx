// third party libraries
import { connect } from 'react-redux';

// components
import Login from '../../components/Login/Login';

// actions
import { userLoginRequest } from '../../actions/login';

const mapDispatchToProps = dispatch => ({
  login: (details) => {
    dispatch(userLoginRequest(details));
  }
});

const mapStateToProps = state => ({
  auth: state.auth,
  login: state.auth.login
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
