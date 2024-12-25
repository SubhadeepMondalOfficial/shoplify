import Layout from "./Layout"
import { RiShoppingCartLine } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import { IoBag } from "react-icons/io5";
import firebaseAppConfig from "../../config/firebase";
import { getFirestore, collection, getDocs, query, where, doc, deleteDoc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const db = getFirestore(firebaseAppConfig)
const auth = getAuth(firebaseAppConfig)

const Cart = () => {
  const navigate = useNavigate()
  const [session, setSession] = useState('');
  const [products, setProducts] = useState([]);
  const [cartDocId, setCartDocId] = useState(null)
  // const [allItemId, setAllItemId] = useState(null)
  const [itemRemove, setItemRemove] = useState(false) //this state is use if any item remove from cart then live update in UI
  const [totalPrice, setTotalPrice] = useState(0);

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
    try {
      const fetchCartItems = async () => {
        if (session) {
          // Finding all product id in Cart of logined user
          const col = collection(db, "carts");
          const q = query(col, where("userId", "==", session.uid));
          const snapshot = await getDocs(q);
          const temp = [];
          snapshot.forEach((doc) => {
            const document = doc.data();
            // document.docId = doc.id // also added itemId with item details to perform other operation like delete from cart
            setCartDocId(doc.id)
            temp.push(document);
            // console.log(document);
          })
          // setProducts(temp);
          let allItemId = temp[0].cartItems
          
          // if any product id present in cart
          if(allItemId){
            const tempProduct = [];
            let tempPrice = 0;
            // According to product id, fetch product details
            for(let i=0; i < allItemId.length; i++){
              const ref =  doc(db, "products",  allItemId[i]);
              const docSnap = await getDoc(ref)
              const item = docSnap.data()
              item.productId = allItemId[i];
              tempProduct.push(item)
              tempPrice += (item.price - (item.price*item.discount/100));
            }
            setProducts(tempProduct);
            setTotalPrice(tempPrice.toFixed(2)); //after decimal to digit only
          }
        }
      };
      fetchCartItems();
    } catch (error) {
      console.log(`Error => ${error.message}`);
    }
  }, [session, itemRemove]);

  const deleteItemFromCart = async (item) => {
    try {
      // Deleting/Removing a Single Value i.e-productId from an Array Field
      const docRef = doc(db, "carts", cartDocId);
      await updateDoc(docRef, {
        cartItems: arrayRemove(item.productId)
      })   

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
                                    <img src={item.imgUrl ? item.imgUrl : "/Images/products/noimage.png"} alt="" className="object-cover w-[160px] h-[150px]"  />
                                </div>
                                <div className="space-y-2">
                                    <h2 className="font-bold">{item.title?.substring(0, 60)}...</h2>
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
                        <h3 className="text-2xl font-semibold">Total: ₹{totalPrice}</h3>
                        <button className="flex gap-2 justify-center items-center px-4 py-2 text-white text-lg bg-[#FD3636] rounded"><IoBag />Buy Now</button>
                    </div>
                </div>
            </main>

        </Layout>
    )
}

export default Cart