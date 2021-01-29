interface IUser {
  room: string;
  name: string;
  id: string;
}
const users: IUser[] = [];

const addUser = ({id, name, room}) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUsers = users.find((user) => {
    return user.room === room && user.name === name;
  });

  if (existingUsers) {
    return {error: 'Username is taken'}
  }

  const user: IUser = {id, name, room};
  users.push(user);
  return {user};
}

const removeUser = (id) => {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1);
  }
}

const getUser = (id) => {
  return users.find(user => user.id === id);
}

const getUserInRoom = (room) => {
  return users.find(user => user.room === room);
}

module.exports = {addUser, removeUser, getUser, getUserInRoom};