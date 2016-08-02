import { ADD_ROOM } from '../actions/rooms.action';
import { ADD_FURNITURE } from '../../furniture/actions/furniture.action';
import _ from 'lodash';

const roomsReducer = (state = {}, action) => {
  const rooms = Object.keys(state);
  switch (action.type) {
    case ADD_ROOM:
      action.room = action.room || {};
      const newRooms = Object.keys(action.room);
      if (newRooms.some(roomName => state[roomName])) { // If any new room name already exists in state
        // Todo: Check if the room already exists in the state
      }
      return Object.assign(_.cloneDeep(state), action.room);
    case ADD_FURNITURE:
      const newState = _.clone(state);
      const furnitureName = Object.keys(action.furniture)[0];
      newState[action.room][furnitureName] = action.furniture[furnitureName];
      return newState;
  }

  return state;
};

export default roomsReducer;
