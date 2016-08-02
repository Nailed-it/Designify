import React, { Component } from 'react';
import { Card, Button, Modal } from 'react-materialize';
import './cardList.css';
import AddRoom from './AddRoom';
import AddFurniture from './AddFurniture';

class AddItem extends Component {
  state = {
    form: 'room'
  }

  render() {

    //this.props.header
    var header;
    if(this.state.form === 'room') {
      header = 'Add a Room';
    } else if(this.state.form === 'furniture') {
      header = 'Add an Item';
    } else {
      header = 'Header';
    }
    
    // const onClick =  
    const actions = [<Button waves='light' modal='close' flat >Submit</Button>, <Button waves='light' modal='close' flat>Close</Button>]
    

    return (
      <Card className="blue-grey lighten-4 center-align">

        <Modal
          header={header}
          actions={actions}
          trigger={
            <Button floating large
              centered="true"
              className="grey"
              waves="light"
              icon="add"
            />
          }
        >
          <div>
            {(() => {
              switch (this.state.form) {
              case "room": return <AddRoom />;
              case "furniture": return  <AddFurniture/>;
              default: return "Did not work";
            }
            })()}
          </div>
        </Modal>
      </Card>
    );
  }
};

export default AddItem;
