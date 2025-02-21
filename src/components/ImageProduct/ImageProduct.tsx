import { API_URL } from 'constants/urls';
import s from './ImageProduct.module.css';

interface Props {
  image?: string;
  name: string;
};

const ImageProduct = ({ image, name }: Props) => {
  return (
    <div className={s.container}>
      <img 
        className="shadow-2 border-round" 
        width={100} 
        src={image ? `${API_URL}${image}` : require('../../assets/images/not-image.jpg')} 
        alt={name} 
      />
    </div>
  )
};

export default ImageProduct;