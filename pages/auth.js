import Head from "next/head";
import { useRef, useState } from "react";
import { auth, provider } from "../firebase";
import GoogleIcon from "@mui/icons-material/Google";
import { useRouter } from "next/router";

function Auth() {
  const signInEmailRef = useRef(null);
  const signInPasswordRef = useRef(null);
  const signUpEmailRef = useRef(null);
  const signUpPasswordRef = useRef(null);
  const router = useRouter();

  //   States
  const [isNewUser, setIsNewUser] = useState(false);
  const [signUpErrorMessage, setSignUpErrorMessage] = useState("");
  const [loginErrorMessage, setLoginErrorMessage] = useState("");

  //   Signin and SignUp handlers
  const signInHandler = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(
        signInEmailRef.current.value,
        signInPasswordRef.current.value
      )
      .then((authUser) => {
        router.replace("/");
      })
      .catch((error) => {
        setLoginErrorMessage(error.message);
      });
  };

  const demoSignInHandler = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword("demouser@gmail.com", "demopassword")
      .then((authUser) => {
        router.replace("/");
      })
      .catch((error) => {
        setLoginErrorMessage(error.message);
      });
  };

  const signupHandler = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(
        signUpEmailRef.current.value,
        signUpPasswordRef.current.value
      )
      .then((authUser) => {
        router.replace("/");
      })
      .catch((error) => {
        setSignUpErrorMessage(error.message);
      });
  };

  const signInWithGoogle = () => {
    auth.signInWithPopup(provider).catch(alert);
  };

  return (
    <section className="grid place-items-center h-screen bg-[#111b21] text-white cursor-default">
      <Head>
        <title>Whatsapp Clone</title>
        <link rel="icon" href="/Whatsapp.png" />
      </Head>
      <div className="p-[20px] sm:p-[50px] text-center bg-[#222e35] rounded-[5px] drop-shadow-lg w-[90%] max-w-[450px]">
        <div className="flex justify-center mb-[20px] -mt-[60px] sm:-mt-[100px]">
          <img
            className="h-[80px] w-[80px]  grayscale-[40%]"
            src="/Whatsapp.png"
            alt="whatsapp"
          />
        </div>

        {/* Login form */}
        {!isNewUser ? (
          <div className="">
            <h1 className=" font-semibold text-3xl mb-8">WhatsApp</h1>
            <form className="max-w-[350px] mx-auto">
              <input
                ref={signInEmailRef}
                type="text"
                placeholder="Email address"
                required
                className="h-12 w-full outline-none px-5 mb-5 bg-[#111b21] border-b-2 border-opacity-0 focus:border-opacity-100 border-green-500 rounded "
              />
              <input
                ref={signInPasswordRef}
                type="password"
                placeholder="Password"
                required
                className="h-12 w-full outline-none px-5 mb-5 bg-[#111b21] border-b-2 border-opacity-0 focus:border-opacity-100 border-green-500 rounded "
              />
              <p className="my-5 text-sm text-red-500">{loginErrorMessage}</p>
              <button
                className="bg-[#46913d] text-white hover:bg-[#35742e] w-full p-3 border-0 hover:border-0 outline-none transition-all rounded-md active:scale-95"
                variant="outlined"
                onClick={signInHandler}
              >
                Sign in
              </button>
              <p className="my-2 text-xl text-gray-300  text-center">or</p>
              <button
                className="bg-[#46913d] text-white hover:bg-[#35742e] w-full p-3 border-0 hover:border-0 outline-none transition-all rounded-md active:scale-95"
                variant="outlined"
                onClick={demoSignInHandler}
              >
                Demo Sign In
              </button>
            </form>
            <p className="my-2 text-xl text-gray-300  text-center">or</p>
            <button
              className=" text-white  w-full p-3 border-0 hover:border-0 outline-none max-w-[350px] transition-all rounded-md active:scale-95"
              variant="outlined"
              onClick={signInWithGoogle}
            >
              <GoogleIcon />
              <span className="ml-3"> SIGN IN WITH GOOGLE</span>
            </button>
            <p className="mt-10 text-gray-500 ">
              New to Whatsapp?
              <span
                onClick={() => {
                  setIsNewUser(true);
                  signInEmailRef.current.value = null;
                  signInPasswordRef.current.value = null;
                  setLoginErrorMessage("");
                }}
                className="text-white ml-2 hover:text-green-500 transition-all cursor-pointer  "
              >
                Sign up now
              </span>
            </p>
          </div>
        ) : (
          <div>
            <h1 className=" font-semibold text-3xl mb-8">Create Account</h1>
            <form className="max-w-[350px] mx-auto">
              <input
                ref={signUpEmailRef}
                required
                type="text"
                placeholder="Enter email address"
                className="h-12 w-full outline-none px-5 mb-5 bg-[#111b21] border-b-2 border-opacity-0 focus:border-opacity-100 border-green-500 rounded "
              />
              <input
                ref={signUpPasswordRef}
                required
                type="password"
                placeholder="Enter a new password"
                className="h-12 w-full outline-none px-5 mb-5 bg-[#111b21] border-b-2 border-opacity-0 focus:border-opacity-100 border-green-500 rounded "
              />

              <p className="my-2 text-sm text-red-500">{signUpErrorMessage}</p>

              <button
                className="bg-[#46913d] text-white hover:bg-[#35742e] w-full p-3 border-0 hover:border-0 outline-none transition-all rounded-md active:scale-95"
                variant="outlined"
                onClick={signupHandler}
              >
                Sign up
              </button>
            </form>
            <p className="mt-10 text-gray-500 ">
              Already have an account?
              <span
                onClick={() => {
                  setIsNewUser(false);
                  signUpEmailRef.current.value = null;
                  signUpPasswordRef.current.value = null;
                  setSignUpErrorMessage("");
                }}
                className="text-white ml-2 hover:text-green-500 transition-all inline-block cursor-pointer"
              >
                Sign in
              </span>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Auth;
