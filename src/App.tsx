import React, { useEffect, useState } from 'react';
import './App.scss';
import { SecInput } from './SecInput';
import { Valid } from './models';

const useValidathion = (value:string, validators:Valid) => {
  
  const [isEmpty, setEmpty] = useState(true)
  const [minLength, setMinLength]= useState(false)
  const [isSpecialError, setIsSpecialError] = useState(false);
  const [imputValid, setInputValid] = useState(false);
  const [maxLength, setMaxLength] = useState(false);

  useEffect(() => {
    for (const validathion in validators) {
      switch (validathion) {
        case 'minLength':
          value.length < validators[validathion] ? setMinLength(true) : setMinLength(false)
          break;
        case 'isEmpty':
             value ? setEmpty(false):setEmpty(true)
          break;
        case 'isSpecialError':
          let regex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
        
          regex.test(String(value).toLowerCase()) ? setIsSpecialError(true) : setIsSpecialError(false)
          break;
        case 'maxLength':
          value.length > validators[validathion] ? setMaxLength(true) : setMaxLength(false)
    
      }
    }
  },[value])
   

  useEffect(() => {
    if (isEmpty || isSpecialError || minLength || maxLength) {
      setInputValid(false)
    } else {
      setInputValid(true);
    }

  },[isEmpty,isSpecialError,minLength, maxLength])

  return {
    isEmpty,
    minLength,
    isSpecialError,
    imputValid,
    maxLength,
  }

}
const newArr: Array<string> = [];

const useInput = (initalValue: string, validathion:Valid)=>{
  const [val, setVal] = useState(initalValue);
  const [isDirty,setIsDirty]=useState(false)
  const valid = useValidathion(val, validathion)
 
  const onChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setVal(event.target.value)    
  }
  
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newString = '#' + val;
    newArr.push(newString);
    localStorage.setItem('color', JSON.stringify(newArr));
    setVal('');
  }

  const onBlur = () => {
    setIsDirty(true)
  }
  
  return {
    val, 
    onChange,
    onBlur,
    ...valid,
    isDirty,
    onSubmit,
  }
      
}

const getPreview = () => {
  const el = localStorage.getItem('color')
  const newString = JSON.parse(el || '')
  return newString
}


function App() {
  const va = useInput('', { isEmpty: true, minLength: 6, maxLength:6 ,isSpecialError:false});
 
 
  return (
    <div >
      <div className='main'>
      <form className='frm' onSubmit={va.onSubmit}>
        <h1>Write a color</h1>
        {(va.isDirty && va.isEmpty) && <div style={{color:'red'}}>enter a value</div> }
        {(va.isDirty && va.minLength) && <div style={{color:'red'}}>minimum quantity</div>}
        {(va.isDirty && va.isSpecialError) && <div style={{color:'red'}}>the presence of a special symbol is prohibited</div>}
        <input className='inp-frs' onChange={e => va.onChange(e)} onBlur={e => va.onBlur()} value={va.val} name='val' placeholder='write a own color' /> 
        <button className='btnm btn' disabled={!va.imputValid} type='submit'>On Submit</button>
      </form>
      
     
      <SecInput />
      </div>
     
    </div>
  );
}

export default App;
