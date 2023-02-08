import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { ref, set } from "firebase/database";

import { auth, db } from "../../firebase";
const index = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { user } = await googleSignIn();
      const { refreshToken, providerData } = user;

      localStorage.setItem("user", JSON.stringify(providerData));
      localStorage.setItem("userUID", JSON.stringify(user.uid));

      set(ref(db, "users/" + user.uid), {
        UserInfo: providerData[0],
      });

      navigate("/Dashboard", { replace: true });
    } catch (err) {
      console.log(err.message);
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="w-full max-w-xl mx-auto lg:w-96">
          <button
            type="submit"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full items-center block px-10 py-3.5 text-base font-medium text-center text-blue-600 transition duration-500 ease-in-out transform border-2 border-white shadow-md rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <div className="flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                className="w-6 h-6"
                viewBox="0 0 48 48"
              >
                <defs>
                  <path
                    id="a"
                    d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                  ></path>
                </defs>
                <clipPath id="b">
                  <use xlinkHref="#a" overflow="visible"></use>
                </clipPath>
                <path
                  clipPath="url(#b)"
                  fill="#FBBC05"
                  d="M0 37V11l17 13z"
                ></path>
                <path
                  clipPath="url(#b)"
                  fill="#EA4335"
                  d="M0 11l17 13 7-6.1L48 14V0H0z"
                ></path>
                <path
                  clipPath="url(#b)"
                  fill="#34A853"
                  d="M0 37l30-23 7.9 1L48 0v48H0z"
                ></path>
                <path
                  clipPath="url(#b)"
                  fill="#4285F4"
                  d="M48 48L17 24l-4-3 35-10z"
                ></path>
              </svg>
              <span className="ml-4"> Log in with Google</span>
            </div>
          </button>
          {error && <p className="text-2xl text-slate-900">{error}</p>}
        </div>
      </div>
    </section>
  );
};

export default index;
