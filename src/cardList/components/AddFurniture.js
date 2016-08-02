import React,{ Component } from 'react';
import {Button, Input, Col, Row} from 'react-materialize';
import DatePicker from 'material-ui/DatePicker';
import { reduxForm } from 'redux-form';



export default class AddFurniture extends Component {

  render() {
    
    return (
      <div>
        <Row>
          <Input s={6} placeholder='Item'/><Input s={6} placeholder='Price'/>
        </Row>
        <Row>
          <Input s={6} placeholder='Description'/><Input s={6} placeholder='URL'/>
        </Row>
        <Row>
          <Input s={6} type='select' label="Room">
            <option value='1'>Room 1</option>
            <option value='2'>Room 2</option>
            <option value='3'>Room 3</option>
          </Input>
          <Input s={6} placeholder='Delivery Date' label='Date' />
        </Row>
        </div>
      )
  }
}

// export default reduxForm({
//   form: 'AddRoomForm',
//   fields: ['roomName'],
// }, null, { addRoom } )(AddRoom);
//    
