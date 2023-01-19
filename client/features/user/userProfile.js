import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector} from 'react-redux'
// import { editSingleUser, singleUserEdit } from '../auth/authSlice'
import { Link,useNavigate, useParams} from 'react-router-dom'
import { me } from '../auth/authSlice'
import { fetchUserProfile, editSingleUser } from './editUserProfile'

// const TOKEN = "token";
const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const userId = useSelector((state) => state.auth.me.id)

  const [email, setNewEmail] = useState('');
  const [address, setNewAddress] = useState('');

  useEffect(()=>{
    // dispatch(me(id)).then((res)=>{
    //   const {email, address} = res.payload;
    //   setNewEmail(email);
    //   setNewAddress(address);
    // })
    dispatch(fetchUserProfile(userId))
  }, [dispatch, userId]);


  const handleSubmit = (e) =>{
    e.preventDefault();
    // const userUpdate = { id, email, address }
    // console.log('this is handle Submit', userUpdate);
    dispatch(editSingleUser({id: userId, email, address}))
    navigate('/')

  }
  
  return (
    <div>
      <h1>UserProfile</h1>
        <div>
        <form id='editUder' onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            required style={{width:350, border:"2px solid black"}}
            name="email"
            // placeholder={email}
            value={email}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <label htmlFor="address">Address:</label>
          <input
            required style={{width:350, border:"2px solid black"}}
            name="address"
            // placeholder={address}
            value={address}
            onChange={(e) => setNewAddress(e.target.value)}
          />
          <button type="submit">Submit</button>
          <Link to="/">Cancel</Link>
        </form>
        </div>
    </div>
  )
}

export default UserProfile