import React from 'react'
import './Login.css'
import banner from '../../images/banner.jpg'
import { useState, useEffect } from 'react'
import { BsArrowLeft } from "react-icons/bs";
import { FaRegTimesCircle } from "react-icons/fa";
import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { checkLogins, updatePass, signUp } from '../../state/actions/action'

function Login() {
    const [formState, setFormState] = useState(1)
    const [clickEvent, setClickEvent]= useState(0)
    const [message, setMessage] = useState("")
    const [messageBox, setMessageBox] = useState(false)
    
    const [loginDetails, setLoginDetails] = useState({username: '', password:''})
    const [forgetPassEmail, setForgetPassEmail] = useState({email: ''})
    const [signUpDetails, setSignUpDetails] = useState({username: '', email: '', password:'', phone:''})


    const authenticate = useSelector(state=> state.athenticateUser)
    const dispath = useDispatch()
    const dispatch = useDispatch()

    const LoginOnChange= (e)=>{
        setLoginDetails({...loginDetails, [e.target.name]: e.target.value})
    }
    const LoginSubmit = (e)=>{
        e.preventDefault()
        dispath(checkLogins(loginDetails));
        setClickEvent(clickEvent+1)
    }

    const forgetPassOnChnge= (e)=>{
        setForgetPassEmail({...forgetPassEmail, [e.target.name]: e.target.value});
    }
    const forgetPass = (e)=>{
        e.preventDefault()
        dispath(updatePass(forgetPassEmail));
        setClickEvent(clickEvent+1)
    }

    const signUpOnChange = (e)=>{
        setSignUpDetails({...signUpDetails, [e.target.name]: e.target.value})
    }
    const signUpOnSubmit = (e)=>{
        e.preventDefault();
        setClickEvent(clickEvent+1)
        dispath(signUp(signUpDetails))
    }
    
    useEffect(()=>{
        //For login failed
        if(!authenticate && formState === 1)
        {
            setMessage('Inavalid Credentals.');
            setMessageBox(true);
        }
        // for forget pass failed
        if(!authenticate && formState === 2)
        {
            setMessage('Invaid Email.');
            setMessageBox(true);
        }
        // for forgetpass successfull
        if(authenticate && formState === 2)
        {
            setMessage('Email is sent.');
            setMessageBox(true);
        }
        //for sign up failed
        if(!authenticate && formState === 3)
        {
            setMessage('This Email is registered')
            setMessageBox(true);
        }
        //for login successfull
        if(authenticate && formState === 1)
        {
            localStorage.setItem('user', JSON.stringify(loginDetails))
        }
        // for signup  successfull
        if(authenticate && formState === 3)
        {
            localStorage.setItem('user', JSON.stringify(signUpDetails))
        }
    },[authenticate, clickEvent])


    useEffect(() => {
        if(clickEvent === 0)
            setMessageBox(false)
        setTimeout(()=>{
            setMessageBox(false)
            setMessage('')
        },6000)
    }, [messageBox])
    
  return (
    <div className='banner'>
        <div className='banner_right'>
            <h1>Login and Sign up authentication with redux</h1>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis similique quae officia doloremque distinctio, tempora rem illo tempore nesciunt, fugiat quisquam minus vitae iusto minima quod, id neque hic voluptatum.</p>
            <button className='btn btn-login'onClick={()=>{setFormState(3)}}>Create Your Account</button>
        </div>
        <div className='banner_left'>
           <img className='img' src={banner}/>

           {/* Login */}
           {formState === 1 && <motion.div initial={{opacity:0, transform:'scale(0.7)'}} animate={{opacity:1, transform:'scale(1)', transition:{duration:.2}}}>
               <h3 className='form_heading'>Login</h3>
               <form className='form' onSubmit={LoginSubmit}>
                   <div>
                       <input required type='text' id='username' name='username' placeholder=' ' className='input' onChange={LoginOnChange}/> 
                       <label htmlFor="username" className='label'>Username</label>
                   </div>
                   <div>
                       <input required type='password' id='password' name='password' placeholder=' ' className='input' onChange={LoginOnChange}/> 
                       <label htmlFor="password" className='label'>Password</label>
                   </div>
                   <p onClick={()=>{setFormState(2)}}>Forgot Password ?</p>
                   <button className='btn btn-login' type='submit'>Login</button>
               </form>
                   {messageBox && <div className='message' id='message'>
                        <p>{message}</p>
                        <FaRegTimesCircle className='xmark' onClick={()=>{setMessageBox(false)}}/>
                   </div>}
                   <p>Don't have an account? <span onClick={()=>setFormState(3)}>Sign Up</span> </p>
           </motion.div>}

           {/* Forget Password */}
           {formState === 2 && <motion.div className='forget_pass' initial={{opacity:0, transform:'scale(0.7)'}} animate={{opacity:1, transform:'scale(1)', transition:{duration:.2}}}>
               <p onClick={()=>{setFormState(1)}} className='back'><BsArrowLeft/> Back</p>
               <h3 className='form_heading'>Forgot Pass</h3>
               <form className='form' onSubmit={forgetPass}>
                   <div>
                       <input required type='email' id='email' name='email' placeholder=' ' className='input' onChange={forgetPassOnChnge}/> 
                       <label htmlFor="email" className='label'>Your Email</label>
                   </div>
                   <button className='btn btn-login' type='submit'>Send me an email</button>
                </form>
                    {messageBox && <div className='message' id='message'>
                        <p>{message}</p>
                        <FaRegTimesCircle className='xmark' onClick={()=>{setMessageBox(false)}}/>
                   </div>}
                   <p>Don't have an account? <span onClick={()=>setFormState(3)}>Sign Up</span> </p>
           </motion.div>}

           {/* Sign Up */}
           {formState === 3 && <motion.div className='sign_up' initial={{opacity:0, transform:'scale(0.7)'}} animate={{opacity:1, transform:'scale(1)', transition:{duration:.2}}}>
               <h3 className='form_heading'>Sign up</h3>
               <form className='form' onSubmit={signUpOnSubmit}>
                   <div>
                       <input required type='text' id='username' name='username' placeholder=' ' className='input' onChange={signUpOnChange}/> 
                       <label htmlFor="username" className='label'>Username</label>
                   </div>
                   <div>
                       <input required type='text' id='email' name='email' placeholder=' ' className='input' onChange={signUpOnChange}/> 
                       <label htmlFor="email" className='label'>Email</label>
                   </div>
                   <div>
                       <input required type='password' id='password' name='password' placeholder=' ' className='input' onChange={signUpOnChange}/> 
                       <label htmlFor="password" className='label'>Password</label>
                   </div>
                   <div>
                       <input required type='text' id='phone' name='phone' placeholder=' ' className='input' onChange={signUpOnChange}/> 
                       <label htmlFor="phone" className='label'>Phone</label>
                   </div>
                   <button className='btn btn-login' type='submit' >Sign up</button>
               </form>
                   {messageBox && <div className='message' id='message'>
                        <p>{message}</p>
                        <FaRegTimesCircle className='xmark' onClick={()=>{setMessageBox(false)}}/>
                   </div>}
                   <p>Already a member ?<span onClick={()=>setFormState(1)}>Log In</span> </p>
           </motion.div>}
        </div>
        
    </div>
  )
}

export default Login