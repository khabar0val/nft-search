import { FC, ReactNode } from "react"
import "./Card.scss";

interface CardProps {
    children: ReactNode
}

export const Card: FC<CardProps> = (props) => {
    return(
        <div className="Card">
            {props.children}
        </div>
    );
}