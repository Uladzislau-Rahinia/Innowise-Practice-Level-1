import { auth } from 'core/api/firebase';
import ERROR_MESSAGES from 'core/utils/errors';

export const loginUser = async (email, password) => auth
  .signInWithEmailAndPassword(email, password)
  .catch((error) => {
    const message = ERROR_MESSAGES[error.code]
      ? ERROR_MESSAGES[error.code]
      : ERROR_MESSAGES.default;
    throw message;
  });

export const registerUser = async (email, password) => auth
  .createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    const data = userCredential.user.uid;
    return data;
  })
  .catch((error) => {
    const message = ERROR_MESSAGES[error.code]
      ? ERROR_MESSAGES[error.code]
      : ERROR_MESSAGES.default;
    throw message;
  });

export const isLoggedIn = async (/* statusHandler */) => {
  // new Promise((resolve) => auth.onAuthStateChanged((user) => resolve(user)));
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

export const logoutUser = async () => auth.signOut().then(() => true);

export const getUserId = () => auth.currentUser.uid;
