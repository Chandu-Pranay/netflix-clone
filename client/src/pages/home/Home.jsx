// import React from 'react'
import { AcUnit, Search } from '@material-ui/icons';
import Featured from '../../components/featured/featured';
import Navbar from '../../components/navbar/Navbar'
import './home.scss';
import List from '../../components/list/List'
import { useEffect,useState } from 'react';
import axios from 'axios';

const Home = ({type}) => {
  const [lists,setLists]=useState([]);
  const [genre,setGenre]=useState(null);

  useEffect(()=>{
    const getRandomLists= async()=>{
     try{
        const res=await axios.get(
          `lists${type ? "?type=" +type : ""}${genre ? "&genre=" + genre :""}`,
          {
            headers:{
              token : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTljNDRlOWE2MjlkZmVhNDdkNDRjNyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3MjI0NDIyOSwiZXhwIjoxNjcyNjc2MjI5fQ.YgJmPF4BgsZ8klccpoOReLEQ682HbHJCSE-oam_YUBY"
            }
          },);
          
    //  console.log(res);
     setLists(res.data);     
     }
     catch(err){
      console.log(err);
     } 
    };
    getRandomLists();
  },[type,genre]);
  return (
    <div className="home">
        <Navbar/>
        <Featured type={type}/>
       {lists.map((list)=>(
          <List list={list}/>
        ))}
        
    </div>
  )
}

export default Home