import { auth } from "core/api/firebase";
import { ERROR_MESSAGES } from "core/utils/errors";

export const loginUser = async (email, password) => {
  let result = {};
  return auth
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      result.isSuccessful = true;
      return result;
    })
    .catch((error) => {
      result.isSuccessful = false;
      result.message = ERROR_MESSAGES[error.code]
        ? ERROR_MESSAGES[error.code]
        : ERROR_MESSAGES.default;
      return result;
    });
};

export const registerUser = async (email, password) => {
  let result = {};
  return auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      result.isSuccessful = true;
      result.data = userCredential.user.uid;
      return result;
    })
    .catch((error) => {
      result.isSuccessful = false;
      result.message = ERROR_MESSAGES[error.code]
        ? ERROR_MESSAGES[error.code]
        : ERROR_MESSAGES.default;
      return result;
    });
};

export const isLoggedIn = async (/*statusHandler*/) => {
  //new Promise((resolve) => auth.onAuthStateChanged((user) => resolve(user)));
  // return auth.onAuthStateChanged((user) => {
  //   if (user) {
  //     return user; //statusHandler(true);
  //   } else statusHandler(false);
  // });
  // if (auth.currentUser) {
  //   return true;
  // } else {
  //   return false;
  // }
};

export const logoutUser = async () => {
  return auth.signOut().then(() => {
    return true;
  });
};

export const getUserId = () => {
  return auth.currentUser.uid;
};
