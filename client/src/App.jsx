import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';   
import './App.css'
import { fetchProducts } from './features/products/productSlice';

function App() {
  
  const {products} = useSelector((state) => state.products || [])
  
  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(fetchProducts());
  },[dispatch])

  console.log(products)
  return (
    <>
      <div className='text-2xl'>Hello world</div>
      {products?.map((item) => (
        <div key= {item.id}>
          <h1>{item.name}</h1>
        </div>
      ))}
    </>
  )
}

export default App
