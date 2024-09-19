import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { RiMenu3Line } from "react-icons/ri";
import { AiFillHome } from "react-icons/ai";
import { BsBoxSeamFill } from "react-icons/bs";
import { TbCategoryFilled } from "react-icons/tb";
import { FaPhoneAlt, FaUserEdit, FaUser, FaShoppingCart } from "react-icons/fa";
import { RiLoginCircleFill, RiLogoutCircleRFill, RiUserAddFill } from "react-icons/ri";
import 'animate.css';

//! firebase import
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import firebaseAppConfig from "../../config/firebase";

const auth = getAuth(firebaseAppConfig);

const Layout = ({ children }) => {
  const [sideMenu, setSideMenu] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [profileMenuActive, setProfileMenuActive] = useState(false);
  const profileMenuRef = useRef(null);
  const location = useLocation();

  const NavMenus = [
    {
      label: "Home",
      href: "/",
      icon: <AiFillHome />,
    },
    {
      label: "Products",
      href: "/products",
      icon: <BsBoxSeamFill />,
    },
    {
      label: "Category",
      href: "/category",
      icon: <TbCategoryFilled />,
    },
    {
      label: "Contact Us",
      href: "/contact-us",
      icon: <FaPhoneAlt />,
    },
  ];

  // to close the profile menu from outlide click when the user open it
  const handleClickOutside = (event) => {
    if (
      profileMenuRef.current &&
      !profileMenuRef.current.contains(event.target)
    ) {
      setProfileMenuActive(false);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // if user login then user details will get from onAuthStateChanged
      if (user) {
        setUserDetails(user);
        // console.log('user =>', user);
      } else {
        setUserDetails(null);
      }
    });
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="animate__animated animate__fadeIn">
      {/* NavBar */}
      <nav className="shadow-lg bg-[#FD5C36] text-[#040505] px-3 sticky top-0 left-0 z-10">
        <div className="max-w-[1280px] m-auto flex justify-between items-center flex-wrap">
          <Link to="/">
            <img
              src="/Images/logo/shoplifyLogo.png"
              alt="Brand Logo"
              className="w-[150px] h-auto"
            />
          </Link>

          {/* Menu for Large Device */}
          <div className="md:flex gap-6 flex-wrap hidden">
            {NavMenus.map((menu, index) => (
              <div key={index} className="flex justify-center items-center">
                <Link
                  to={menu.href}
                  className="px-3 py-2 rounded text-xl font-semibold hover:bg-[#040505] hover:text-white transition-all duration-300"
                >
                  {menu.label}
                </Link>
              </div>
            ))}

            {/* Checking is user logged In */}
            {userDetails ? (
              <button
                className="relative"
                onClick={() => setProfileMenuActive(!profileMenuActive)}
                ref={profileMenuRef}
              >
                <img
                  src={userDetails.photoURL ? userDetails.photoURL : "/Images/avtar.avif"}
                  className="w-[40px] h-[40px] rounded-full"
                  alt=""
                />
                {profileMenuActive && (
                  <div className="w-44 absolute top-11 right-2 shadow-lg bg-[#fc8267] flex flex-col items-start px-4 py-3 text-lg font-semibold">
                    <Link
                      to="/profile"
                      className="py-2 flex items-center gap-2 w-full"
                    >
                      <FaUser />
                      My Profile
                    </Link>
                    <Link
                      to="/cart"
                      className="py-2 flex items-center gap-2 w-full"
                    >
                      <FaShoppingCart />
                      Cart
                    </Link>
                    <Link className="py-2 flex items-center gap-2 w-full" onClick={() => signOut(auth)}>
                      <RiLogoutCircleRFill /> Logout
                    </Link>
                  </div>
                )}
              </button>
            ) : (
              <>
                <div className="flex justify-center items-center">
                  <Link
                    to="/login"
                    className="px-3 py-2 rounded text-xl font-semibold hover:bg-[#040505] hover:text-white transition-all duration-300"
                  >
                    Login
                  </Link>
                </div>
                <div className="flex justify-center items-center">
                  <Link
                    to="/signup"
                    className="px-3 py-2 rounded text-xl font-semibold bg-[#040505] text-white transition-all duration-300"
                  >
                    Signup
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* Menu for Small Device */}
          <div className="md:hidden">
            <button className="" onClick={() => setSideMenu(!sideMenu)}>
              <RiMenu3Line className="text-3xl" />
            </button>

            <aside
              className="fixed left-0 top-0 h-screen bg-[#FD5C36] transition-all duration-300 overflow-hidden py-1"
              style={sideMenu ? { width: "230px" } : { width: 0 }}
            >
              <div className="flex flex-col w-full gap-2">
                {NavMenus.map((menu, index) => (
                  <Link
                    to={menu.href}
                    key={index}
                    className="flex gap-3 items-center py-3 px-5 text-xl font-semibold"
                    style={{
                      background:
                        location.pathname === menu.href
                          ? "#040505"
                          : "transparent",
                      color:
                        location.pathname === menu.href ? "white" : "##040505",
                    }}
                  >
                    {menu.icon}
                    {menu.label}
                  </Link>
                ))}
              </div>

              {/* Checking is user Logged In */}
              {userDetails ? (
                <button className="font-semibold flex items-center gap-3 py-3 px-5 text-xl w-full" onClick={() => signOut(auth)}><RiLogoutCircleRFill />Logout</button>
              ) : (
                <div className="">
                  <Link
                    to="/login"
                    className="flex gap-3 items-center py-3 px-5 text-xl font-semibold"
                  >
                    <FaUserEdit className="text-2xl" />
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="flex gap-3 items-center py-3 px-5 text-xl font-semibold"
                  >
                    <RiUserAddFill className="text-2xl" />
                    Signup
                  </Link>
                </div>
              )}
            </aside>
          </div>
        </div>
      </nav>

      {/* Main Body */}
      <div>{children}</div>

      {/* Footer */}
      <footer className="shadow-lg bg-[#FD5C36] text-white mt-10 py-6">
        <div className="max-w-[1280px] m-auto grid md:grid-cols-6 gap-10 md:gap-0 ">
          <div className="flex flex-col gap-2 px-3">
            <h3 className="font-semibold text-xl mb-2">Website Links</h3>
            {NavMenus.map((menu, index) => (
              <div key={index}>
                <Link to={menu.href} className="hover:text-[#040505]">
                  {menu.label}
                </Link>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2 px-3">
            <h3 className="font-semibold text-xl mb-2">Follow Us</h3>
            <Link to={"/"} className="hover:text-[#040505]">
              Facebook
            </Link>
            <Link to={"/"} className="hover:text-[#040505]">
              Instagram
            </Link>
            <Link to={"/"} className="hover:text-[#040505]">
              Twitter
            </Link>
            <Link to={"/"} className="hover:text-[#040505]">
              Linkedin
            </Link>
            <Link to={"/"} className="hover:text-[#040505]">
              YouTube
            </Link>
          </div>

          <div className="px-3 col-span-2 space-y-5">
            <h3 className="font-semibold text-xl mb-4">Brand Details</h3>
            <p>
              Each of these tangible elements contributes to the greater sum and
              directly influences your brand perception. Ultimately your brand
              identity is established and represented mainly through your visual
              identity and all of the different elements that represent it.{" "}
            </p>
            <img
              src="/Images/logo/shoplifyLogo.png"
              alt="Brand Logo"
              className="w-[150px] h-auto"
            />
          </div>

          <div className="px-3 col-span-2">
            <h3 className="font-semibold text-xl mb-4">Contact Us</h3>
            <form className="space-y-3">
              <input
                required
                name="fullname"
                className="bg-white w-full rounded p-3"
                placeholder="Your name"
              />

              <input
                required
                type="email"
                name="email"
                className="bg-white w-full rounded p-3"
                placeholder="Enter Email Id"
              />

              <textarea
                required
                name="message"
                className="bg-white w-full rounded p-3"
                placeholder="Message"
                rows={3}
              />
              <button className="bg-[#040505] text-white py-3 px-6 rounded">
                Submit
              </button>
            </form>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
