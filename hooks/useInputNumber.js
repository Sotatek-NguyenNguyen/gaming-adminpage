import {useState} from 'react'

const useInputNumber = init => {
    const [value, setValue] = useState(init);

    const handleChange = (e) => {
        const newValue = e.target.value;
        if(/^\d*\.?\d*$/.test(newValue) || newValue === ''){
            setValue(newValue);
        }
    }

    const setVal = (val) => {
        if(/^\d*\.?\d*$/.test(val) || val === ''){
            setValue(val);
        }
    }

    return [value, handleChange, setVal];
} 

export default useInputNumber;