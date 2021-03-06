// Create the authContext to pass the user properties between pages as long as an user is authenticated

import { useEffect, useState, createContext, useContext } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import nookies from 'nookies';

// import firebase initialisation function
import firebaseInit from './firebaseInit';

// import useRouter hook from nextjs
import { useRouter } from 'next/router';

// call the function to initialise firebase
firebaseInit();

//useUser custom hook

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  //set the initial state of the user to null
  const [user, setUser] = useState();
  //state for navbar
  const [open, setOpen] = useState(false);

  //save the useRouter hook in a const named router
  const router = useRouter();

  // logOut function

  function logOut() {
    // after user logs out, he will be redirected to the login page using next useRouter hook
    return firebase
      .auth()
      .signOut()
      .then(() => {
        router.push('/');
      })
      .catch((e) => {
        // console.log(error(e));
      });
  }

  useEffect(() => {
    return firebase.auth().onIdTokenChanged(async (user) => {
      // // console.log('auth changed');
      // // console.log(user ? user : 'Nothing');
      if (!user) {
        // console.log('no user found');
        setUser(null);
        // nookies.destroy(null, 'token');
        nookies.set(null, 'token', '', { path: '/' });
        return;
      }

      const token = await user.getIdToken();
      setUser(user);
      // nookies.destroy(null, 'token');
      nookies.set(null, 'token', token, { path: '/' });
    });
  }, []);

  //return the Auth context provider
  return (
    <AuthContext.Provider
      value={{
        user,
        logOut,
        setOpen,
        open,
        router,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
