import React from 'react';
import Holder from '../components/util/Holder'
import {BurgerHeader} from '../components/util/TopHeader'

class AppContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Holder>
          <BurgerHeader 
          title = 'Найти доктора'
          onSideBar={()=>{this.props.navigation.toggleDrawer()}}/>
      </Holder>
    );
  }
}

export default AppContainer