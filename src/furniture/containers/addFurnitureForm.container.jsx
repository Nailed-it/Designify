import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Card, CardTitle, Icon, Button, Input, Row, Col } from 'react-materialize';
import { reduxForm, reset, change } from 'redux-form';
import { addFurniture } from '../actions/furniture.action.js';
import DatePicker from 'material-ui/DatePicker';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ColorInput from '../../rooms/components/colorPicker.component.jsx';

class AddFurnitureForm extends Component {
  handleColorPick(color) {

  }

  render() {
    const { fields: {
      itemName, price, description, url, size, color
      }, handleSubmit, } = this.props;
    //console.log('color: ', color);

    return (
      <form onSubmit={ handleSubmit(this.props.addFurniture.bind(null, this.props.roomSelected)) }>
      <Row>
        <Input s={6} placeholder='Item'{ ...itemName } />
        <Input s={6} placeholder='Price'{ ...price } />
      </Row>
      <Row>
        <Input s={6} placeholder='Notes'{ ...description } />
        <Input s={6} placeholder='Photo URL'{ ...url } />
      </Row>
      <Row>
        <Input s={4} placeholder="Size (centimeters)" { ...size } />
        <Input s={4} placeholder="Primary color" { ...color } />
        <ColorInput s={4} action={ colorObj => this.props.changeFieldValue('color', colorObj.hex) } />
      </Row>
     
      <RaisedButton type="submit" label="submit"/>
     </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({ addFurniture, change }, dispatch),
    changeFieldValue: (field, value) => {
      dispatch(change('AddFurnitureForm', field, value))
    },
  };
}

export default reduxForm({
  form: 'AddFurnitureForm',
  fields: ['itemName', 'price', 'description', 'url', 'size', 'color'],
}, state => ({ roomSelected: state.roomSelected }), mapDispatchToProps)(AddFurnitureForm);
              
// {...deliveryDate}
// <input s={6} type='file' {...photoURL}><i className="material-icons">add_a_photo</i></input>
 // <Row>
 //        <i className="material-icons">add_a_photo</i>
          
      
 //      </Row>