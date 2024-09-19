import { useState } from 'react';
import Layout from './Layout'

const Customers = () => {
    const [orders, setOrders] = useState([
        {
            customerName: "sunil yadav",
            email: 'yadavsunil29@gmail.com',
            mobile: '+91 7483689770',
            date: '26-05-2024 09:51:45 Am',
            address: 'Echelon Square, Plot 25, Sector 32, Gurgaon, 122001 Haryana, India'
        },
        {
            customerName: "sunil yadav",
            email: 'yadavsunil29@gmail.com',
            mobile: '+91 7483689770',
            date: '26-05-2024 09:51:45 Am',
            address: 'Echelon Square, Plot 25, Sector 32, Gurgaon, 122001 Haryana, India'
        },
        {
            customerName: "sunil yadav",
            email: 'yadavsunil29@gmail.com',
            mobile: '+91 7483689770',
            date: '26-05-2024 09:51:45 Am',
            address: 'Echelon Square, Plot 25, Sector 32, Gurgaon, 122001 Haryana, India'
        },
        {
            customerName: "sunil yadav",
            email: 'yadavsunil29@gmail.com',
            mobile: '+91 7483689770',
            date: '26-05-2024 09:51:45 Am',
            address: 'Echelon Square, Plot 25, Sector 32, Gurgaon, 122001 Haryana, India'
        },
        {
            customerName: "sunil yadav",
            email: 'yadavsunil29@gmail.com',
            mobile: '+91 7483689770',
            date: '26-05-2024 09:51:45 Am',
            address: 'Echelon Square, Plot 25, Sector 32, Gurgaon, 122001 Haryana, India'
        },
        {
            customerName: "sunil yadav",
            email: 'yadavsunil29@gmail.com',
            mobile: '+91 7483689770',
            date: '26-05-2024 09:51:45 Am',
            address: 'Echelon Square, Plot 25, Sector 32, Gurgaon, 122001 Haryana, India'
        },
        {
            customerName: "sunil yadav",
            email: 'yadavsunil29@gmail.com',
            mobile: '+91 7483689770',
            date: '26-05-2024 09:51:45 Am',
            address: 'Echelon Square, Plot 25, Sector 32, Gurgaon, 122001 Haryana, India'
        },
        {
            customerName: "sunil yadav",
            email: 'yadavsunil29@gmail.com',
            mobile: '+91 7483689770',
            date: '26-05-2024 09:51:45 Am',
            address: 'Echelon Square, Plot 25, Sector 32, Gurgaon, 122001 Haryana, India'
        },
        {
            customerName: "sunil yadav",
            email: 'yadavsunil29@gmail.com',
            mobile: '+91 7483689770',
            date: '26-05-2024 09:51:45 Am',
            address: 'Echelon Square, Plot 25, Sector 32, Gurgaon, 122001 Haryana, India'
        },
        {
            customerName: "sunil yadav",
            email: 'yadavsunil29@gmail.com',
            mobile: '+91 7483689770',
            date: '26-05-2024 09:51:45 Am',
            address: 'Echelon Square, Plot 25, Sector 32, Gurgaon, 122001 Haryana, India'
        },
        {
            customerName: "sunil yadav",
            email: 'yadavsunil29@gmail.com',
            mobile: '+91 7483689770',
            date: '26-05-2024 09:51:45 Am',
            address: 'Echelon Square, Plot 25, Sector 32, Gurgaon, 122001 Haryana, India'
        },
        {
            customerName: "sunil yadav",
            email: 'yadavsunil29@gmail.com',
            mobile: '+91 7483689770',
            date: '26-05-2024 09:51:45 Am',
            address: 'Echelon Square, Plot 25, Sector 32, Gurgaon, 122001 Haryana, India'
        },
        
    ])

    return (
      <Layout>
        <div>
          <h1 className='text-2xl font-semibold mb-4'>Customers</h1>
          <div>
            <table className='w-full text-left overflow-x-scroll'>
                <thead className='bg-blue-900 text-white rounded'>
                    <tr>
                        <th className='py-4'>Customer's Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map((item, index) => (
                            <tr key={index} style={{background: (index+1)%2 === 0 ? '#F3F4F6' : 'white'}}>
                                <td className='capitalize flex gap-3 py-2'>
                                    <img src="/Images/avtar.avif" alt="customerImage" className='w-10 h-10 rounded-full' />
                                    <div className='flex flex-col'>
                                        <span className='font-semibold'>{item.customerName}</span>
                                        <span className='opacity-60'>{item.date}</span>
                                    </div>
                                </td>
                                <td>{item.email}</td>
                                <td>{item.mobile}</td>
                                <td>{item.address}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
          </div>
        </div>
      </Layout>
    );
}

export default Customers