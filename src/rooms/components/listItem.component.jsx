import React, { Component } from 'react';
import { CardPanel, Button, Row, Col, MediaBox } from 'react-materialize';
import { Link } from 'react-router';
import { removeRoom, addPhoto, selectRoom } from '../actions/rooms.action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SwatchPicker } from 'react-color';
import Dropzone from 'react-dropzone';

class ListItem extends Component {
  handleClick(title) {
    if (this.props.clickHandler) {
      this.props.clickHandler(title);
    }
  }
  removeRoomCall(title) {
    this.props.removeRoom(title);
    Materialize.toast(title + ' removed', 4000)
  }

  state = {
    displayColorPicker: false,
  };

  handleColorClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleColorClick () {
    console.log('got here')
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  onDrop(files) {
    // console.log('Received files: ', files);
    this.props.addPhoto(files);
  }


  render() {
    const popover = {
      position: 'absolute',
      zIndex: '2',
    }
    const cover = {
      position: 'fixed',
      top: '0',
      right: '0',
      bottom: '0',
      left: '0',
    }
    console.log(this.props)
    const title = this.props.title;
    // if(this.props.rooms[this.props.roomSelected].photoURL) {
    //   const photo = this.props.rooms[this.props.roomSelected].photoURL;
    // }

    return (
    
        <CardPanel
          onClick={ () => this.handleClick(title) }
          className='grey lighten-2 ListItem card-panel hoverable'
        >
          <Row>
          <Col s={4}>
          <div>
            <span><Link className="card-title" to={ 'furniture/' + this.props.title }>{title}</Link></span>
          </div>

          <div className='card-control-panel'>
            <div className='card-control' hoverable><Dropzone style={{'width': '24px', 'height': '24px', 'border': '0px'}} onDrop={files => this.onDrop(files)}>
              <i className="card-controls material-icons md-dark">add_a_photo</i>
            </Dropzone></div>
            <div className='card-control' hoverable><i className="card-controls material-icons md-dark">create</i></div>
            <div className='card-control' hoverable><i className="card-controls material-icons md-dark" onClick={() => {this.removeRoomCall(title)}}>delete_sweep</i></div>
            <div className='card-control' hoverable><i className="card-controls material-icons md-dark" onClick={() => {this.handleColorClick}}>format_paint</i></div>
              { this.state.displayColorPicker ? <div style={ popover }>
                <div style={ cover } onClick={ this.handleColorClose }/>
                <SwatchPicker />
                </div> : null 
              }
            </div>
            </Col>
            <Col s={8}>
              {this.photo ? <div><MediaBox src={photo} width='40'/></div> : null}
            </Col>
            </Row>
        </CardPanel>
      );
  }
}

export default ListItem;


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeRoom, addPhoto }, dispatch);
}

function mapStateToProps({ rooms, roomSelected, shared, route }) {
  return { rooms, roomSelected, shared, route };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
