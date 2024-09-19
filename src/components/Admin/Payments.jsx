import Layout from './Layout'
import { useState } from 'react';

const Payments = () => {
    const [orders, setOrders] = useState([
        {
            paymentId: 'pay38190',
            customerName: "sunil yadav",
            email: 'yadavsunil29@gmail.com',
            mobile: '+91 7483689770',
            product: 'samsung a7 lite',
            amount: 11990,
            date: '26-05-2024 09:51:45 Am',
        },
        {
            paymentId: 'pay38190',
            customerName: "sunil yadav",
            email: 'yadavsunil29@gmail.com',
            mobile: '+91 7483689770',
            product: 'samsung a7 lite',
            amount: 11990,
            date: '26-05-2024 09:51:45 Am',
        },
        {
            paymentId: 'pay38190',
            customerName: "sunil yadav",
            email: 'yadavsunil29@gmail.com',
            mobile: '+91 7483689770',
            product: 'samsung a7 lite',
            amount: 11990,
            date: '26-05-2024 09:51:45 Am',
        },
        {
            paymentId: 'pay38190',
            customerName: "sunil yadav",
            email: 'yadavsunil29@gmail.com',
            mobile: '+91 7483689770',
            product: 'samsung a7 lite',
            amount: 11990,
            date: '26-05-2024 09:51:45 Am',
        },
        {
            paymentId: 'pay38190',
            customerName: "sunil yadav",
            email: 'yadavsunil29@gmail.com',
            mobile: '+91 7483689770',
            product: 'samsung a7 lite',
            amount: 11990,
            date: '26-05-2024 09:51:45 Am',
        },
        {
            paymentId: 'pay38190',
            customerName: "sunil yadav",
            email: 'yadavsunil29@gmail.com',
            mobile: '+91 7483689770',
            product: 'samsung a7 lite',
            amount: 11990,
            date: '26-05-2024 09:51:45 Am',
        },
        {
            paymentId: 'pay38190',
            customerName: "sunil yadav",
            email: 'yadavsunil29@gmail.com',
            mobile: '+91 7483689770',
            product: 'samsung a7 lite',
            amount: 11990,
            date: '26-05-2024 09:51:45 Am',
        },
        {
            paymentId: 'pay38190',
            customerName: "sunil yadav",
            email: 'yadavsunil29@gmail.com',
            mobile: '+91 7483689770',
            product: 'samsung a7 lite',
            amount: 11990,
            date: '26-05-2024 09:51:45 Am',
        },
        {
            paymentId: 'pay38190',
            customerName: "sunil yadav",
            email: 'yadavsunil29@gmail.com',
            mobile: '+91 7483689770',
            product: 'samsung a7 lite',
            amount: 11990,
            date: '26-05-2024 09:51:45 Am',
        },
        {
            paymentId: 'pay38190',
            customerName: "sunil yadav",
            email: 'yadavsunil29@gmail.com',
            mobile: '+91 7483689770',
            product: 'samsung a7 lite',
            amount: 11990,
            date: '26-05-2024 09:51:45 Am',
        },
        {
            paymentId: 'pay38190',
            customerName: "sunil yadav",
            email: 'yadavsunil29@gmail.com',
            mobile: '+91 7483689770',
            product: 'samsung a7 lite',
            amount: 11990,
            date: '26-05-2024 09:51:45 Am',
        },
        {
            paymentId: 'pay38190',
            customerName: "sunil yadav",
            email: 'yadavsunil29@gmail.com',
            mobile: '+91 7483689770',
            product: 'samsung a7 lite',
            amount: 11990,
            date: '26-05-2024 09:51:45 Am',
        },
        
    ])

    return (
      <Layout>
        <div>
          <h1 className='text-2xl font-semibold mb-4'>Payments</h1>
          <div>
            <table className='w-full text-center overflow-x-scroll'>
                <thead className='bg-blue-900 text-white rounded'>
                    <tr>
                        <th className='py-4'>Payment Id</th>
                        <th>Customer's Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Product</th>
                        <th>Amount</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map((item, index) => (
                            <tr key={index} style={{background: (index+1)%2 === 0 ? '#F3F4F6' : 'white'}}>
                                <td className='py-4 uppercase'>{item.paymentId}</td>
                                <td className='capitalize'>{item.customerName}</td>
                                <td>{item.email}</td>
                                <td>{item.mobile}</td>
                                <td className='capitalize'>{item.product}</td>
                                <td>₹{item.amount.toLocaleString()}</td>
                                <td>{item.date}</td>
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

export default Payments