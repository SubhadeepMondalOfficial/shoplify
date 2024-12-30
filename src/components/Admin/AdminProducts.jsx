import { useState, useRef, useEffect } from "react";
import Layout from "./Layout";
import { IoIosAddCircle } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import firebaseAppConfig from "../../config/firebase";
import { getFirestore, addDoc, collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import fileStorage from "../utils/fileStorage";

const db = getFirestore(firebaseAppConfig)

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [productModal, setProductModal] = useState(false);
  const [changeState, setChangeState] = useState(false)
  const elementProductModal =useRef(null)
  const [confirmationModal, setConfirmationModal] = useState(false)
  const [activeEditProductBtn, setActiveEditProductBtn] = useState(false)
  const emptyModal = {
    title: "",
    description: "",
    price: "",
    discount: ""
  }
  const [productFormData, setProductFormData] = useState(emptyModal)
  const handleProductForm = (event) => {
    const {name, value} = event.target;
    if(name in emptyModal){ //extra layer of cheking name attribute with emptyModal properties
      setProductFormData({
        ...productFormData,
        [name]: value
      })
    }
  }
  const createProduct = async (event) => {
    try {
      event.preventDefault();
      await addDoc(collection(db, 'products'), productFormData);
      handleModalClose();
      setChangeState(!changeState)
      Swal.fire({
        icon: "success",
        title: "Product Added"
      })
      
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: "Failed !",
        text: error.message
      })
    }
  }

  const handleModalClose = () => {
    setProductFormData(emptyModal);
    setActiveEditProductBtn(false);
    const element = elementProductModal.current;
    element.classList.remove("animate__fadeIn");
    element.classList.add("animate__fadeOut");
    element.children[0].classList.add("animate__zoomOut") // selected first child element
    setTimeout(()=>{
      setProductModal(false)
    },500)
  }

  //! Fetching all products
  useEffect(() => {
    try {
      const allProducts = async () => {
        const snapshot = await getDocs(collection(db, "products"));
        const temp = [];
        snapshot.forEach((doc) => {
          const docFile = doc.data()
          docFile.productId = doc.id //adding each product id with docFile
          temp.push(docFile);
        });
        setProducts(temp);
      };
      allProducts();

    } catch (error) {
      console.log("Failed to fetch all products. Error=>", error.message);
    }
  }, [changeState]);

  //! Upload Product Image
  async function uploadProductImage(event,item){
    try {
      const fileDetails = event.target.files[0];
      const url = await fileStorage(fileDetails, `productImages/${Date.now()}`)

      //* After successful img upload then add img-url to that product details in DB
      const productRef = doc(db, 'products', item.productId);
      await updateDoc(productRef, {imgUrl: url});
      setChangeState(!changeState); //after all done refresh the all products for live update in user page
      
    } catch (error) {
      console.log("Failed to Upload Product Image. Error=>", error.message);
    }
  }

  //! Delete Product
  const handleDeleteProduct = async () => {
    try {
      const productId = confirmationModal.productId;
      await deleteDoc(doc(db, 'products', productId));
      setConfirmationModal(false);
      setChangeState(!changeState);
      
    } catch (error) {
      console.log("Failed to delete product. Error=>", error.message);
    }
  }

  //! Edit Product Details
  const openEditProductModal = async (item) => {
    setActiveEditProductBtn(true);
    setProductModal(true);
    setProductFormData(item);
  }
  const handleEditProductDetails = async (event) => {
    event.preventDefault();
    // Update the product details
    try {
      const productRef = doc(db, 'products', productFormData.productId);
      await updateDoc(productRef, productFormData);
      handleModalClose();
      setChangeState(!changeState);
      Swal.fire({
        icon: "success",
        title: "Product Updated"
      })
      
    } catch (error) {
      console.log("Failed to update product details. Error=>", error.message);
    }
  }

  return (
    <Layout>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold mb-4 items-center">Products</h1>
          <button
            className="bg-violet-600 text-white px-4 py-2 rounded flex justify-center items-center gap-2"
            onClick={() => setProductModal(true)}
          >
            <IoIosAddCircle />
            New Product
          </button>
        </div>

        {/* Fetch already listed Products */}
        <main className="grid md:grid-cols-4 gap-6">
          {products.map((item, index) => (
            <div key={index} className=" shadow-lg rounded-xl overflow-hidden">
              <div className="relative">
                <img
                  src={
                    item.imgUrl ? item.imgUrl : "/Images/products/noimage.png"
                  }
                  alt="Product Image"
                  className=" w-full h-[300px] min-[200px]:object-contain md:object-cover "
                />
                <input
                  type="file"
                  name=""
                  id=""
                  className="absolute left-0 top-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={(event) => uploadProductImage(event, item)}
                />
              </div>
              <div className="px-3 pt-2 pb-3">
                <h3 className="font-semibold">{item.title.slice(0, 28)}...</h3>
                {/* <p className="opacity-60">{item.description.slice(0, 100)}...</p> */}
                <div className="flex gap-2">
                  <span className="font-semibold">
                    ₹
                    {(item.price - (item.price * item.discount) / 100).toFixed(
                      2
                    )}
                  </span>
                  <del className="opacity-60">{item.price}</del>
                  <span>({item.discount}% off)</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <button className="ml-2 text-xl text-violet-600 hover:bg-violet-600 hover:text-white rounded-full p-1 duration-150" onClick={() => openEditProductModal(item)}>
                    <FaEdit />
                  </button>
                  <button
                    className="mr-2 text-xl text-red-500 hover:bg-red-500 hover:text-white rounded-full p-1 duration-150"
                    onClick={() => setConfirmationModal(item)}
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </main>

        {/* //! Pop-up Dialog box to add New Product */}
        {productModal && (
          <div
            ref={elementProductModal}
            className="animate__animated animate__fadeIn animate__faster absolute top-0 left-0 h-full w-full p-5 bg-black bg-opacity-80 flex justify-center items-center"
          >
            <div className="animate__animated animate__zoomIn animate__faster w-6/12 p-4 rounded-lg relative bg-white">
              <button
                className="absolute top-3 right-3"
                onClick={handleModalClose}
              >
                <RxCross2 />
              </button>
              <h1 className="mb-4 font-semibold">New Product</h1>
              <form className="grid grid-cols-2 gap-4" onSubmit={activeEditProductBtn ? handleEditProductDetails : createProduct}>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter Product Title"
                  required
                  className="col-span-2 p-2 border border-gray-300 rounded focus:outline-violet-600"
                  value={productFormData.title}
                  onChange={handleProductForm}
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  required
                  className="p-2 border border-gray-300 rounded focus:outline-violet-600"
                  value={productFormData.price}
                  onChange={handleProductForm}
                />
                <input
                  type="number"
                  name="discount"
                  placeholder="Discount %"
                  required
                  className="p-2 border border-gray-300 rounded focus:outline-violet-600"
                  value={productFormData.discount}
                  onChange={handleProductForm}
                />
                <textarea
                  name="description"
                  placeholder="Product Description"
                  required
                  rows={6}
                  className="col-span-2 p-2 border border-gray-300 rounded focus:outline-violet-600"
                  value={productFormData.description}
                  onChange={handleProductForm}
                ></textarea>
                <div>
                  <button
                    type="submit"
                    className="bg-slate-300 rounded px-4 py-2 hover:bg-violet-600 hover:duration-300 focus:outline-violet-600 hover:text-white"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* //! Confirmation Modal */}
        {confirmationModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Are you sure?</h2>
              <p className="mb-6">
                Do you really want to Delete <span className="font-semibold">{confirmationModal.title.slice(0, 25)}...</span>? This process cannot be
                undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  className="px-4 py-2 bg-gray-300 rounded"
                  onClick={() => setConfirmationModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded"
                  onClick={handleDeleteProduct}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminProducts;
