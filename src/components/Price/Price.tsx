import { Product } from 'interfaces/Products.interface';
import s from './Price.module.css';
import { useMemo } from 'react';

interface Props {
  product: Product | null;
};

function Price({ product }: Props) {
  const salePrice = useMemo(() => {
    const price = product?.price || 0;
    const sale = product?.sale || 0;
    return (price - (price * sale) / 100).toFixed(2);
  }, [product?.sale]);

  return (
    <div>
      <span className={product?.sale ? s.basePrice : undefined}>{product?.price} $</span>
      {product?.sale && (
        <span className="text-2xl font-semibold ml-1">{salePrice} $</span>
      )}
    </div>
  );
};

export default Price;