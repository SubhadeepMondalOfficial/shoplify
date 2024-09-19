import { useState } from "react";
import Layout from "./Layout";

const AdminProducts = () => {
  const [products, setProducts] = useState([
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
  ]);

  return (
    <Layout>
      <div>
        <h1 className="text-2xl font-semibold mb-4">Products</h1>
        <main className="grid md:grid-cols-4 gap-6">
          {products.map((item, index) => (
            <div key={index} className=" shadow-lg rounded-xl overflow-hidden">
              <img
                src={item.image}
                alt="Product Image"
                className=" w-full h-[300px] min-[200px]:object-contain md:object-cover "
              />
              <h3 className="font-semibold">{item.title.slice(0, 50)}...</h3>
              <p className="opacity-60">{item.description.slice(0, 100)}...</p>
              <div className="flex gap-2">
                <span className="font-semibold">
                  ₹{item.price - (item.price * item.discount) / 100 - 1}
                </span>
                <del className="opacity-60">{item.price}</del>
                <span>({item.discount}% off)</span>
              </div>
            </div>
          ))}
        </main>
      </div>
    </Layout>
  );
};

export default AdminProducts;
