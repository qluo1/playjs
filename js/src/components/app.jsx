/*
 *
 **/
import React from 'react'

/* select

// old style createReactClass

import createReactClass from 'create-react-class'

var MySelect = createReactClass({

  getInitialState: function(){
    return {selected: false} 	 //this.state.selected = false;
  },

	select: function(event){
		if(event.target.textContent === this.state.selected){//remove selection
			this.setState({selected: false})
			//update state
		}else{
		//add selection
			this.setState({selected: event.target.textContent.trim()}) //update state
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

    var selectedStyle = { backgroundColor: 'red', color: '#fff', cursor: 'pointer' };
    var unSelectedStyle = { cursor: 'pointer' };

    console.log(`value: ${this.props.value}  ${this.props.state} ${this.props.value == this.props.state} `)

    if(this.props.state == this.props.value){
      return <div style={selectedStyle} onClick={this.props.select}> {this.props.value}</div> // react div element, via JSX
    }else{
      return <div style={unSelectedStyle} onClick={this.props.select}> {this.props.value}</div> // react div element, via JSX
    }
  }
})
*/

class MySelect extends React.Component {
  getInitialState () {
    return {selected: false} 	 // this.state.selected = false;
  }

  select (event) {
    if (event.target.textContent === this.state.selected) { // remove selection
      this.setState({selected: false})
      // update state
    } else {
      // add selection
      this.setState({selected: event.target.textContent.trim()}) // update state
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

/* option */
class MyOption extends React.Component {
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

export default class App extends React.Component {
  render () {
    return (
      <div style={{textAlign: 'center'}}>
        <h1>Hello World</h1>
        <MySelect />
      </div>)
  }
}
