import Layout from "./Layout";
import { FaCartPlus } from "react-icons/fa6";

const Products = () => {
  const products = [
    {
      title:
        "DUDEME Java Developer T-Shirt, 100% Cotton T-Shirts for Programmer, Coding, Developer, Software Mens, Round Neck T Shirts for Women, Half Sleeve Tshirt for Men",
      description:
        "Huge Variety: Check out over 1500 different designs made for Geekish men t shirt for boys and girls. Dudeme is the top choice in India for awesome t shirt for men, offering tons of options.Ultimate Performance: Whether you're hitting the gym or lounging at home, our mens t-shirt for men cotton offer superior breathability and flexibility for maximum performance during summer",
      price: 1000,
      discount: 40,
      image: "/Images/products/a.jpg",
    },
    {
      title:
        "DUDEME Java Developer T-Shirt, 100% Cotton T-Shirts for Programmer, Coding, Developer, Software Mens, Round Neck T Shirts for Women, Half Sleeve Tshirt for Men",
      description:
        "Huge Variety: Check out over 1500 different designs made for Geekish men t shirt for boys and girls. Dudeme is the top choice in India for awesome t shirt for men, offering tons of options.Ultimate Performance: Whether you're hitting the gym or lounging at home, our mens t-shirt for men cotton offer superior breathability and flexibility for maximum performance during summer",
      price: 1000,
      discount: 40,
      image: "/Images/products/b.jpg",
    },
    {
      title:
        "DUDEME Java Developer T-Shirt, 100% Cotton T-Shirts for Programmer, Coding, Developer, Software Mens, Round Neck T Shirts for Women, Half Sleeve Tshirt for Men",
      description:
        "Huge Variety: Check out over 1500 different designs made for Geekish men t shirt for boys and girls. Dudeme is the top choice in India for awesome t shirt for men, offering tons of options.Ultimate Performance: Whether you're hitting the gym or lounging at home, our mens t-shirt for men cotton offer superior breathability and flexibility for maximum performance during summer",
      price: 1000,
      discount: 40,
      image: "/Images/products/c.jpg",
    },
    {
      title:
        "DUDEME Java Developer T-Shirt, 100% Cotton T-Shirts for Programmer, Coding, Developer, Software Mens, Round Neck T Shirts for Women, Half Sleeve Tshirt for Men",
      description:
        "Huge Variety: Check out over 1500 different designs made for Geekish men t shirt for boys and girls. Dudeme is the top choice in India for awesome t shirt for men, offering tons of options.Ultimate Performance: Whether you're hitting the gym or lounging at home, our mens t-shirt for men cotton offer superior breathability and flexibility for maximum performance during summer",
      price: 1000,
      discount: 40,
      image: "/Images/products/d.jpg",
    },
    {
      title:
        "DUDEME Java Developer T-Shirt, 100% Cotton T-Shirts for Programmer, Coding, Developer, Software Mens, Round Neck T Shirts for Women, Half Sleeve Tshirt for Men",
      description:
        "Huge Variety: Check out over 1500 different designs made for Geekish men t shirt for boys and girls. Dudeme is the top choice in India for awesome t shirt for men, offering tons of options.Ultimate Performance: Whether you're hitting the gym or lounging at home, our mens t-shirt for men cotton offer superior breathability and flexibility for maximum performance during summer",
      price: 1000,
      discount: 40,
      image: "/Images/products/e.jpg",
    },
    {
      title:
        "DUDEME Java Developer T-Shirt, 100% Cotton T-Shirts for Programmer, Coding, Developer, Software Mens, Round Neck T Shirts for Women, Half Sleeve Tshirt for Men",
      description:
        "Huge Variety: Check out over 1500 different designs made for Geekish men t shirt for boys and girls. Dudeme is the top choice in India for awesome t shirt for men, offering tons of options.Ultimate Performance: Whether you're hitting the gym or lounging at home, our mens t-shirt for men cotton offer superior breathability and flexibility for maximum performance during summer",
      price: 1000,
      discount: 40,
      image: "/Images/products/f.jpg",
    },
    {
      title:
        "DUDEME Java Developer T-Shirt, 100% Cotton T-Shirts for Programmer, Coding, Developer, Software Mens, Round Neck T Shirts for Women, Half Sleeve Tshirt for Men",
      description:
        "Huge Variety: Check out over 1500 different designs made for Geekish men t shirt for boys and girls. Dudeme is the top choice in India for awesome t shirt for men, offering tons of options.Ultimate Performance: Whether you're hitting the gym or lounging at home, our mens t-shirt for men cotton offer superior breathability and flexibility for maximum performance during summer",
      price: 1000,
      discount: 40,
      image: "/Images/products/g.jpg",
    },
    {
      title:
        "DUDEME Java Developer T-Shirt, 100% Cotton T-Shirts for Programmer, Coding, Developer, Software Mens, Round Neck T Shirts for Women, Half Sleeve Tshirt for Men",
      description:
        "Huge Variety: Check out over 1500 different designs made for Geekish men t shirt for boys and girls. Dudeme is the top choice in India for awesome t shirt for men, offering tons of options.Ultimate Performance: Whether you're hitting the gym or lounging at home, our mens t-shirt for men cotton offer superior breathability and flexibility for maximum performance during summer",
      price: 1000,
      discount: 40,
      image: "/Images/products/i.jpg",
    },
    {
      title:
        "DUDEME Java Developer T-Shirt, 100% Cotton T-Shirts for Programmer, Coding, Developer, Software Mens, Round Neck T Shirts for Women, Half Sleeve Tshirt for Men",
      description:
        "Huge Variety: Check out over 1500 different designs made for Geekish men t shirt for boys and girls. Dudeme is the top choice in India for awesome t shirt for men, offering tons of options.Ultimate Performance: Whether you're hitting the gym or lounging at home, our mens t-shirt for men cotton offer superior breathability and flexibility for maximum performance during summer",
      price: 1000,
      discount: 40,
      image: "/Images/products/j.jpg",
    },
  ];

  return (
    <Layout>
      {/* Main Body */}
      <main>
        <div className="max-w-[1280px] m-auto mt-8">
          <div className="text-center space-y-2 mb-5">
            <h2 className=" text-2xl font-bold">All Products</h2>
            <p className="m-auto md:w-2/4 md:text-lg text-[10px] px-3">
              The success of your new product press release getting published in
              the news can often decide on the success of your product/sales and
              can prove key to your PR and marketing strategy.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-10 md:px-20 px-8">
            {products.map((item, index) => (
              <div
                key={index}
                className="shadow-lg rounded-xl overflow-hidden space-y-3 hover:scale-105 transition-all duration-300"
              >
                <img
                  src={item.image}
                  alt="Product Image"
                  className=" w-full h-[300px] min-[200px]:object-contain md:object-cover "
                />
                <h3 className="font-semibold">{item.title.slice(0, 50)}...</h3>
                <div className="flex gap-2">
                  <span className="font-semibold">
                    ₹{item.price - (item.price * item.discount) / 100 - 1}
                  </span>
                  <del className="opacity-60">{item.price}</del>
                  <span>({item.discount}% off)</span>
                </div>
                <div className="relative">
                  <button className="bg-green-400 rounded-full p-3 absolute -top-6 right-3 hover:bg-green-500 hover:text-white">
                    <FaCartPlus className="text-2xl" />
                  </button>
                  <button className="w-full py-3 bg-[#FD5C36] text-xl font-semibold text-white hover:bg-green-500 transition-all duration-200">
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

export default Products;
