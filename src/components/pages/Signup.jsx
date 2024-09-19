import { useState } from "react";
import { FaUserEdit, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import 'animate.css'

//! Firebase Import
import firebaseAppConfig from "../../config/firebase";
import { getAuth } from "firebase/auth";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const auth = getAuth(firebaseAppConfig);

const Signup = () => {
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState("password");
  const [formValue, setformValue] = useState({
    fullName: "",
    emailid: "",
    password: "",
  });
  const [formSubmitError, setFormSubmitError] = useState(null);
  const [loaderActive, setLoaderActive] = useState(false);

  function handleFormValueChange(event) {
    // console.log(event.target.value);
    setFormSubmitError(null);
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  }

  async function submitForm(event) {
    try {
      event.preventDefault();
      setLoaderActive(true);
      await createUserWithEmailAndPassword(
        auth,
        formValue.emailid,
        formValue.password
      );
      await updateProfile(auth.currentUser, {displayName: formValue.fullName})
      navigate("/"); //after successful signup redirect to home page
      
    } catch (error) {
      console.log("Error While submitting signup form =>", error);
      setFormSubmitError(error.message);
    } finally {
      setLoaderActive(false);
    }
  }

  return (
    <div className="animate__animated animate__fadeIn">
      <div className="max-w-[1280px] mx-auto grid md:grid-cols-2">
        <div className=" overflow-hidden">
          <img
            src="/Images/signup/signup-vector.jpg"
            alt="Happy Shopping vector"
            className="w-full md:h-full h-[250px] object-cover "
          />
        </div>
        <main className="md:px-28 px-6 md:mt-14 mt-4">
          <h1 className="text-3xl font-bold text-[#FD5C36] flex gap-4">
            New User <FaUserEdit />
          </h1>
          <p>Create your account to start shopping</p>
          <form
            className="flex flex-col md:mt-8 mt-6 md:gap-2"
            onSubmit={submitForm}
          >
            <label htmlFor="fullName" className="font-semibold text-lg">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              className="p-2 rounded focus:outline-[#FD5C36] border-2"
              onChange={handleFormValueChange}
            />

            <label htmlFor="emailid" className="mt-2 font-semibold text-lg">
              Email
            </label>
            <input
              type="email"
              id="emailid"
              name="emailid"
              required
              className="p-2 rounded focus:outline-[#FD5C36] border-2"
              onChange={handleFormValueChange}
            />

            <div className="flex flex-col gap-2 relative">
              <label htmlFor="password" className="mt-2 font-semibold text-lg">
                Password
              </label>
              <input
                type={passwordType}
                id="password"
                name="password"
                required
                className="p-2 rounded focus:outline-[#FD5C36] border-2"
                onChange={handleFormValueChange}
              />
              <button
                type="button"
                onClick={() =>
                  passwordType === "password"
                    ? setPasswordType("text")
                    : setPasswordType("password")
                }
                className="absolute right-2 bottom-1 hover:rounded-full p-2 hover:text-white hover:bg-[#FD5C36] transition-all duration-300"
              >
                {passwordType === "password" ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            {loaderActive ? (
              <ColorRing
                visible={true}
                height="60"
                width="60"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
              />
            ) : (
              <input
                type="submit"
                value="Submit"
                className="p-2 bg-[#FD5C36] md:mt-5 mt-3 w-32 font-semibold text-lg rounded-full hover:bg-[#fd3636] hover:text-white transition-all duration-300 cursor-pointer"
              />
            )}
          </form>

          {/* Form Submit Error Message */}
          {formSubmitError && (
            <div className="bg-rose-300 rounded py-1 px-2 mt-2">
              <p>{formSubmitError}</p>
            </div>
          )}

          <p className="flex gap-2 mt-3">
            Already have an account ?
            <Link to="/login" className="text-blue-600 font-semibold">
              Login
            </Link>
          </p>
        </main>
      </div>
    </div>
  );
};

export default Signup;
