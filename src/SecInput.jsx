import React, { useState } from 'react';
import './App.scss';

const convertByRGB = () => {
    const newArr = [];
    const val = localStorage.getItem('color');
    const newarr = JSON.parse(val);
    
    for (let i = 0; i < newarr.length; i++) {
        let bigit = parseInt(newarr[i].split('#')[1], 16);
        let r = (bigit >> 16) & 255;
        let g = (bigit >> 8) & 255;
        let b = bigit & 255;
        newArr.push('rgb(' + r + ',' + g + ',' + b + ')');
    }
    return newArr
}
 
const filerColor = (id) => {
    const arr = convertByRGB();
    if (id===1) {
        const sortbyRed = arr.filter((e) => Number(e[4]) > (Number(e[6]) + Number(e[8]))) 
        return sortbyRed;
    } else if (id===2) {
        const sortbyGreen = arr.filter((e) => Number(e[6]) > (Number(e[4]) + Number(e[8])))
        return sortbyGreen;
    } else if (id===3) {
        const sortbyBlue = arr.filter((e) => Number(e[8]) > (Number(e[4]) + Number(e[6]))) 
        return sortbyBlue;
    } 
    return arr;
}

export const SecInput = () => {
    const [data, setData] = useState([]);
    const newArray = convertByRGB();
    const onButton = (id) => {
       setData(filerColor(id)); 
     }

    return (
        <div className='inp-sec'>
        <button  className='btr btn' onClick={()=>onButton(1)}>Red</button>
        <button  className='btg btn' onClick={()=>onButton(2)}>Green</button>
        <button  className='btb btn' onClick={()=>onButton(3)}>Blue</button>
     <h1>List of all Colors</h1>
    <ul >
    {newArray.map((e, index) => (
        <li className='lu-el1' key={index}>
            {e}
         <div className='lu-col' style={{background:e , width:'20px', height:'20px'}} ></div>   
         </li>
     ))}           
     </ul>
       
    <h1>Sort List Colors</h1> 
        <ul>
            {data.map((e,index) => (
                <li className='lu-el1'  key={index}>
                  {e} 
        </li>
        ))}
        </ul> 
            
      </div>
  )
}
