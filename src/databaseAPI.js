import Firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyArc1jthjsWkx91fsY2QTzXVhZm378B9AY',
  authDomain: 'nailed-it-c1d80.firebaseapp.com',
  databaseURL: 'https://nailed-it-c1d80.firebaseio.com',
  storageBucket: 'nailed-it-c1d80.appspot.com',
};
Firebase.initializeApp(config);
const database = Firebase.database();

// Firebase.storage is undefined when this file is run by tests, so
// we only call Firebase.storage as a function if it's truthy.
var storageRef = Firebase.storage && Firebase.storage().ref();
var metadata = {
  contentType: 'image/jpeg',
};

export function uploadPhoto(file, selectedRoom) {
  // Per the comment on the assignment of storageRef, if this code is run by our tests,
  // then Firebase.storage is undefined
  if(storageRef) {
    return storageRef.child('images/' + file[0].name).put(file[0], metadata);
  }
}

export function addRoom(room, roomName) {
  database.ref('Rene/rooms/' + roomName).set({
    furniture: 'No furniture',
  });
}

export function getRooms() {
  return database.ref('Rene/rooms').once('value');
}

export function getProjects() {
  return database.ref().once('value');
}

// export function getFurniture(rooms) {
//   for (var room in rooms) {
//     database.ref('rooms/' + room + '/furniture').once('value', function(snapshot) {
//       return snapshot;
//     })
//   }
// };

export function getBudget() {
  return database.ref('Rene/budget').once('value');

  // .then((snapshot) => {
  //   cb(snapshot.val());
  // });
}

export function updateBudget(budget) {
  database.ref('Rene/budget').set(budget);
}

export function updateFurniture(roomName, furnitureName, furnitureProps) {
  //take the roomName and furnitureName from the submit and put the obj at the
  // location in the database
  database.ref('Rene/rooms/' + roomName + '/furniture/' + furnitureName).set(furnitureProps);
};

export function removeRoom(room) {
  database.ref('Rene/rooms/' + room).remove();
};

// export function removeFurniture(room, furniture) {
//   for (var room in rooms) {
//     for (var pieceOfFurniture in furniture) {
//       database.ref('rooms/' + room + '/furniture/' + pieceOfFurniture).remove();
//     }
//   }
// };
