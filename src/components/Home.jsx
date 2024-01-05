import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import logo from '../../src/assets/vv.png'
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css'
import { BsCart4 } from "react-icons/bs";


const Home = ({ token, cart, addToCart, user, setUser }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data.products);
        setFilteredProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };
    fetchProducts();
  }, [token]);
  useEffect(() => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const priceFiltered = filtered.filter((product) => {
      const price = parseFloat(product.price);
      const min = minPrice === '' ? Number.NEGATIVE_INFINITY : parseFloat(minPrice);
      const max = maxPrice === '' ? Number.POSITIVE_INFINITY : parseFloat(maxPrice);
      return price >= min && price <= max;
    });
    setFilteredProducts(priceFiltered);
  }, [searchTerm, minPrice, maxPrice, products]);
  const handleAddToCart = (product) => {
    addToCart(product);
  };
  const handleLogOut = () => {
    navigate('/login')
  }

  return (
    <div>
      <div className='flex justify-between px-8 py-2'>
        <img className='h-12 my-auto' src={logo} alt="" />
        <div className='flex my-auto justify-evenly gap-8 text-lg text-slate-700 font-semibold'>
          <p><Link to='/'>Home</Link></p>
          {
            user ?
              <div className='flex gap-8'>
                <p><Link to='/cart'>Cart</Link></p>
                <a onClick={handleLogOut}>Logout</a>
              </div> :
              <p><Link to='/login'>Login</Link></p>
          }
        </div>
        <div className='flex items-center gap-2 py-1'>
          {
            user ? <>
              <p className='font-semibold'>{user.firstName} {user.lastName}</p>
              <img className='w-20 h-20 border-2 p-1 rounded-full bg-white' src={user.image} alt="" /></> : <></>
          }
        </div>
      </div>
      {user ?
        <div>
          <div className="flex items-center justify-between mb-4 bg-[#032FB8] p-4 ">
            <input
              type="text"
              placeholder="Search products"
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded-lg p-2 mr-2"
            />
            <div className="flex items-center">
              <input
                type="number"
                placeholder="Min Price"
                onChange={(e) => setMinPrice(e.target.value)}
                className="border rounded-lg p-2 mr-2"
              />
              <input
                type="number"
                placeholder="Max Price"
                onChange={(e) => setMaxPrice(e.target.value)}
                className="border rounded-lg p-2"
              />
            </div>
            <div className='btn py-2 bg-[#0EB803] text-white text-xl font-semibold rounded-lg px-4'>
              <Link to='/cart'><p className='flex gap-2'><BsCart4 className='text-2xl text-[#FFFFFF] font-bold'/> Cart: {cart.length}</p></Link>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="relative border p-4 shadow-xl space-y-2 bg-gradient-to-b from-teal-100">
                {/*Modal Start*/}
                <label htmlFor={product.id} className=""><img className='w-full h-48 hover:scale-[110%]' src={product.thumbnail} alt="" /></label>
                <input type="checkbox" id={product.id} className="modal-toggle" />
                <div className="modal">
                  <div className="modal-box grid grid-cols-1 gap-4">
                    <div>
                      <div className='grid md:grid-cols-3 grid-cols-2 mb-4'>
                        {
                          product.images.map(image =>
                            <img className='w-36 h-32 hover:scale-150' src={image} alt="" />
                          )
                        }
                      </div>
                      <p className="font-bold text-xl mb-2">{product?.title}</p>
                      <p> <span className='font-bold'>Brand: </span>{product?.brand}</p>
                      <p> <span className='font-bold'>Category: </span>{product?.category}</p>
                      <p> <span className='font-bold'>Details: </span>{product?.description}</p>
                    </div>
                    <div className="modal-action">
                      <label htmlFor={product?.id} className="btn">Close!</label>
                    </div>
                  </div>
                </div>
                {/*Modal End*/}
                <p className='font-bold'>{product.title}</p>
                <p className='text-lg'><span className='line-through'>${product.price}</span><span className='mx-2 font-bold'>${parseFloat(product.price).toFixed(3) - (parseFloat(product.price).toFixed(3) * parseFloat(product?.discountPercentage).toFixed(3) / 100).toFixed(2)}</span></p>
                <p className='absolute top-2 bg-yellow-400 px-4 rounded-r-lg w-[45%] font-semibold'>Save {product.discountPercentage}%</p>
                <div className='flex justify-between'>
                  <p>Stock: <span className='font-semibold'> {product.stock}</span></p>
                  <Rating
                    style={{ maxWidth: 120 }}
                    value={product.rating}
                    readOnly
                  />
                </div>
                <button onClick={() => handleAddToCart(product)} className="flex-end rounded-lg w-full text-black text-center border-2 border-black p-1 mt-4 hover:bg-green-500 hover:text-white">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
        : <div className='bg-gradient-to-t from-blue-400 h-screen'>
          <p className='text-center font-bold text-3xl p-8'>Welcome to Varied Venture</p>
          <p className='text-center font-bold text-red-900 text-2xl p-4'><Link to='/login'>Login First!</Link></p>
        </div>}
    </div>
  );
};

export default Home;
