import Layout from "./Layout"
import { FaUser, FaSave } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { MdFileUpload } from "react-icons/md";
import { getAuth ,onAuthStateChanged, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, getDocs, query, where, doc, updateDoc } from "firebase/firestore";
import firebaseAppConfig from "../../config/firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";

const auth = getAuth(firebaseAppConfig)
const storage = getStorage()
const db = getFirestore(firebaseAppConfig)

const Profile = () => {
const [session, setSession] = useState(false)
const [addressId, setAddressId] = useState(false)
const navigate = useNavigate()

//!========================== Profile Form =======================================
const [loaderActiveProfile, setLoaderActiveProfile] = useState(false);
const [formValue, setFormValue] = useState({
  fullName: "",
  email: "",
  mobile: "",
  userId: ""
});

function handleFormValue(event) {
  setFormValue({
    ...formValue,
    [event.target.name]: event.target.value,
  });
}

useEffect(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setSession(user);
      console.log("User =>", user);
      setFormValue({
        ...formValue,
        fullName: user.displayName,
        mobile: user.phoneNumber,
      });

      setAddressFormValue({
        ...addressFormValue,
        userId: user.uid,
      })
    } else {
      setSession(false);
      navigate("/login");
    }
  });
}, []);

async function setProfilePicture(event) {
  try {
    const file = event.target.files[0];
    // console.log(file);

    //Upload File to Firebase Storage
    const storageRef = ref(storage, `profilePictures/${Date.now()}`);
    const uploadProfilePic = await uploadBytes(storageRef, file);
    console.log("Profile Picture Uploaded Successfully", uploadProfilePic);

    //After Upload get the image url to update in user's profile
    const imageUrl = await getDownloadURL(uploadProfilePic.ref);
    console.log("Image Url =>", imageUrl);
    await updateProfile(auth.currentUser, { photoURL: imageUrl });
    console.log("Image Url updated Successfully");

    //live update profile pic in UI
    setSession({
      ...session,
      photoURL: imageUrl,
    });
  } catch (error) {
    console.log("Failed To upload Profile Picture ERROR =>", error);
  }
}

async function handleUpdateProfile(event) {
  try {
    event.preventDefault();
    setLoaderActiveProfile(true);
    // console.log(formValue.mobile);
    await updateProfile(auth.currentUser, {
      displayName: formValue.fullName,
      phoneNumber: formValue.mobile,
    });
    setLoaderActiveProfile(false);
    console.log(
      "Profile Details FullName and PhoneNumber Updated Successfully"
    );
  } catch (error) {
    setLoaderActiveProfile(false);
    console.log("Failed to update profile details FullName and PhoneNumber");
  }
}

//! ========================= Delivery Form =================================

const [loaderActiveAddress, setLoaderActiveAddress] = useState(false);
const [addressFormValue, setAddressFormValue] = useState({
    userId: '',
    address: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
})

function handleAddressFormValue(event){
    setAddressFormValue({
        ...addressFormValue,
        [event.target.name]: event.target.value
    })
}

const handleSubmitAddress = async (event) => {
    try {
        event.preventDefault()
        setLoaderActiveAddress(true)
        const createAddress = await addDoc(collection(db, 'addresses'), addressFormValue)
        // console.log("Address Update Successfully =>", updateAddress);
        setLoaderActiveAddress(false)
        // console.log(createAddress.id);
        setAddressId(createAddress.id)
        
    } catch (error) {
        console.log("Failed to Update Address, Error =>", error);
        setLoaderActiveAddress(false)
    }
}

const handleUpdateAddress = async (event) => {
  try {
    event.preventDefault();
    setLoaderActiveAddress(true)
    const ref = doc(db, "addresses", addressId);
    await updateDoc(ref, addressFormValue)
    console.log("Address Updated Successfully");
    
  } catch (error) {
    console.log(`Failed to Update Address, Error=> ${error.message}`);
  }finally{
    setLoaderActiveAddress(false)
  }
}

useEffect(() => {
 async function getAddressDetails(){
   try {
    if(session){
      setAddressFormValue({
        ...addressFormValue,
        userId: session.uid,
      })
      // console.log(session.uid);

      //! Using this process you will get all the addresses irrespective of user
      // const snapshot = await getDocs(collection(db, "addresses"))
      // snapshot.forEach((doc) => {
      //   console.log(doc.data());
      // })

      //! Lets try Query process where we will get the address of that user who is logged-in
      const collectionName = collection(db, "addresses")
      const q = query(collectionName, where("userId", "==", session.uid))
      const snapshot = await getDocs(q)
      snapshot.forEach((doc) => {
        // console.log(doc.data());
        setAddressId(doc.id)
        const userAddress = doc.data()
        setAddressFormValue({
          ...addressFormValue,
          userId: userAddress.userId,
          address: userAddress.address,
          city: userAddress.city,
          state: userAddress.state,
          country: userAddress.country,
          pincode: userAddress.pincode
        })
      })

    }
    
   } catch (error) {
    console.log("Failed to fetch user's address details, ERROR =>", error);
   }
  }
  getAddressDetails()

}, [session])


    return (
      <Layout>
        <section className="px-6">
          <div className="max-w-[880px] mx-auto shadow-lg rounded mt-5 px-4 py-5">
            <div className="flex gap-2 items-center text-2xl font-semibold">
              <FaUser />
              <h1>Profile</h1>
            </div>

            <hr className="h-[2px] bg-slate-200 my-3" />
            <div className="w-[60px] h-[60px] overflow-hidden rounded-full mx-auto relative cursor-pointer mt-4">
              <img
                src={session.photoURL ? session.photoURL : "/Images/avtar.avif"}
                alt=""
                // className="rounded-full mx-auto"
              />
              <input
                type="file"
                name="profileImage"
                id="profileImage"
                onChange={setProfilePicture}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />
              {/* <MdFileUpload className="absolute bottom-0 left-0 bg-slate-300 opacity-0 w-full h-3/6 rounded-b-full hover:opacity-50 hover:transition-all hover:duration-300" /> */}
            </div>

            <form onSubmit={handleUpdateProfile} className="mt-3">
              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col">
                  <label htmlFor="fullName" className="font-semibold">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    onChange={handleFormValue}
                    id="fullName"
                    value={formValue.fullName}
                    className="py-1 px-2 rounded focus:outline-[#FD5C36] border-2"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email" className="font-semibold">
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    onChange={handleFormValue}
                    id="email"
                    value={session.email ? session.email : ""}
                    disabled
                    readOnly
                    className="py-1 px-2 rounded focus:outline-[#FD5C36] border-2"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="mobile" className="font-semibold">
                    Mobile
                  </label>
                  <input
                    type="number"
                    name="mobile"
                    onChange={handleFormValue}
                    id="mobile"
                    value={formValue.mobile}
                    className="py-1 px-2 rounded focus:outline-[#FD5C36] border-2"
                  />
                </div>
                <div></div>
              </div>
              {loaderActiveProfile ? (
                <ColorRing
                  visible={true}
                  height="60"
                  width="60"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={[
                    "#e15b64",
                    "#f47e60",
                    "#f8b26a",
                    "#abbd81",
                    "#849b87",
                  ]}
                />
              ) : (
                <button
                  type="submit"
                  className="flex justify-center items-center gap-2 py-1 px-4 bg-[#FD5C36] md:mt-7 mt-5 font-semibold text-lg rounded-lg hover:bg-[#fd3636] hover:text-white transition-all duration-300 cursor-pointer"
                >
                  <FaSave />
                  Save
                </button>
              )}
            </form>
          </div>

          <div className="max-w-[880px] mx-auto shadow-lg rounded mt-10 px-4 py-5">
            <div className="flex gap-2 items-center text-2xl font-semibold">
              <TbTruckDelivery />
              <h1>Delivery Address</h1>
            </div>

            <hr className="h-[2px] bg-slate-200 my-3" />

            <form onSubmit={addressId? handleUpdateAddress : handleSubmitAddress} className="mt-3">
              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col col-span-2">
                  <label htmlFor="address" className="font-semibold">
                    Address
                  </label>
                  <input
                    type="text"
                    autoComplete="off"
                    name="address"
                    onChange={handleAddressFormValue}
                    value={addressFormValue.address}
                    id="address"
                    className="py-1 px-2 rounded focus:outline-[#FD5C36] border-2 cols"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="city" className="font-semibold">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    onChange={handleAddressFormValue}
                    value={addressFormValue.city}
                    id="city"
                    className="py-1 px-2 rounded focus:outline-[#FD5C36] border-2"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="state" className="font-semibold">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    onChange={handleAddressFormValue}
                    value={addressFormValue.state}
                    id="state"
                    className="py-1 px-2 rounded focus:outline-[#FD5C36] border-2"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="country" className="font-semibold">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    onChange={handleAddressFormValue}
                    value={addressFormValue.country}
                    id="country"
                    className="py-1 px-2 rounded focus:outline-[#FD5C36] border-2"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="pincode" className="font-semibold">
                    Pincode
                  </label>
                  <input
                    type="number"
                    name="pincode"
                    onChange={handleAddressFormValue}
                    value={addressFormValue.pincode}
                    id="pincode"
                    className="py-1 px-2 rounded focus:outline-[#FD5C36] border-2"
                  />
                </div>
              </div>
              {loaderActiveAddress ? (
                <ColorRing
                  visible={true}
                  height="60"
                  width="60"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={[
                    "#e15b64",
                    "#f47e60",
                    "#f8b26a",
                    "#abbd81",
                    "#849b87",
                  ]}
                />
              ) : addressId ? (
                <button
                  type="submit"
                  className="flex justify-center items-center gap-2 py-1 px-4 bg-[#FD5C36] md:mt-7 mt-5 font-semibold text-lg rounded-lg hover:bg-[#fd3636] hover:text-white transition-all duration-300 cursor-pointer"
                >
                  <FaSave />
                  Update
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex justify-center items-center gap-2 py-1 px-4 bg-[#FD5C36] md:mt-7 mt-5 font-semibold text-lg rounded-lg hover:bg-[#fd3636] hover:text-white transition-all duration-300 cursor-pointer"
                >
                  <FaSave />
                  Submit
                </button>
              )}
            </form>
          </div>
        </section>
      </Layout>
    );
}

export default Profile