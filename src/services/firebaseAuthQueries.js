import { auth } from "api/firebase";
import { ERROR_MESSAGES } from "utils/errors";

export const LoginUser = async (email, password) => {
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

export const RegisterUser = async (email, password) => {
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

export const IsLoggedIn = () => {
  // auth.onAuthStateChanged((user) => {
  //   if (user) {
  //     statusHandler(true);
  //   } else statusHandler(false);
  // });
  if (auth.currentUser) {
    return true;
  } else {
    return false;
  }
};

export const LogoutUser = async () => {
  return auth.signOut().then(() => {
    return true;
  });
};

export const GetUserId = () => {
  return auth.currentUser.uid;
};
