import { useState } from "react"

interface StringFormProps {
    placeholderValue: string,
    minLength: number,
    maxLength: number,
    isNumeric: boolean,
    isRequired: boolean
}

export default function StringForm( 
    {placeholderValue, minLength, maxLength, isNumeric, isRequired} : StringFormProps
){
    
    const [formValue, setFormValue] = useState<string>()
    
    const regexExpression = (isNumeric)? "^\d+$" : ""
    
    return (
        <input
        className="placeholder-opacity-200"
        type="text"
        required = {isRequired}
        minLength = {minLength}
        maxLength = {maxLength}
        size = {maxLength}
        placeholder = {placeholderValue}
        pattern={regexExpression}
        />
    )
}

