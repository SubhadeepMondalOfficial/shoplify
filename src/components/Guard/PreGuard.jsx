import firebaseAppConfig from "../../config/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";

const auth = getAuth(firebaseAppConfig);

const PreGuard = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is Logged IN");
        setSession(user);
      } else {
        console.log("User is Not Logged In");
        setSession(false);
      }
    });
  }, []);

  if (session === null) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ColorRing
          visible={true}
          height="60"
          width="60"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </div>
    );
  }

  return session ? <Navigate to="/" /> : <Outlet />;
};

export default PreGuard;
