// third party libraries
import { connect } from 'react-redux';

// components
import Dashboard from '../../components/Dashboard/Dashboard';

// actions
import { userEntriesRequest } from '../../actions/dashboard';

const mapDispatchToProps = dispatch => ({
  fetch: () => {
    dispatch(userEntriesRequest());
  }
});

const mapStateToProps = state => ({
  auth: state.auth,
  entries: state.entries
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
