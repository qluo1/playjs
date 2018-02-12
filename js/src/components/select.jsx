/* react enlightment 1: what is react
 *
 */
import React, {Component} from 'react'

/*
 * old style
 
import createReactClass from 'create-react-class'

var MySelect = createReactClass({

  getInitialState: function () {
    return {selected: false}
    // this.state.selected = false;
  },

  select (event) {
    if (event.target.textContent === this.state.selected) { // remove selection
      this.setState({selected: false})
      // update state
    } else {
      // add selection
      this.setState({selected: event.target.textContent}) // update state
    }
  },

  render () {
    var mySelectStyle = {
      border: '1px solid #999',
      padding: '5px',
      display: 'flex'
      // flexDirection: 'column',
      // alignItems: 'flex-start'
    }

    return <div style={mySelectStyle}>
      <MyOption state={this.state.selected} select={this.select} value='Volvo' />
      <MyOption state={this.state.selected} select={this.select} value='Saab' />
      <MyOption state={this.state.selected} select={this.select} value='Mercedes' />
      <MyOption state={this.state.selected} select={this.select} value='Audi' />
    </div> // react div element, via JSX
  }
})

// option
var MyOption = createReactClass({

  render: function () {
    var selectedStyle = { backgroundColor: 'red', color: '#fff', cursor: 'pointer' }
    var unSelectedStyle = { cursor: 'pointer' }

    console.log(`value: ${this.props.value}  ${this.props.state} ${this.props.value == this.props.state} `)

    if (this.props.state == this.props.value) {
      return <button className='ui button active' onClick={this.props.select}>{this.props.value}</button> // react div element, via JSX
    } else {
      return <button className='ui vk button' style={unSelectedStyle} onClick={this.props.select}>{this.props.value}</button> // react div element, via JSX
    }
  }
})

*/
class MySelect extends Component {

  constructor (props) {
    super(props)
    this.state = {selected: false}
    // bind event
    this.select = this.select.bind(this)
  }

  select (event) {
    if (event.target.textContent === this.state.selected) { // remove selection
      this.setState({selected: false})
      // update state
    } else {
      // add selection
      this.setState({selected: event.target.textContent}) // update state
    }
  }

  render () {
    var mySelectStyle = {
      border: '1px solid #999',
      padding: '5px',
      display: 'flex'
      // flexDirection: 'column',
      // alignItems: 'flex-start'
    }

    return <div style={mySelectStyle}>
      <MyOption state={this.state.selected} select={this.select} value='Volvo' />
      <MyOption state={this.state.selected} select={this.select} value='Saab' />
      <MyOption state={this.state.selected} select={this.select} value='Mercedes' />
      <MyOption state={this.state.selected} select={this.select} value='Audi' />
    </div> // react div element, via JSX
  }
}

class MyOption extends Component {
  render () {

    console.log(`value: ${this.props.value}  ${this.props.state} ${this.props.value == this.props.state} `)

    if (this.props.state == this.props.value) {
      return <button className='btn-primary btn-lg active' onClick={this.props.select}>{this.props.value}</button> // react div element, via JSX
    } else {
      return <button className='btn disable' onClick={this.props.select}>{this.props.value}</button> // react div element, via JSX
    }
  }
}

export {MySelect}
