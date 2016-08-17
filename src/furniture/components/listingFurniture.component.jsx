import React, { Component } from 'react';
import { Table, Card, CardTitle, Row, Col, Input} from 'react-materialize';
import AddItemButton from '../../app/addItemButton.component.jsx';
import { connect } from 'react-redux';
import furnitureHelper from '../furnitureHelper';
import FlatButton from 'material-ui/FlatButton';
import UpdateFurnitureFormTable from '../containers/updateFurnitureFormTable.container.jsx';
import ListingFurnitureRow from './listingFurnitureRow.component.jsx';

class ListingFurniture extends Component {
  toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }
  constructor(props) {
    super(props);

    this.state = {
      filter: furnitureHelper.listByFurniture.bind(this),
      editing: {},
    };
  }
  
  filterByFurnitureName() {
    this.setState({filter: furnitureHelper.filterByFurniture});
  }
  filterByFurniturePrice() {
    this.setState({filter: furnitureHelper.filterByPrice});
  }
  filterByDeliveryDate() {
    this.setState({filter: furnitureHelper.filterByDate});
  }
  filterByRoomName = () => {
    this.setState({filter: furnitureHelper.filterByRoom});
  }
  unfilter() {
    this.setState({filter: furnitureHelper.listByFurniture});
  }
  updateEditStatus(furniture, status) {
    const editing = Object.assign({}, this.state.editing);
    editing[furniture] = status;
    this.setState({ editing });
  }

  render () {
    const { rooms } = this.props;
    const roomName = Object.keys(rooms);
    const toTitleCase = this.toTitleCase;
    let furnitureList = this.state.filter(rooms);
    const _this = this;

    return (
      <div className="container">
        <h4>Full furniture list</h4>
        <div className="table">
          <div className="tr">
            <span className="th room" data-field="room"  onClick={()=> {this.filterByRoomName()}} >Room Name</span>
            <span className="th furniture" data-field="furniture" onClick={()=> {this.filterByFurnitureName()}} >Furniture Name</span>
            <span className="th price" data-field="price" onClick={()=> {this.filterByFurniturePrice()}} >Price</span>
            <span className="th size" data-field="size">Size</span>
            <span className="th quantity" data-field="quantity">Quantity</span>
            <span className="th notes" data-field="notes">Notes</span>
            <span className="th deliveryDate" data-field="deliveryDate" onClick={()=> {this.filterByDeliveryDate()}} >Delivery Date</span>
            <span className="th controls" data-field="deliveryDate" >&nbsp;</span>
          </div>
          {
            furnitureList.map(function(data, i){
              const initialFormValues = {
                itemName: data.furnitureName,
                price: data.furnitureObj.price,
                deliveryDate: data.furnitureObj.deliveryDate,
                size: data.furnitureObj.size,
                quantity: data.furnitureObj.quantity,
                description: data.furnitureObj.description,
              };

                //<UpdateFurnitureFormTable data={ data } key={ i } formKey={ data.furnitureName }
                //  initialValues={ initialFormValues } editing={ _this.state.editing[data.furnitureName] } />
              return (
                <ListingFurnitureRow
                  editing={ _this.state.editing[data.furnitureName] }
                  data={ data } key={ i }
                  updateEditStatus={_this.updateEditStatus.bind(_this)}
                  initialValues={ initialFormValues }
                />
              );
            })
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps({ rooms, roomSelected }) {
  return { rooms, roomSelected };
}


export default connect(mapStateToProps)(ListingFurniture);