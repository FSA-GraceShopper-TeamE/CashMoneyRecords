import React,{useEffect, useState} from 'react'
import { useDispatch} from 'react-redux'
import { editSingleUser, singleUserEdit } from './editUserProfile'
import { Link,useNavigate, useParams} from 'react-router-dom'
import { me } from '../auth/authSlice'
const UserProfile = () => {

  const [email, setNewEmail] = useState('');
  const [address, setNewAddress] = useState('');
  
  const {id} = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) =>{
    e.preventDefault();
    const userUpdate = { id, email, address }
    console.log('this is handle Submit', userUpdate);
    dispatch(editSingleUser(userUpdate)).then(()=>{
      navigate('/')
    })
  }

  // useEffect(()=>{
  //   dispatch(me(id)).then((res)=>{
  //     const {email, address} = res.payload;
  //     setNewEmail(email);
  //     setNewAddress(address);
  //   })
  // })
  
  return (
    <div>
      <h1>UserProfile</h1>
        <div>
        <form method='put' action={`/users/${id}`} onSubmit={handleSubmit}>
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