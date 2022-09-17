import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Login from './comonents/login/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { checkLogins } from './state/actions/action';

function App() {
  const authentication = useSelector(state=>state.athenticateUser);
  const [loginStatus, setloginStatus] = useState(false)
  const dispatch = useDispatch()
  console.log(authentication);
  useEffect(()=>{
      let user = JSON.parse(localStorage.getItem('user'))
      dispatch(checkLogins(user))
      if(authentication){
        localStorage.setItem('user',JSON.stringify( user))
        setloginStatus(true)
      }
  }, [authentication])
  return (
   <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={!loginStatus ? <Login/> : 
          <div style={{display:'flex', justifyContent:'center', alignItems:'center',height:627}}>
            <h1>Your are logged in</h1>
          </div>} />
        </Routes>
      </BrowserRouter>
   </>
  );
}

export default App;
