import crypto from '../../test/crypto.jpg'
import './Result.scss'

export const Result = () => {
    return(
        <div className='Result'>
            <img className='image' src={crypto} />
            <span className='result'>Luck Percentage 84,5%</span>
        </div>
    );
}
