import { useNavigate } from "react-router-dom";
import { Button } from "../../Components/common/Button";
import './Main.scss';

export const Main = () => {
    const nav = useNavigate();

    return(
        <div className="Main">
            <h1>Let check your NFT!</h1>
            <Button onClick={() => nav('/check')}>Check It!</Button>
        </div>
    );
}