// third party libraries
import { connect } from 'react-redux';

// components
import Signup from '../../components/Signup/Signup';

// actions
import { userSignupRequest } from '../../actions/signup';

const mapDispatchToProps = dispatch => ({
  signup: (details) => {
    console.log('am here');
    dispatch(userSignupRequest(details));
  }
});

const mapStateToProps = state => ({
  auth: state.auth,
  signup: state.auth.signup
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
