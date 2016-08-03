export const ADD_FURNITURE = 'ADD_FURNITURE';
export const DELETE_FURNITURE = 'DELETE_FURNITURE';
export const UPDATE_FURNITURE = 'UPDATE_FURNITURE';

// NOTE: Many corresponding reducers are in rooms.reducer, not in the furniture directory

export function addFurniture(roomName, furnitureProps) {
  return {
    type: ADD_FURNITURE,
    roomName,
    furnitureProps,
  };
}

export function deleteFurniture(furnitureName, roomName) {
  return {
    type: DELETE_FURNITURE,
    furnitureName,
    roomName
  };
}

export function updateFurniture(furnitureName, roomName, newProps) {
  return {
    type: UPDATE_FURNITURE,
    roomName,
    furnitureName,
    newProps
  }
}