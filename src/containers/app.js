import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Billfold from '../components/billfold';
import * as ExpensesActions from '../actions/expenses';

function mapStateToProps(state) {
    return {
        onlineExpenses: state.expenses.onlineList,
        offlineExpenses: state.expenses.offlineList,
        connectionChecked: state.expenses.connectionChecked,
        connected: state.expenses.connected
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ExpensesActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Billfold);
