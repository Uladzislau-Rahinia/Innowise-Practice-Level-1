import { database } from 'core/api/firebase';

export const createUserFolder = async (uid) => {
  const tasksRef = database.ref('tasks/');
  const newUser = {};
  newUser[`${uid}`] = '';
  return tasksRef.update(newUser).then(() => true);
};

export const getUserData = async (route) => {
  const userTasksRef = database.ref(route);
  return userTasksRef.get().then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    }
    const message = 'No data availible';
    throw message;
  });
};

export const updateUserData = async (updatedData, route) => {
  const updates = {};
  updates[route] = updatedData;
  return database
    .ref()
    .update(updates)
    .then(() => true);
};

export const addUserData = async (newData, route) => {
  const userTasksRef = database.ref(route);
  return userTasksRef.push(newData).then(() => true);
};

export const deleteUserData = async (route) => {
  const userTasksRef = database.ref(route);
  return userTasksRef.remove().then(() => true);
};
