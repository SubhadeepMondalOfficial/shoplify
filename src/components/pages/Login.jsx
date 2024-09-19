import { useState } from "react";
import { FaUserEdit, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import firebaseAppConfig from "../../config/firebase";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { ColorRing } from "react-loader-spinner";
import 'animate.css'

const auth = getAuth(firebaseAppConfig);

const Login = () => {
  const [passwordType, setPasswordType] = useState("password");
  const [formData, setFormData] = useState({ emailid: "", password: "" });
  const [loginError, setLoginError] = useState(null);
  const [loaderActive, setLoaderActive] = useState(false);
  const navigate = useNavigate();

  async function handleFormSubmit(event) {
    try {
      event.preventDefault();
      setLoaderActive(true);
      const user = await signInWithEmailAndPassword(
        auth,
        formData.emailid,
        formData.password
      );
      // console.log("user login =>", user);
      navigate("/");
    } catch (error) {
      // console.log("Failed To Login, Error =>", error);
      setLoaderActive(false);
      setLoginError("Wrong Email or Password");
    }
  }

  function handleFormData(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    setLoginError(null);
  }

  return (
    <div className="animate__animated animate__fadeIn">
      <div className="max-w-[1280px] mx-auto grid md:grid-cols-2">
        <div className=" overflow-hidden">
          <img
            src="/Images/login/login-vector.jpg"
            alt="Happy Shopping vector"
            className="w-full md:h-full h-[250px] object-cover "
          />
        </div>
        <main className="md:px-28 px-6 md:mt-14 mt-4">
          <h1 className="text-3xl font-bold text-[#FD5C36] flex gap-4">
            Login <FaUserEdit />
          </h1>
          <p>Welcome Back !!! Now Enter profile details to login</p>
          <form
            className="flex flex-col md:mt-8 mt-6 md:gap-2"
            onSubmit={handleFormSubmit}
          >
            <label htmlFor="emailid" className="md:mt-2 font-semibold text-lg">
              Email
            </label>
            <input
              onChange={handleFormData}
              type="email"
              id="emailid"
              name="emailid"
              required
              className="p-2 rounded focus:outline-[#FD5C36] border-2"
            />

            <div className="flex flex-col gap-2 relative">
              <label htmlFor="password" className="mt-2 font-semibold text-lg">
                Password
              </label>
              <input
                onChange={handleFormData}
                type={passwordType}
                id="password"
                name="password"
                required
                className="p-2 rounded focus:outline-[#FD5C36] border-2"
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
                className="p-2 bg-[#FD5C36] md:mt-5 mt-4 w-32 font-semibold text-lg rounded-full hover:bg-[#fd3636] hover:text-white transition-all duration-300 cursor-pointer text-white md:text-black"
              />
            )}
          </form>
          
          {loginError && (
            <div className="bg-rose-300 rounded py-1 px-2 mt-2">
              <p>{loginError}</p>
            </div>
          )}

          <p className="flex gap-2 mt-3">
            Don`t have an account ?
            <Link to="/signup" className="text-blue-600 font-semibold">
              Register Now
            </Link>
          </p>
        </main>
      </div>
    </div>
  );
};

export default Login;
