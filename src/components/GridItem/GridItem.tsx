import { Product } from 'interfaces/Products.interface';
import ImageProduct from 'components/ImageProduct';
import { Button } from 'primereact/button';
import s from './GridItem.module.css';
import { Tag } from 'primereact/tag';
import Price from 'components/Price';

interface Props {
  product: Product;
  onDeleteProduct: (id: number) => void;
  showDetailProduct: (id: number) => void;
};

function GridItem({ product, onDeleteProduct, showDetailProduct}: Props) {
  return (
    <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2 cursor-pointer" key={product.id} onClick={() => showDetailProduct(product.id)}>
      <div className="p-4 border-1 surface-border surface-card border-round">
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
          <div className="flex align-items-center gap-2">
            <i className="pi pi-tag"></i>
            <span className="font-semibold">{product.vendorCode}</span>
          </div>
          <Button icon="pi pi-times" rounded text severity="danger" aria-label="Cancel" onClick={() => onDeleteProduct(product.id)}/>
        </div>
        <div className="flex flex-column align-items-center gap-3 py-5">
          <ImageProduct image={product.picture} name={product.name} />
          <div className="text-2xl font-bold">{product.name}</div>
        </div>
        <div className="flex align-items-center justify-content-between">
          <Price product={product}/>
          {product.sale && (
            <Tag icon="pi pi-percentage" severity="danger" value={product.sale}></Tag>
          )}
        </div>
      </div>
    </div>
  );
};

export default GridItem;