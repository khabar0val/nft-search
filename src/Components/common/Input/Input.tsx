import { ChangeEvent, FC } from "react";
import './Input.scss'

interface InputProps {
    value?: string,
    onChange?: (e: ChangeEvent) => void
}

export const Input: FC<InputProps> = (props) => {
    return(
        <div className='Input'>
            <input onChange={props.onChange} className='input' />
        </div>
    );
}