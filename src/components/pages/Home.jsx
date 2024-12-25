import Layout from "./Layout";

import { Swiper, SwiperSlide } from "swiper/react"; //Import Swiper JS
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css"; //Import Swiper styles
import "swiper/css/navigation";
import "./swiper-custom.css"; //Import custom CSS for Swiper
import Swal from "sweetalert2";
import firebaseAppConfig from "../../config/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, query, where, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { FaCartPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";

const auth = getAuth(firebaseAppConfig)
const db = getFirestore(firebaseAppConfig) //firebase connection setup

const Home = () => {
  const navigate = useNavigate()
  const [userId, setUserId] = useState('')
  const [session, setSession] = useState(null)
  const [products, setProducts] = useState([])
  const [cartDocId, setCartDocId] = useState(null)

  // const products = [
  //   {
  //     title:
  //       "DUDEME Java Developer T-Shirt, 100% Cotton T-Shirts for Programmer, Coding, Developer, Software Mens, Round Neck T Shirts for Women, Half Sleeve Tshirt for Men",
  //     description:
  //       "Huge Variety: Check out over 1500 different designs made for Geekish men t shirt for boys and girls. Dudeme is the top choice in India for awesome t shirt for men, offering tons of options.Ultimate Performance: Whether you're hitting the gym or lounging at home, our mens t-shirt for men cotton offer superior breathability and flexibility for maximum performance during summer",
  //     price: 1000,
  //     discount: 40,
  //     image: "/Images/products/a.jpg",
  //   },
  //   {
  //     title:
  //       "DUDEME Java Developer T-Shirt, 100% Cotton T-Shirts for Programmer, Coding, Developer, Software Mens, Round Neck T Shirts for Women, Half Sleeve Tshirt for Men",
  //     description:
  //       "Huge Variety: Check out over 1500 different designs made for Geekish men t shirt for boys and girls. Dudeme is the top choice in India for awesome t shirt for men, offering tons of options.Ultimate Performance: Whether you're hitting the gym or lounging at home, our mens t-shirt for men cotton offer superior breathability and flexibility for maximum performance during summer",
  //     price: 1000,
  //     discount: 40,
  //     image: "/Images/products/b.jpg",
  //   },
  //   {
  //     title:
  //       "DUDEME Java Developer T-Shirt, 100% Cotton T-Shirts for Programmer, Coding, Developer, Software Mens, Round Neck T Shirts for Women, Half Sleeve Tshirt for Men",
  //     description:
  //       "Huge Variety: Check out over 1500 different designs made for Geekish men t shirt for boys and girls. Dudeme is the top choice in India for awesome t shirt for men, offering tons of options.Ultimate Performance: Whether you're hitting the gym or lounging at home, our mens t-shirt for men cotton offer superior breathability and flexibility for maximum performance during summer",
  //     price: 1000,
  //     discount: 40,
  //     image: "/Images/products/c.jpg",
  //   },
  //   {
  //     title:
  //       "DUDEME Java Developer T-Shirt, 100% Cotton T-Shirts for Programmer, Coding, Developer, Software Mens, Round Neck T Shirts for Women, Half Sleeve Tshirt for Men",
  //     description:
  //       "Huge Variety: Check out over 1500 different designs made for Geekish men t shirt for boys and girls. Dudeme is the top choice in India for awesome t shirt for men, offering tons of options.Ultimate Performance: Whether you're hitting the gym or lounging at home, our mens t-shirt for men cotton offer superior breathability and flexibility for maximum performance during summer",
  //     price: 1000,
  //     discount: 40,
  //     image: "/Images/products/d.jpg",
  //   },
  //   {
  //     title:
  //       "DUDEME Java Developer T-Shirt, 100% Cotton T-Shirts for Programmer, Coding, Developer, Software Mens, Round Neck T Shirts for Women, Half Sleeve Tshirt for Men",
  //     description:
  //       "Huge Variety: Check out over 1500 different designs made for Geekish men t shirt for boys and girls. Dudeme is the top choice in India for awesome t shirt for men, offering tons of options.Ultimate Performance: Whether you're hitting the gym or lounging at home, our mens t-shirt for men cotton offer superior breathability and flexibility for maximum performance during summer",
  //     price: 1000,
  //     discount: 40,
  //     image: "/Images/products/e.jpg",
  //   },
  //   {
  //     title:
  //       "DUDEME Java Developer T-Shirt, 100% Cotton T-Shirts for Programmer, Coding, Developer, Software Mens, Round Neck T Shirts for Women, Half Sleeve Tshirt for Men",
  //     description:
  //       "Huge Variety: Check out over 1500 different designs made for Geekish men t shirt for boys and girls. Dudeme is the top choice in India for awesome t shirt for men, offering tons of options.Ultimate Performance: Whether you're hitting the gym or lounging at home, our mens t-shirt for men cotton offer superior breathability and flexibility for maximum performance during summer",
  //     price: 1000,
  //     discount: 40,
  //     image: "/Images/products/f.jpg",
  //   },
  //   {
  //     title:
  //       "DUDEME Java Developer T-Shirt, 100% Cotton T-Shirts for Programmer, Coding, Developer, Software Mens, Round Neck T Shirts for Women, Half Sleeve Tshirt for Men",
  //     description:
  //       "Huge Variety: Check out over 1500 different designs made for Geekish men t shirt for boys and girls. Dudeme is the top choice in India for awesome t shirt for men, offering tons of options.Ultimate Performance: Whether you're hitting the gym or lounging at home, our mens t-shirt for men cotton offer superior breathability and flexibility for maximum performance during summer",
  //     price: 1000,
  //     discount: 40,
  //     image: "/Images/products/g.jpg",
  //   },
  //   {
  //     title:
  //       "DUDEME Java Developer T-Shirt, 100% Cotton T-Shirts for Programmer, Coding, Developer, Software Mens, Round Neck T Shirts for Women, Half Sleeve Tshirt for Men",
  //     description:
  //       "Huge Variety: Check out over 1500 different designs made for Geekish men t shirt for boys and girls. Dudeme is the top choice in India for awesome t shirt for men, offering tons of options.Ultimate Performance: Whether you're hitting the gym or lounging at home, our mens t-shirt for men cotton offer superior breathability and flexibility for maximum performance during summer",
  //     price: 1000,
  //     discount: 40,
  //     image: "/Images/products/i.jpg",
  //   },
  //   {
  //     title:
  //       "DUDEME Java Developer T-Shirt, 100% Cotton T-Shirts for Programmer, Coding, Developer, Software Mens, Round Neck T Shirts for Women, Half Sleeve Tshirt for Men",
  //     description:
  //       "Huge Variety: Check out over 1500 different designs made for Geekish men t shirt for boys and girls. Dudeme is the top choice in India for awesome t shirt for men, offering tons of options.Ultimate Performance: Whether you're hitting the gym or lounging at home, our mens t-shirt for men cotton offer superior breathability and flexibility for maximum performance during summer",
  //     price: 1000,
  //     discount: 40,
  //     image: "/Images/products/j.jpg",
  //   },
  // ];

  //! Fetching all products from DB
  useEffect(()=>{
    const allProducts = async() => {
      const snapshot = await getDocs(collection(db, "products"));
      const temp = [];
      snapshot.forEach((doc) => {
        const docFile = doc.data();
        docFile.productId = doc.id;
        temp.push(docFile)
      })
      setProducts(temp);
    }
    allProducts()
  },[])

  async function addToCartBtn(item) {
    try {
      //checking if user is login then add to cart, otherwise login first
      if (session) {
        //? Searching is any cart is alloted to user or not
        const col = collection(db, "carts");
        const q = query(col, where("userId", "==", session.uid));
        const snapshot = await getDocs(q);
        let temp = [];
        let isCartAlloted = false
        snapshot.forEach((doc) => {
          const document = doc.data();
          document.itemId = doc.id // also added itemId with item details to perform other operation like delete from cart
          setCartDocId(doc.id)
          temp.push(document);
          isCartAlloted = true;
        })

        //? If any CartId is alloted to user then otherwise new cart doc will create
        if(isCartAlloted){
          let cartItems = temp[0].cartItems;
          cartItems.push(item.productId)
          let userCartId = temp[0].itemId;
          const ref = doc(db, "carts", userCartId)
          setDoc(ref, {cartItems: cartItems}, {merge: true})
        }
        else{
          item.userId = userId;
          const createCart = {
            userId: userId,
            cartItems: [item.productId]
          }
          await addDoc(collection(db, "carts"), createCart);
          console.log("No cart alloted to user");
        }

        Swal.fire({
          icon: "success",
          title: "Item Added To Cart",
        });

      } else {
        navigate("/login");
      }

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: `${error.message}`,
      });
      console.log(error.message);
    }
  }

  async function buyNowBtn(item) {
    try {
      //checking if user is login then add to cart, otherwise login first
      if (session) {
        //? Searching is any cart is alloted to user or not
        const col = collection(db, "carts");
        const q = query(col, where("userId", "==", session.uid));
        const snapshot = await getDocs(q);
        let temp = [];
        let isCartAlloted = false
        snapshot.forEach((doc) => {
          const document = doc.data();
          document.itemId = doc.id // also added itemId with item details to perform other operation like delete from cart
          setCartDocId(doc.id)
          temp.push(document);
          isCartAlloted = true;
        })

        //? If any CartId is alloted to user then otherwise new cart doc will create
        if(isCartAlloted){
          let cartItems = temp[0].cartItems;
          cartItems.push(item.productId)
          let userCartId = temp[0].itemId;
          const ref = doc(db, "carts", userCartId)
          setDoc(ref, {cartItems: cartItems}, {merge: true})
        }
        else{
          item.userId = userId;
          const createCart = {
            userId: userId,
            cartItems: [item.productId]
          }
          await addDoc(collection(db, "carts"), createCart);
          console.log("No cart alloted to user");
        }

        setTimeout(()=> {
          navigate("/cart")
        }, 500)

      } else {
        navigate("/login");
      }

    } catch (error) {
      console.log(`Failed to Buy Now, Error=> ${error.message}`);
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        setSession(user);
      } else {
        setSession(null);
      }
    });
  }, []);

  return (
    <Layout>
      {/* Swiper Image BANNER */}
      <Swiper
        navigation={true}
        modules={[Navigation, Autoplay]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        speed={2000}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            src="/Images/swiperImg/swip1.jpg"
            alt="Swipper Banner Image"
            className="w-full"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/Images/swiperImg/swip2.png"
            alt="Swipper Banner Image"
            className="w-full"
          />
        </SwiperSlide>
      </Swiper>

      {/* Main Body */}
      <main>
        <div className="max-w-[1280px] m-auto">
          <div className="text-center space-y-2 mb-8">
            <h2 className=" text-2xl font-bold">Latest Products</h2>
            <p className="m-auto md:w-3/4 md:text-lg text-[10px] px-8">
              The success of your new product press release getting published in
              the news can often decide on the success of your product/sales and
              can prove key to your PR and marketing strategy.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-10 md:px-20 px-8">
            {products.map((item, index) => (
              <div
                key={index}
                className="shadow-lg rounded-xl overflow-hidden space-y-3  hover:scale-105 transition-all duration-300"
              >
                <img
                  src={item.imgUrl ? item.imgUrl : "/Images/products/noimage.png"}
                  alt="Product Image"
                  className=" w-full h-[300px] min-[200px]:object-contain md:object-cover "
                />
                <h3 className="font-semibold capitalize">{item.title.slice(0, 50)}...</h3>
                <div className="flex gap-2">
                  <span className="font-semibold">
                    ₹{item.price - (item.price * item.discount) / 100}
                  </span>
                  <del className="opacity-60">{item.price}</del>
                  <span>({item.discount}% off)</span>
                </div>
                <div className="relative">
                  <button className="bg-green-400 rounded-full p-3 absolute -top-6 right-3 hover:bg-green-500 hover:text-white" onClick={() => addToCartBtn(item)}>
                    <FaCartPlus className="text-2xl" />
                  </button>
                  <button className="w-full py-3 bg-[#FD5C36] text-xl font-semibold text-white hover:bg-green-500 transition-all duration-200" onClick={() => buyNowBtn(item)}>
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Home;
