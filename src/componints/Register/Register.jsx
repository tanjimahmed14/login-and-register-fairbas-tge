import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../fairbase/fairbase.config";
import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
  const [registerError, setRegisterError] = useState("");
  const [registerSucces, setRegisterSucces] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handelRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const accept = e.target.termux.checked;
    console.log("this from is submit",name, email, password, accept);

    if (password.length < 6) {
      setRegisterError("Password should be at least 6 characters");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegisterError(
        "Password should be at least one upparcase and lowercase"
      );
      return;
    } else if (!accept){
      setRegisterError('Accept the termus and condition');/* ckecked box er kaj */
      return;
    }

    // reset
    setRegisterSucces("");
    setRegisterError("");

    // create email and password
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setRegisterSucces("This user is valid");

        // update profile name 
        updateProfile(user, {
          displayName: name,
          photoURL: "https://example.com/jane-q-user/profile.jpg"
        })
        .then(() => {
          console.log('create your name ')
        })
        .catch(error => {
          console.error(error)
        })


        // sent email verification
        sendEmailVerification(user)
        .then(() => {
          alert('Plese chek your email')
        })
      })
      .catch((error) => {
        console.error(error);
        setRegisterError(error.message);
      });
  };

  return (
    <div className="bg-slate-200 mt-10 p-10 rounded-xl">
      <h1 className="text-3xl mb-8 text-center">This is register page</h1>
      <div className=" w-3/4 mx-auto">
        <form onSubmit={handelRegister}>
          <input
            className="w-full mb-2 px-2 py-2 rounded-lg"
            type="text"
            placeholder="Please type your name"
            name="name"
            id=""
            required
          />
          <br />
          <input
            className="w-full mb-2 px-2 py-2 rounded-lg"
            type="email"
            placeholder="Please type your email"
            name="email"
            id=""
            required
          />
          <br />
          <div className=" relative">
            <input
              className="w-full mb-2 px-2 py-2 rounded-lg"
              placeholder="Type your password"
              type={showPassword ? "text" : "password"}
              name="password"
              id=""
              required
            />
            <span
              className="absolute top-3 right-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}
            </span>
          </div>
          <div className="my-2 ">
            <input type="checkbox" name="termux" id="" />
            <label className="ml-2 font-normal" htmlFor="termux">
              Accept your <a href="">terms and condition</a>
            </label>
          </div>
          <input
            className="btn btn-secondary w-full text-base"
            type="submit"
            value="Login"
          />
        </form>
        <div>
        <p>I have a account, <Link to='/login'><a className="hover:underline mt-2">Login</a></Link></p>
      </div>
        {registerError && <p className="text-red-700 mt-2">{registerError}</p>}
        {registerSucces && (
          <p className="text-green-600 mt-2">{registerSucces}</p>
        )}
      </div>
      
    </div>
  );
};

export default Register;
