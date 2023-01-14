import React,{Component} from 'react';
import video1 from './videos.mkv';

class Video extends Component{
    render(){
        return(
            <>
                <video src={video1}/>
            </>
        );
    }
}
export default Video;