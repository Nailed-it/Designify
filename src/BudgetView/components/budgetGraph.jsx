import React, { Component } from 'react';

import { Table, Col, Row  } from 'react-materialize';
import budgetHelper from '../budgetHelperFunctions';
import PieChartHolder from './pieChartHolder.component.jsx';


class BudgetGraph extends Component {


  constructor(props) {
    super(props);
    //budgetHelper.generateData = budgetHelper.generateData.bind(this);
    //budgetHelper.calculateBudget = budgetHelper.calculateBudget.bind(this);
    
  }
  componentWillReceiveProps(nextProps) {
    if(Object.keys(this.props.rooms).length !== 0) {
      var genData = budgetHelper.generateData(this.props.rooms);
    }
  }

  render() {
    var genData;
    
    const { rooms, budget } = this.props;
    const roomNames = Object.keys(rooms);
    const calcBudget = budgetHelper.calculateBudget;
    const toTitleCase = budgetHelper.toTitleCase;
    if(Object.keys(rooms).length !== 0) {
      genData = budgetHelper.generateData(rooms);
    }

    return(
      Object.keys(rooms).length !== 0 ? 
        <div>
          <Row>
            <Col>
              <h5><b>Total Budget:</b> { budget || 'no budget' }</h5>
              <h5><b>Total Cost:</b> { this.totalCost || 'no costs' }</h5>
              <h5><b>Budget Remaining:</b> { 
                budget - this.totalCost > 0 ? budget - this.totalCost : <span style={{'color': 'red'}}>{budget - this.totalCost}</span>
              }</h5>
            </Col>
          </Row>
        <Table>
          <thead>
            <tr>
              <th data-field="id">Room</th>
              <th data-field="price">Total Room Cost</th>
            </tr>
          </thead>
          <tbody>
            {roomNames.map((roomName, id)=> {
              if (id === 0) {
                this.totalCost = 0;
              }
              let roomCost = calcBudget(roomName, rooms);
              this.totalCost += roomCost;
              return (
                <tr key={id}>
                  <th>{ budgetHelper.toTitleCase(roomName) }</th>
                  <th>{ roomCost } </th>
                </tr>
                )
            })}
          </tbody>
        </Table>  
        <PieChartHolder genData ={genData} />
        </div> : <div>Loading...</div>
    )
  }
} 

export default BudgetGraph;
