import Layout from "./Layout"
import { RiShoppingCartLine } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import { IoBag } from "react-icons/io5";
import firebaseAppConfig from "../../config/firebase";
import { getFirestore, collection, getDocs, query, where, doc, deleteDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const db = getFirestore(firebaseAppConfig)
const auth = getAuth(firebaseAppConfig)

const Cart = () => {
  const navigate = useNavigate()
  const [session, setSession] = useState('');
  const [products, setProducts] = useState([])
  const [itemRemove, setItemRemove] = useState(false) //this state is use if any item remove from cart then live update in UI

  // checking is the user is login if login then get the userId
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // setUserId(user.uid);
        setSession(user);
      } else {
        setSession(null);
        navigate('/login')
      }
    });
  }, []);

  // fetch all the cart items of logined user from db  
  useEffect(() => {
    const fetchCartItems = async () => {
      if (session) {
        const col = collection(db, "carts");
        const q = query(col, where("userId", "==", session.uid));
        const snapshot = await getDocs(q);
        const temp = [];
        snapshot.forEach((doc) => {
          const document = doc.data();
          document.itemId = doc.id // also added itemId with item details to perform other operation like delete from cart
          temp.push(document);
        });
        setProducts(temp);
      }
    };
    fetchCartItems();
  }, [session, itemRemove]);

  const deleteItemFromCart = async (item) => {
    try {
      await deleteDoc(doc(db, "carts", item.itemId))
      Swal.fire({
        icon: 'success',
        title: "Item Removed from Cart",
      })
      setItemRemove(!itemRemove);

      
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: "Failed to Remove Item",
        text: `${error.message}`
      })
    }
  }

    return(
        <Layout>
            <main className="px-5">
                <div className="max-w-[980px] mx-auto px-8 my-10 shadow-xl py-4">
                    <div className="flex items-center text-3xl font-semibold">
                        <RiShoppingCartLine />
                        Cart
                    </div>
                    <div className="w-full h-[1px] bg-slate-200 mt-5 mb-8"></div>
                    {
                        products.map((item, index) => (
                            <div key={index} className="flex flex-col md:flex-row gap-5 mb-10 space-y-3 relative justify-center md:justify-start items-center md:items-start">
                                <div className="">
                                    <img src={item.image} alt="" className="object-cover w-[160px] h-[150px]"  />
                                </div>
                                <div className="space-y-2">
                                    <h2 className="font-bold">{item.title.substring(0, 60)}...</h2>
                                    <div className="space-x-2">
                                        <label className="font-bold">₹{item.price - (item.price*item.discount/100)}</label>
                                        <del className="font-semibold">{item.price}</del>
                                        <span>{item.discount}% Discount</span>
                                    </div>
                                </div>
                                <button className="md:absolute right-3 top-6 text-red-600 text-3xl p-2" onClick={() => deleteItemFromCart(item)} ><MdDeleteForever /></button>
                            </div>
                        ))
                    }

                    <div className="w-full h-[1px] bg-slate-200 mt-5 mb-8"></div>
                    <div className="flex flex-col md:flex-row gap-3 justify-between items-center">
                        <h3 className="text-2xl font-semibold">Total: ₹5,790</h3>
                        <button className="flex gap-2 justify-center items-center px-4 py-2 text-lg bg-[#FD3636] rounded"><IoBag />Buy Now</button>
                    </div>
                </div>
            </main>

        </Layout>
    )
}

export default Cart