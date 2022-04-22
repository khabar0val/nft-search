import { Button } from "../Button/index";
import { Card } from "../Card/index";
import "./CardNFT.scss";

export const CardNFT = () => {
    return(
        <Card>
            <div className="CardNFT">
                <img className="image" src="https://github.com/khabar0val/nft-search/blob/master/img/NFT_05ab65e026955f3c9b31daec505a1b1fe7513448e01d9cd27309e0fff5648e9c.png?raw=true" />
                <div className="nav">
                    <span className="title">Заголовок 11111111111111111111111111111111111111111111222</span>
                    <Button>Подробнее</Button>
                </div>
            </div>
        </Card>
    );
}