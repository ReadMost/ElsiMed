import React from 'react'
import { 
    createSwitchNavigator, 
    createStackNavigator, 
    createDrawerNavigator 
  } from 'react-navigation';
  
  //CONTAINERS
  import AuthContainer from '../containers/AuthContainer'
  import AuthLoadingContainer from '../containers/AuthLoadingContainer'
  import AppContainer from '../containers/AppContainer'
  import AppointmentFreeContainer from '../containers/AppointmentFreeContainer'
  import AppointmentFeeContainer from '../containers/AppointmentFeeContainer'
  import AgendaContainer from '../containers/AgendaContainer'
  import ErrorContainer from '../containers/ErrorContainer'
  import SettingContainer from '../containers/SettingContainer'
  import AboutContainer from '../containers/AboutContainer'
  import AppointmentFormContainer from '../containers/AppointmentFormContainer'
  import SavedContainer from '../containers/SavedContainer'

  
  //COMPONENTS
  import SideBar from '../components/side_bar/SideBar'
  
  
  
  const AuthStack = createStackNavigator({
      Auth: {
        screen: AuthContainer
      },
      Appointment:{
        screen: AppointmentFreeContainer
      },
      AppointmentFee:{
        screen: AppointmentFeeContainer
      },
      Agenda: {
        screen: AgendaContainer
      },
      AppointmentForm:{
        screen: AppointmentFormContainer
      },
      Saved:{
        screen: SavedContainer
      }
    }, 
    {
      initialRouteName : 'Auth'
    }
  );
  
  
  const AppStack = createDrawerNavigator(
    {
      Setting:{
        screen: SettingContainer
      },
      App:{
        screen: AppContainer
      },
      Error: {
        screen: ErrorContainer
      },
      About:{
        screen: AboutContainer
      }
    },
    {
      contentComponent: props => <SideBar {...props} />
    }
  );
  
  
  
export default createSwitchNavigator(
    {
      AuthLoading: AuthLoadingContainer,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
);