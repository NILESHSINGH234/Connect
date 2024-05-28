import React from 'react'
import { useSelector } from 'react-redux';
const Home = () => {

  const { token, isLoggedIn, authError } = useSelector(state => state.auth);
  console.log(token)
  return (
    <div>Home</div>
  )
}

export default Home