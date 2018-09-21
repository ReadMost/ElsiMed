import React from 'react';
import Holder from '../components/util/Holder'
import {BurgerHeader} from '../components/util/TopHeader'
import Error from '../components/error/Error'

class ErrorContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      result: {
        isExist: false,
        isSuccess: false,
        message: 'повторите позже'
      },
    }
  }
  _onSend = (text)=>{
    this.setState({isLoading: true})
    setTimeout(()=>{
      this.setState({
        isLoading: false,
        result: {
          isExist: true,
          isSuccess: true,
          message: 'форма отправленa'
        }
      })
    }, 2000)
    console.log('ERROR', text)
  }

  render() {
    return (
      <Holder>
          <BurgerHeader 
          title = 'Заметили баг'
          onSideBar={()=>{this.props.navigation.toggleDrawer()}}/>
          <Error
          state = {this.state}
          _onSend = {this._onSend}/>
      </Holder>
    );
  }
}

export default ErrorContainer