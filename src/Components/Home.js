import React from 'react'
import Mailbox from './MailBox'
import { useSelector } from 'react-redux'

const Home = () => {
  const isLogin = useSelector(state=>state.auth.isLogin)
  return (
    <>
   {!isLogin && <h1 className='text-center'>Welcome to your male box</h1>}
    {isLogin && <Mailbox/>}
    </>
  )
}

export default Home