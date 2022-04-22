import { Card } from '../../Components/common/Card';
import { UploadImage } from '../../Components/common/UploadImage';
import './Check.scss';

export const Check = () => {
    return(
        <div className='Check'>
            <Card>
                <UploadImage />
            </Card>
        </div>
    );
}