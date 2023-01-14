import { Link } from '@material-ui/core';
import { ArrowBackOutlined, SearchOutlined } from '@material-ui/icons'
import React from 'react';
import { useLocation } from 'react-router-dom';
import './watch.scss'


// const clip= "../../video/Friends.S02E14.[@Series_World_TM].720p.BluRay.x265.HEVC-PSA.mkv"

export default function Watch() {
  const location=useLocation();
  const movie = location.state;
  // const movie=location.movie;
  console.log(movie);
  // console.log(movie.title);
  return (
    <div className="watch">
      <Link to="/">
        <div className="back">
            <ArrowBackOutlined/>
            Home
        </div>

      </Link>
        <video className="video" autoPlay  controls src={movie.video} />
    </div>

  )
}




