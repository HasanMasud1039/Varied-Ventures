import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/Fa';

const Cart = ({ cart, removeFromCart, user }) => {
  const [itemCounts, setItemCounts] = useState({});

  const handleCountPlus = (index) => {
    setItemCounts((prevCounts) => {
      const newCounts = { ...prevCounts };
      newCounts[index] = (newCounts[index] || 0) + 1;
      return newCounts;
    });
  };

  const handleCountMinus = (index) => {
    setItemCounts((prevCounts) => {
      const newCounts = { ...prevCounts };
      newCounts[index] = Math.max((newCounts[index] || 0) - 1, 1);
      return newCounts;
    });
  };

  const calculateTotalAmount = () => {
    return cart.reduce(
      (total, item) =>
        total +
        ((parseFloat(item.price)) * (itemCounts[item.id] || 1)),
      0
    ).toFixed(2);
  };

  const calculateTotalPay = () => {
    return cart.reduce(
      (total, item) =>
        total +
        ((parseFloat(item.price) - (parseFloat(item.price) * parseFloat(item?.discountPercentage) / 100)) * (itemCounts[item.id] || 1)),
      0
    ).toFixed(2);
  };

  const total = calculateTotalAmount();
  const totalPay = calculateTotalPay();

  return (
    <div>
      <div className=''>
        <div className='flex justify-between bg-[#032FB8] text-white px-8'>
          <button className='btn bg-blue-500 px-4 text-xl text-white hover:bg-red-800 rounded-lg my-4 font- mx-8'>
            <FaHome />
            <Link to='/'>Home</Link>
          </button>
          <p className='mt-4 mx-8 p-4 text-xl space-x-4'>
            Total Amount: <span className='font-bold'>$ {total}</span>{' '}
          </p>
          <p className='mt-4 mx-8 p-4 text-xl space-x-4'>
            After Discount: <span className='font-bold'>$ {totalPay}</span>{' '}
          </p>
          <button className='btn bg-yellow-500 px-4 py-2 my-4 font-semibold hover:bg-red-800 text-white rounded-lg'>
            PAY
          </button>
        </div>
        <p className='text-center justify-center p-6 font-bold text-2xl uppercase'>Cart Items</p>
      </div>
      <table className='min-w-full border border-collapse border-gray-300'>
        <thead>
          <tr className='bg-gray-200 uppercase'>
            <th className='py-2 px-4 border'>No.</th>
            <th className='py-2 px-4 border'>Image</th>
            <th className='py-2 px-4 border'>Title</th>
            <th className='py-2 px-4 border'>Unit Price($)</th>
            <th className='py-2 px-4 border'>Discount(%)</th>
            <th className='py-2 px-4 border'>Items</th>
            <th className='py-2 px-4 border'>Total Price($)</th>
            <th className='py-2 px-4 border'>Action</th>
          </tr>
        </thead>
        {cart.map((item, index) => (
          <tbody key={index} className='mb-4'>
            <tr className='text-md text-center'>
              <td className='py-2 px-4 border'>{index + 1}</td>
              <td className='py-2 px-4 border'>
                <img className='w-12 h-12' src={item.thumbnail} alt='' />
              </td>
              <td className='py-2 px-4 border'>{item.title}</td>
              <td className='py-2 px-4 border'>{item.price}</td>
              <td className='py-2 px-4 border'>{item.discountPercentage}</td>
              <td className='py-2 px-4 space-x-6 border-t flex justify-evenly font-bold items-center'>
                <button
                  onClick={() => handleCountMinus(item.id)}
                  className='rounded-[40%] w-8 bg-[#5207DE] text-2xl font-bold text-white'
                >
                  -
                </button>
                {' '}
                {itemCounts[item.id] || 1}{' '}
                <button
                  onClick={() => handleCountPlus(item.id)}
                  className='rounded-[40%] w-8 bg-[#5207DE] text-2xl font-bold text-white'
                >
                  +
                </button>
              </td>
              <td className='py-2 px-4 border'>
                {((parseFloat(item.price) - (parseFloat(item.price) * parseFloat(item?.discountPercentage) / 100)) * (itemCounts[item.id] || 1)).toFixed(2)}
              </td>
              <td className='py-2 px-4 border'>
                <button
                  onClick={() => removeFromCart(index)}
                  className='bg-red-500 text-white p-2 rounded-lg'
                >
                  Remove
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default Cart;
