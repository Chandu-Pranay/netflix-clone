import { Add, PlayArrow, ThumbDownAltOutlined, ThumbUpAltOutlined } from "@material-ui/icons"
import "./ListItem.scss"
import {useState} from 'react';
import { useEffect } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';

export default function ListItem({index,item}) {
  const [isHovered,setIsHovered]=useState(false);
  //const trailer="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761";
  // console.log(item);
  const [movie,setMovie]=useState({});
  useEffect(()=>{
    const getMovie=async ()=>{
      try{
        const res=await axios.get("movies/find/" +item ,{
          headers:{
            token:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTljNDRlOWE2MjlkZmVhNDdkNDRjNyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3MjI0NDIyOSwiZXhwIjoxNjcyNjc2MjI5fQ.YgJmPF4BgsZ8klccpoOReLEQ682HbHJCSE-oam_YUBY"
          }
        });
        setMovie(res.data);
      }catch(err){
        console.log(err);
      }
    };
    getMovie();
  },[item]) ;
  return (
    
    <Link to={"/watch"} state={{movie:movie}} >

    <div
     className="listItem"
     style={{left:isHovered && index * 225 - 50 + index*2.5}}
    onMouseEnter={()=>setIsHovered(true)}
    onMouseLeave={()=>setIsHovered(false)} 
    >
      <img src={movie.img}/>
      {isHovered && (
        <>  
        <video src={movie.trailer} autoPlay={true} loop/>
    <div className="itemInfo">
      <div className="icons">
        <PlayArrow  className="icon"/>
        <Add className="icon"/>
        <ThumbUpAltOutlined className="icon"/>
         <ThumbDownAltOutlined className="icon"/>
      </div>
      <div className="itemInfoTop">
        <span>{movie.duration}</span>
        <span className="limit">{movie.limit}</span>
        <span>{movie.year}</span>
      </div>
      <div className="desc">
        {movie.desc}
      </div>
      <div className="genre">{movie.genre}</div>
    </div></>
    )}
    </div>
    </Link>

  )
}
