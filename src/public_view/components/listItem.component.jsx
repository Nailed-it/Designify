import React, { Component } from 'react';
import { CardPanel, Row, Col, MediaBox} from 'react-materialize';
import { Link } from 'react-router';


class ListItem extends Component {
  handleClick = (title) => {
    if (this.props.clickHandler) {
      this.props.clickHandler(title);
    }
  }

  render() {
    // this.props.clickHandler('the other ballpit');
    //  onClick={}
    const title = this.props.title;
    const lists = this.props.lists
    const listNames = Object.keys(lists.rooms);

    return (
      <div>
        <CardPanel
          className='grey lighten-2 card-panel hoverable'
          title={ title }
          style={{'color':'black'}}
        >
          <Row>
            <Col s={6}>
              <Link to={"publicRoom"}><span onClick={() => {this.handleClick(title)}} style={{'fontWeight':'bold'}}>{title}</span></Link>
            </Col>
            <Col s={6}>
              <span>Budget: ${lists.budget}</span>
            </Col>
          </Row>
          <Row>
            {listNames.map((itemName) => {
              if(!lists.rooms[itemName].photoURL) {
                var photoURL = "http://cdn.home-designing.com/wp-content/uploads/2010/10/living-room-artificial-light-by-ferdaviola.jpg";
              }
              else {
                var photoURL = lists.rooms[itemName].photoURL.url;
              }
              return (
                <div key={itemName}>
                  <Col s={3}>
                    <MediaBox src={photoURL} caption={itemName} width='100'/>
                    <span className='center-align'>{itemName}</span>
                  </Col>
                </div>
              );
            })}
          </Row>
        </CardPanel>
      </div>
    );
  }
}

export default ListItem;
