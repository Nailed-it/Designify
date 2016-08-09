import React, { Component } from 'react';
import { connect } from 'react-redux';
import FList from '../components/fList.component';
import { Row, Col, Tabs, Tab, Button } from 'react-materialize';
import { bindActionCreators } from 'redux';
import { selectRoom, getRooms } from '../../rooms/actions/rooms.action';
import { changeRoute } from '../../routing/actions/routing.action';
import { browserHistory } from 'react-router';

class FurnitureList extends Component {
  componentDidMount() {
    if(Object.keys(this.props.rooms).length === 0) {
      this.props.getRooms();
    }
    if(this.props.params.name) {
      this.props.selectRoom(this.props.params.name)
    }
    this.props.changeRoute(this.props.location.pathname);
  }
  click(room) {
    this.props.selectRoom(room);
    browserHistory.push('/furniture/' + room)
  }
  render() {
    const intro = 'Furniture';
    const { rooms, roomSelected } = this.props;
    const roomNames =  Object.keys(rooms);
    var furniture = {};

    if (roomSelected && rooms[roomSelected]) {
      Object.assign(furniture, rooms[roomSelected].furniture);
    }
  
    return (
      <div>
        <Row>
          <Col s={12}>
            <div className='tabNav'>
              <ul className="tabs z-depth-1">
                {roomNames.map((room, i) => {
                  if(room === this.roomSelected) {
                    return (
                      <li key={i} className="tab col s3 active"><span style={{'fontWeight':'bold'}}className='active' onClick={() => {this.click(room)}} style={{'cursor':'default'}}>{room}</span></li>
                    )
                  }
                  return (
                    <li key={i} className="tab col s3" ><span onClick={() => {this.props.selectRoom(room)}} style={{'cursor':'default'}}>{room}</span></li>
                  )
                })}
              </ul>
            </div>
          </Col>
          <div className='F-FAB'>
            <Button floating fab='vertical' icon='arrow_drop_up' className='grey darken-3' small style={{'top': '24px', 'right': '24px'}}>
              <Button floating icon='filter_list' className='grey'/>
              <Button floating icon='sort' className='grey'/>
              <Button floating icon='color_lens' className='grey'/>
              <Button floating icon='add' className='grey'/>
            </Button>
          </div>
        </Row>
        
        <Row>
          <Col s={12} l={12}>
            <div>
                <FList
                  list={ furniture }
                  intro={ intro }
                  view="furniture"
                />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps({ rooms, roomSelected }) {
  return { rooms, roomSelected };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({selectRoom, getRooms,  changeRoute}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FurnitureList);
