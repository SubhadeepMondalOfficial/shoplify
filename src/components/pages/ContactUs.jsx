import { useState } from "react";
import { FaHeadphones } from "react-icons/fa";
import Layout from "./Layout"

const ContactUs = () => {
    const [passwordType, setPasswordType] = useState("password");

    return(
        <Layout>
            <div>
      <div className="max-w-[1280px] mx-auto grid md:grid-cols-2">
        <div className=" overflow-hidden">
          <img
            src="/Images/contactus-vector.svg"
            alt="Happy Shopping vector"
            className="w-full md:h-full h-[250px] object-cover "
          />
        </div>
        <main className="md:px-28 px-6 md:mt-14 mt-4">
          <h1 className="text-3xl font-bold text-[#FD5C36] flex gap-4">
            Get In Touch <FaHeadphones />

          </h1>
          <p>We`re here to help you, every step of the way.</p>
          <form className="flex flex-col md:mt-8 mt-6 md:gap-2">
            <label htmlFor="fullName" className="font-semibold text-lg">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="p-2 rounded focus:outline-[#FD5C36] border-2"
            />

            <label htmlFor="emailid" className="mt-2 font-semibold text-lg">
              Email
            </label>
            <input
              type="email"
              id="emailid"
              name="emailid"
              className="p-2 rounded focus:outline-[#FD5C36] border-2"
            />

            <label htmlFor="message" className="mt-2 font-semibold text-lg">Message</label>
            <textarea name="message" id="message" rows='4' className="p-2 rounded focus:outline-[#FD5C36] border-2"></textarea>

            <input
              type="submit"
              value="Get Quote"
              className="p-2 bg-[#FD5C36] md:mt-5 mt-3 w-32 font-semibold text-lg rounded-full hover:bg-[#fd3636] hover:text-white transition-all duration-300 cursor-pointer"
            />
          </form>
        </main>
      </div>
    </div>
        </Layout>
    )
}

export default ContactUs