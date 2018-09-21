import React from 'react'
import Router from './src/settings/Router'
import {Font} from 'expo'

//COMPONENTS
import Holder from './src/components/util/Holder'

//REDUX STAFF
import Reducers from './src/reducers'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

const middlewares = applyMiddleware(thunk)
const store = createStore(Reducers, middlewares)


export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = { fontLoaded: false }
  }
  async componentDidMount() {
    await Font.loadAsync({
      'georgia': require('./assets/fonts/Georgia.ttf'),
      'regular': require('./assets/fonts/Montserrat-Regular.ttf'),
      'light': require('./assets/fonts/Montserrat-Light.ttf'),
      'italic': require('./assets/fonts/Ubuntu-Light-Italic.ttf'),
    });
    this.setState({ fontLoaded: true });
  }
  render() {
    return (
      <Provider store = {store}>
        <Holder isLoading={!this.state.fontLoaded}>
          <Router/>
        </Holder>
      </Provider>
    );
  }
}
