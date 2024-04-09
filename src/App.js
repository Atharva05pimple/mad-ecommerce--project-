import React, { useEffect, useState } from 'react';
import axios from 'axios';
import $ from 'jquery'; // Import jQuery

const App = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://real-time-amazon-data.p.rapidapi.com/search',
        params: {
          query: search || 'cloths',
          page: '1',
          country: 'US',
          category_id: 'aps'
        },
        headers: {
          'X-RapidAPI-Key': '03efd5a285mshe7331c9d611b7f7p143fd2jsn5b7e913e6da3',
          'X-RapidAPI-Host': 'real-time-amazon-data.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        console.log(response.data.data)
        setProducts(response.data.data.products);

       
        $('.container').css('background-color', 'lightgray');
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [search]);

  return (
    <div className="container mx-auto mt-10">
      <h1 className='text-3xl font-bold mb-5'>06_SAHILCHALKE-Exp10</h1>
      <h1 className="text-3xl font-bold mb-5">E-commerce Products</h1>
      <div className="mb-5">
        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300" placeholder="Search products" onChange={(e)=>setSearch(e.target.value)} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

const Card = ({ product }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow">
      <a href={product.product_url}>
        <img className="rounded-t-lg" src={product.product_photo} alt={product.product_title} />
      </a>
      <div className="p-5">
        <a href={product.product_url}>
          <h5 className="mb-2 text-sm font-bold tracking-tight text-gray-900">{product.product_title}</h5>
        </a>
        <p className="mb-3 font-normal text-gray-700">{product.sales_volume}</p>
        <p className="mb-3 font-normal text-gray-700">{product.delivery}</p>
        <a href={product.product_url} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
          View on Amazon
          <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 5h12m0 0L9 1m4 4L9 9" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default App;
