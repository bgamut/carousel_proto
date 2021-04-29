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
    const width = 230;
    const [length,setLength]=useState(SliderData.length-window.innerWidth/width+1)
    const [offset,setOffset] = useState(0)
    const handleResize=()=>{
        setWindowWidth(window.innerWidth)
    }
    useEffect(()=>{
        window.addEventListener("resize",handleResize)
        // setOffset(windowWidth/(width))
        
    },[])
    useEffect(()=>{
        
        setLength(SliderData.length-offset)
    },[offset])
    useEffect(() => {
        // setShift((windowWidth-width)/2-current*width)
        setOffset(windowWidth/width-1)
        setShift(-current*width)
        
      }, [current,windowWidth,length])

    const prevSlide=()=>{
        // console.log('prev')
        if (current-1<0){
            setCurrent(0)
        }
        else{
            setCurrent(current-1)
        }
    }
    const nextSlide=()=>{
        console.log('next')
        if (current+1>length-1){
            setCurrent(length-1)
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
                overflow:'hidden',
                display:'flex',
                flexDirection:'row',
                backgroundColor:'transparent',
                paddingBottom:'15px',
                zIndex:0,
            }}
        >   
        
            {SliderData.map((slide,index)=>{
                return(
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
