import React from 'react'
import { Header, Icon } from 'react-native-elements'
import {MAIN_HEADER_COLOR, MAIN_BACKGROUND_COLOR, MAIN_COLOR} from '../../settings'

class LeftComponent extends React.Component {
    render() {
        return (
            <Icon
                size = {30}
                containerStyle = {{paddingTop: 30, paddingRight: 5}}
                name='menu'
                color= {MAIN_HEADER_COLOR}
                underlayColor = {MAIN_BACKGROUND_COLOR}
                onPress={ this.props.onSideBar }
            />
        )
    }
}

class LeftComponent2 extends React.Component {
    render() {
        return (
            <Icon
                size = {30}
                containerStyle = {{paddingTop: 30, paddingRight: 5}}
                name='chevron-left'
                color= {'white'}
                containerStyle = {{backgroundColor: MAIN_COLOR}}
                underlayColor = {MAIN_COLOR}
                onPress={ this.props.onSideBar }
            />
        )
    }
}


export class BurgerHeader extends React.Component {
    render() {
        return (
            <Header
                leftComponent={<LeftComponent onSideBar={this.props.onSideBar} />}
                centerComponent={{ text: this.props.title, style: { color: MAIN_HEADER_COLOR, fontSize: 20 } }}
                backgroundColor = {MAIN_BACKGROUND_COLOR}
            />
        )
    }
}

export class BackHeader extends React.Component {
    render() {
        return (
            <Header
                leftComponent={<LeftComponent2 onSideBar={this.props.onSideBar} />}
                centerComponent={{ text: this.props.title, style: { color: 'white', fontSize: 20 } }}
                backgroundColor = {MAIN_COLOR}
            />
        )
    }
}