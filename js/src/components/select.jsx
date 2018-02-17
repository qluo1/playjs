/*
 *
 */
import React from 'react'
import createReactClass from 'create-react-class'

var MySelect = createReactClass({

  getInitialState: function () {
    return {selected: false}
  },

  select: function (event) {
    if (event.target.textContent === this.state.selected) { // remove selection
      this.setState({selected: false})
      // update state
    } else {
      // add selection
      this.setState({selected: event.target.textContent.trim()}) // update state
    }
  },

  render: function () {
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
})

// option
var MyOption = createReactClass({

  render: function () {
    var selectedStyle = { backgroundColor: 'red', color: '#fff', cursor: 'pointer' }
    var unSelectedStyle = { cursor: 'pointer' }

    console.log(`value: ${this.props.value}  ${this.props.state} ${this.props.value == this.props.state} `)

    if (this.props.state == this.props.value) {
      return <button style={selectedStyle} onClick={this.props.select}> {this.props.value}</button> // react div element, via JSX
    } else {
      return <button style={unSelectedStyle} onClick={this.props.select}> {this.props.value}</button> // react div element, via JSX
    }
  }
})

export {MySelect, MyOption}
