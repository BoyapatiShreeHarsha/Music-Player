import React from 'react'
import "../components_css/ProgressCircle.css"

let Circle = ({color,percentage,size,strokeWidth})=>{
    let radius=size/2 -10; //so that the circle does not get outside the given size
    let circ= (2*Math.PI* radius) -20; //so that its not a full circle and we can identify start and end
    let strokePct=((100-Math.round(percentage))*circ)/100;

    return <circle r={radius} cx="50%" cy="50%" fill="transparent" stroke={strokePct !==circ ? color:""} strokeWidth={strokeWidth} strokeDasharray={circ} strokeDashoffset={percentage ? strokePct :0}
    strokeLinecap='round'></circle>
};

function ProgressCircle({percentage, isPlaying, image, size, color}) {
  return (
     <div className="progress-circle flex">
        <svg width={size} height={size}>
            <g>
                <Circle strokeWidth={"0,4rem"} color="#3B4F73" size={size}/>
                <Circle strokeWidth={"0.6rem"} color={color} percentage={percentage} size={size}/>
            </g>
            <defs>
                <clipPath id='myCircle'>
                    <circle cx="50%" cy="50%" r={size/2 -30} fill="#FFFFFF"></circle>
                </clipPath>
                <clipPath id='myInnerCircle'>
                    <circle cx="50%" cy="50%" r={size/2 -100} fill="#FFFFFF"></circle>
                </clipPath>
            </defs>
            <image className={isPlaying?"music-active":""} x={30} y={30} width={2*(size/2-30)} height={2*(size/2-30)} href='https://w7.pngwing.com/pngs/210/343/png-transparent-vinyl-music-disk-audio-sound-vintage-disc-blank.png' clipPath='url(#myCircle)'/>
            <image className={isPlaying?"active":""} x={100} y={100} width={2*(size/2-100)} height={2*(size/2-100)} href={image} clipPath='url(#myInnerCircle)'/>
        </svg>
     </div>
  )
}

export default ProgressCircle
