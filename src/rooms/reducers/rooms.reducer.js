import { ADD_ROOM } from '../actions/rooms.action';
import { ADD_FURNITURE, DELETE_FURNITURE, UPDATE_FURNITURE } from '../../furniture/actions/furniture.action';
import _ from 'lodash';

const roomsReducer = (state = {}, action) => {
  const rooms = Object.keys(state);
  let newState;
  switch (action.type) {
    case ADD_ROOM:
      action.room = action.room || {};
      const newRooms = Object.keys(action.room);
      if (newRooms.some(roomName => state[roomName])) { // If any new room name already exists in state
        // Todo: Check if the room already exists in the state
      }
      return Object.assign(_.cloneDeep(state), action.room);
    case ADD_FURNITURE:
      if (!action.roomName) {
        return state;
      }
      newState = _.clone(state);
      const roomName = action.roomName;
      const furnitureName = action.furnitureProps.itemName;
      delete action.furnitureProps.itemName;
      newState[roomName].furniture[furnitureName] = action.furnitureProps;
      return newState;
    case DELETE_FURNITURE:
      newState = _.clone(state);
      delete newState[action.roomName].furniture[action.furnitureName];
      return newState;
    case UPDATE_FURNITURE:
      newState = _.clone(state);
      Object.assign(newState[action.roomName].furniture[action.furnitureName],
        action.newProps);
      return newState;
  }

  return state;
};

export default roomsReducer;

/*
 deliveryDate
 :
 undefined
 description
 :
 undefined
 itemName
 :
 "aoe"
 price
 :
 "oae"

 url
 :
 undefined
 */