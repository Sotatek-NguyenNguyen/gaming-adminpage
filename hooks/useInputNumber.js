import {useState} from 'react'

const useInputNumber = init => {
    const [value, setValue] = useState(init);
    const regexp  = /^\d*\.?\d{0,7}$/;
    
    const handleChange = (e) => {
        const newValue = e.target.value;
        if(regexp .test(newValue) || newValue === ''){
            setValue(newValue);
        }
    }

    const setVal = (val) => {
        if(regexp .test(val) || val === ''){
            setValue(val);
        }
    }

    return [value, handleChange, setVal];
} 

export default useInputNumber;