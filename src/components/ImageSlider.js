import React, {useState,useEffect} from 'react';
import { SliderData } from './SliderData';
import {FaArrowAltCircleRight, FaArrowAltCircleLeft} from 'react-icons/fa'
import styled from 'styled-components';


const SliderImg = styled.img`
    height:200px;
    width:200px;
    margin-top:15px;
    margin-left:15px;
    margin-right:15px;
    border-radius:10px;
    transform:${props=>`translate(${props.shift}px,15px)`};
    transition:transform 0.5s;
    transition-timing-function:ease;
`

const ImageSlider = () => {
    const[current,setCurrent]=useState(0)
    const [shift,setShift]=useState(0)
    const [windowWidth,setWindowWidth]=useState(window.innerWidth)
    const [length,setLength]=useState(SliderData.length)
    const width = 230;
    const [offset,setOffset] = useState(0)
    const handleResize=()=>{
        setWindowWidth(window.innerWidth)
    }
    useEffect(()=>{
        window.addEventListener("resize",handleResize)
        setOffset(windowWidth/(width+30)-1)
    },[])
    useEffect(() => {
        setOffset(windowWidth/(width+30)-1)
        setShift((windowWidth-width)/2-current*width)
        // setShift(-current*width)
        console.log(current*width)
      }, [current,windowWidth])

    const prevSlide=()=>{
        console.log('prev')
        if (current-1<0){
            setCurrent(current)
        }
        else{
            setCurrent(current-1)
        }
    }
    const nextSlide=()=>{
        console.log('next')
        if (current+1>length-1){
            setCurrent(current)
        }
        else{
            setCurrent(current+1)
        }
    }

    return (
        <div>
        <FaArrowAltCircleLeft onClick={prevSlide}
            style={{
                position:'absolute',
                top:'115px',
                left:'7px',
                zIndex:103,
                color:'grey',
                display: current==0 ? "none":"block"
            }}
        />
        <FaArrowAltCircleRight onClick={nextSlide}
            style={{
                position:'absolute',
                top:'115px',
                right:'7px',
                zIndex:103,
                color:'grey',
                display: current==length-1 ? "none":"block" 
            }}
        />
        <div
            style={{
                height:"230px",
                width:"100%",
                overflow:'scroll',
                display:'flex',
                flexDirection:'row',
                backgroundColor:'transparent',
                paddingBottom:'15px',
                zIndex:0,
            }}
        >   
        
            {SliderData.map((slide,index)=>{
                return(
                    // <img 
                    // src={slide.image}
                    // style={{
                    //     height:"200px",
                    //     width:"200px",
                    //     marginTop:"15px",
                    //     marginLeft:"15px",
                    //     marginRight:"15px",
                    //     borderRadius:'10px',
                    //     transform:'translate(-'+shift+'px,15px)',
                    //     transition:"transform 0.5s",
                    //     transitionTimingFunction:'ease'
                    // }}
                    // alt="travel image"
                    // / >
                    <SliderImg
                    src={slide.image}
                    shift={shift}
                    />
                )
            })}
            
        
        </div>
        </div>
    )
}

export default ImageSlider
