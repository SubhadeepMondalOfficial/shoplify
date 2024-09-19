import { useState } from "react";
import Layout from "./Layout"
import { TbShoppingBagSearch } from "react-icons/tb";


const Category = () => {
    const [categories, setCategories] = useState([
        {
            title: 'Electronics'
        },
        {
            title: 'Fashion'
        },
        {
            title: 'Smartphones'
        },
        {
            title: 'Furnitures'
        },
        {
            title: 'Men`s'
        },
        {
            title: 'Women`s'
        },
        {
            title: 'Electronics'
        },
        {
            title: 'Electronics'
        }
    ])

    return(
        <Layout>
            <main className="max-w-[1280px] m-auto mt-3 overflow-hidden py-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 md:gap-14 lg:gap-14 gap-8 md:px-32 px-14">
                    {
                        categories.map((category, index) => (
                            <div key={index} className="flex flex-col justify-center items-center shadow-xl p-10 hover:bg-[#FD5C36] transition-all duration-300 rounded-md cursor-pointer">
                                <TbShoppingBagSearch className="text-5xl" />
                                <h3 className="text-2xl font-semibold">{category.title}</h3>
                            </div>
                        ))
                    }
                </div>
            </main>
        </Layout>
    )
}

export default Category