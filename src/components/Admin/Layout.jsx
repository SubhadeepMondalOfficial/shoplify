import { useEffect, useState } from "react";
import "remixicon/fonts/remixicon.css";
import { Link, useLocation } from "react-router-dom";

function Admin({ children }) {
  const [sideBar, setSideBar] = useState(280);
  const [accountMenu, setAccountMenu] = useState(false);
  const location = useLocation();
  const menus = [
    {
      label: "Dashboard",
      link: "/admin/dashboard",
      icon: <i className="ri-dashboard-line mr-2"></i>,
    },
    {
      label: "Customers",
      link: "/admin/customers",
      icon: <i className="ri-user-3-line mr-2"></i>,
    },
    {
      label: "Products",
      link: "/admin/products",
      icon: <i className="ri-shopping-cart-line mr-2"></i>,
    },
    {
      label: "Orders",
      link: "/admin/orders",
      icon: <i className="ri-archive-line mr-2"></i>,
    },
    {
      label: "Payments",
      link: "/admin/payments",
      icon: <i className="ri-money-rupee-circle-line mr-2"></i>,
    },
    {
      label: "Settings",
      link: "/admin/settings",
      icon: <i className="ri-settings-3-line mr-2"></i>,
    },
    {
      label: "Logout",
      link: "/admin/logout",
      icon: <i className="ri-logout-circle-r-line mr-2"></i>,
    },
  ];
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1050) {
        setSideBar(0);
      } else {
        setSideBar(280);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <aside
        style={{ width: sideBar }}
        className="h-screen bg-violet-600 fixed left-0 top-0 transition-all duration-300 ease-linear overflow-hidden"
      >
        <div className=" text-white  text-lg flex flex-col ">
          {menus.map((item, index) => (
            <Link
              to={item.link}
              key={index}
              className="px-6 py-4"
              style={{
                background:
                  location.pathname == item.link ? "#1E3A8A" : "transparent",
              }}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </div>
      </aside>

      <section
        style={{ marginLeft: sideBar }}
        className="transition-all duration-300 ease-linear bg-gray-100 min-h-screen"
      >
        <nav className="bg-white p-6 shadow flex justify-between items-center">
          <div className="flex justify-center items-center gap-6">
            <i
              className="ri-menu-2-fill text-2xl cursor-pointer"
              onClick={() => setSideBar(sideBar === 280 ? 0 : 280)}
            ></i>
            <h2 className="text-2xl font-bold">Shoplify</h2>
          </div>
          <div className="relative">
            <img
              src="/Images/avtar.avif"
              alt="Profile Photo"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() => setAccountMenu(!accountMenu)}
            />
            {accountMenu && (
              <div className="bg-white flex flex-col justify-center items-center gap-1 absolute right-0 top-10 p-6 shadow-lg">
                <p>SubhaDeep Mondal</p>
                <p>subhadeepmondal.dev@gmail.com</p>
                <div className="h-[2px] bg-gray-200 w-full my-3"></div>
                <div className="flex justify-center items-center gap-2">
                  <i className="ri-logout-circle-r-line"></i>
                  <p>Logout</p>
                </div>
              </div>
            )}
          </div>
        </nav>

        <div className="p-6 overflow-x-scroll">{children}</div>
      </section>
    </div>
  );
}

export default Admin;
