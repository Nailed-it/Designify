import { ADD_ROOM, GET_ROOMS, REMOVE_ROOM, ADD_PHOTO } from '../actions/rooms.action';
import { ADD_FURNITURE, DELETE_FURNITURE, UPDATE_FURNITURE} from '../../furniture/actions/furniture.action';
import _ from 'lodash';

const roomsReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case ADD_PHOTO:
    newState = _.clone(state);
    newState[action.selectedRoom].photoURL = action.url;
    return newState;
    //handles initial pull from db
    case GET_ROOMS:
      let rooms = action.payload.val();
      return Object.assign(_.cloneDeep(state), rooms);

    case ADD_ROOM:
      action.room = action.room || {};
      const newRooms = Object.keys(action.room);

      // Todo: Check if the room already exists in the state
      // If any new room name already exists in state
      //if (newRooms.some(roomName => state[roomName])) {
      //}

      return Object.assign(_.cloneDeep(state), action.room);
    case ADD_FURNITURE:
      if (!action.roomName) {
        return state;
      }
      //clone state
      newState = _.clone(state);
      //check to see if storage loaction is an obj or placeholder text
      if (typeof(newState[action.roomName].furniture) !== 'object') {

        newState[action.roomName].furniture = {};
      }
      
      //add in new furniture properties at the roomName.furnitureName location
      newState[action.roomName].furniture[action.furnitureName] = action.furnitureProps;
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
    case REMOVE_ROOM:
      newState = _.clone(state);
      delete newState[action.title]
      return newState;
    default:
      return state;
  }
};

export default roomsReducer;
