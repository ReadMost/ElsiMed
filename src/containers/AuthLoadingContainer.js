import React from 'react';
import {connect} from 'react-redux'
import {onFirstStart} from '../actions/AppAction'
import Holder from '../components/util/Holder'
import {onAppointmentGet} from '../actions/AppoinmentAction'

class AuthLoadingContainer extends React.Component {

  constructor(props) {
    super(props);
    this.props._firstStart()
    //this.props.test()
  }
  componentDidUpdate(){
    if(!this.props.isFirstStartLoading){
      this.props.navigation.navigate(this.props.isAuthenticated ? 'App' : 'Auth');
    }
  }
  render() {
    return (
      <Holder isLoading = {this.props.isFirstStartLoading}>

      </Holder>
    );
  }
}

const mapStateToProps = state=>{
  return {
    isAuthenticated: state.UserReducer.isAuthenticated,
    isFirstStartLoading: state.AppReducer.isFirstStartLoading,
  }
}

const mapDispatchToProps = dispatch=>{
  return {
    _firstStart: ()=>{
      dispatch(onFirstStart())
    },
    test: ()=>{
      dispatch(onAppointmentGet())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)( AuthLoadingContainer )