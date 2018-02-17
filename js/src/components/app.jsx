/*
 *
 **/
import React from 'react'

import { MySelect, MyOption } from './select.jsx'

/*
class MySelect extends React.Component {

  constructor (props) {
    super(props)
    this.state = {selected : false}

    // bind this to event
    this.select = this.select.bind(this);
  }

  select (event) {

    console.log(`target: ${event.target.textContext}  ${this.state.selected} `)

    if (event.target.textContent === this.state.selected) { // remove selection
      //this.state.selected = false
      this.setState({selected: false})
      // update state
    } else {
      // add selection
      // this.setState({selected: event.target.textContent.trim()}) // update state
      if (event.target.textContext){
        this.setState( {selected : event.target.textContext})
      }
    }
  }

  render () {
    var mySelectStyle = {
      border: '1px solid #999',
      display: 'inline-block',
      padding: '5px'
    }

    return <div style={mySelectStyle}>
      <MyOption state={this.state.selected} select={this.select} value='Volvo' />
      <MyOption state={this.state.selected} select={this.select} value='Saab' />
      <MyOption state={this.state.selected} select={this.select} value='Mercedes' />
      <MyOption state={this.state.selected} select={this.select} value='Audi' />
    </div> // react div element, via JSX
  }
}

class MyOption extends React.Component {

  constructor (props){
    super(props)
  }

  render () {
    var selectedStyle = { backgroundColor: 'red', color: '#fff', cursor: 'pointer' }
    var unSelectedStyle = { cursor: 'pointer' }

    console.log(`value: ${this.props.value}  ${this.props.state} ${this.props.value == this.props.state}`)

    if (this.props.state == this.props.value) {
      return <div style={selectedStyle} onClick={this.props.select}> {this.props.value}</div> // react div element, via JSX
    } else {
      return <div style={unSelectedStyle} onClick={this.props.select}> {this.props.value}</div> // react div element, via JSX
    }
  }
}

*/
export default class App extends React.Component {
  render () {
    return (
      <div className='.container' style={{ textAlign: 'center' }}>
        <h1>Hello World</h1>
        <MySelect />
      </div>
    )
  }
}
