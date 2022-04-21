import { FC, ReactNode } from "react"
import "./Button.scss"

type ButtonType = 'primary';

interface ButtonProps {
    children: ReactNode,
    type?: ButtonType
}

export const Button: FC<ButtonProps> = (props) => {
    const { children, type } = props;

    return(
        <div className='Button'>
            <div className={(type ?? 'primary')}>
                {children}
            </div>
        </div>
    );
}