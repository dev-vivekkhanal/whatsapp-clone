import "../styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import Auth from "./auth";
import { auth, db } from "../firebase";
import firebase from "firebase/compat/app";
import Loading from "../components/Loading";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useEffect } from "react";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

  // Capture user details and send it to db in firebase
  useEffect(() => {
    if (user) {
      db.collection("users").doc(user.uid).set(
        {
          email: user.email,
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
          photoURL: user.photoURL,
        },
        { merge: true }
      );
    }
  }, [user]);

  if (loading) {
    return <Loading />;
  }
  if (!user) return <Auth />;

  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;
