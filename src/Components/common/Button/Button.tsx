import { FC, ReactElement, ReactNode } from "react"
import "./Button.scss"

type ButtonType = 'primary';

interface ButtonProps {
    children: ReactNode,
    type?: ButtonType,
    onClick?: () => void 
}

export const Button: FC<ButtonProps> = (props) => {
    const { children, type } = props;

    return(
        <div className='Button'>
            <div className={(type ?? 'primary')} onClick={props.onClick}>
                {children}
            </div>
        </div>
    );
}