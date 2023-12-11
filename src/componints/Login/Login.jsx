import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../fairbase/fairbase.config";
import { useRef, useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  const [loged, setLoged] = useState("");
  const [logError, setLogError] = useState("");
  const [passwrdShow, setpasswordShow] = useState(false);
  const emailRef = useRef(null);

  const handelLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    console.log(email, password);

    setLogError("");
    setLoged("");
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
        setLoged("User is login this page");
      })
      .catch((error) => {
        console.error(error);
        setLogError("Please provide your valid password");
      });
  }
  
  const handelresetPassword = () => {
    const email = emailRef.current.value;
    setLogError("");
    if(!email){
      console.log('Please provide your email addresh');
      setLogError('Please provide your email addresh');
      return;
    }
    console.log('Reset password', email);
    sendPasswordResetEmail(auth, email)
    .then(() => {
      alert('Plese chek your email')
    })
    .catch((error) => {
      console.log(error);
    } )
}
  return (
    <div className="bg-slate-200 mt-10 p-10 rounded-xl">
      <h1 className="text-3xl mb-8 text-center">This is login page</h1>
      <div className=" w-3/4 mx-auto">
        <form onSubmit={handelLogin}>
          <input
            className="w-full mb-2 px-2 py-2 rounded-lg"
            type="email"
            ref={emailRef}
            placeholder="Please type your email"
            name="email"
            id=""
            required
          />
          <br />
          <div className="relative">
            <input
              className="w-full mb-2 px-2 py-2 rounded-lg"
              placeholder="Type your password"
              type={passwrdShow ? "text" : "password"}
              name="password"
              id=""
              required
            />
            <span
              className="absolute top-3 right-3"
              onClick={() => setpasswordShow(!passwrdShow)}
            >
              {" "}
              {passwrdShow ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}{" "}
            </span>
          </div>
          <label className="label">
            <a
              onClick={handelresetPassword}
              className="label-text-alt link link-hover"
            >
              Forgot password?
            </a>
          </label>
          <br />
          <input
            className="btn btn-secondary w-full text-base"
            type="submit"
            value="Login"
          />
        </form>
        <div>
          <p>
            You your have no accout? Please{" "}
            <Link to="/register">
              <a className="hover:underline">Register account</a>
            </Link>
          </p>
        </div>
        <div className="mt-1">
          {loged && <p className="text-green-600">{loged}</p>}
          {logError && <p className="text-red-600">{logError}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
