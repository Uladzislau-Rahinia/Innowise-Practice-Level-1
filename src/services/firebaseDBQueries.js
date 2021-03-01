import { database } from "api/firebase";

export const CreateUserFolder = async (uid) => {
  const tasksRef = database.ref(`tasks/`);
  const newUser = {};
  newUser[`${uid}`] = "";
  return tasksRef.update(newUser).then(() => {
    return true;
  });
};

export const GetUserData = async (route) => {
  const userTasksRef = database.ref(route);
  return userTasksRef.get().then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    }
  });
};

export const UpdateUserData = async (updatedData, route) => {
  const updates = {};
  updates[route] = updatedData;
  return database
    .ref()
    .update(updates)
    .then(() => {
      return true;
    });
};

export const AddUserData = async (newData, route) => {
  const userTasksRef = database.ref(route);
  return userTasksRef.push(newData).then(() => {
    return true;
  });
};

export const DeleteUserData = async (route) => {
  const userTasksRef = database.ref(route);
  return userTasksRef.remove().then(() => {
    return true;
  });
};
