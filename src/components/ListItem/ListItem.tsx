import { Product } from 'interfaces/Products.interface';
import ImageProduct from 'components/ImageProduct';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';
import s from './ListItem.module.css';

interface Props {
  product: Product;
  onDeleteProduct: (id: number) => void;
  showDetailProduct: (id: number) => void;
};

function ListItem({ product, onDeleteProduct, showDetailProduct }: Props) {
  return (
    <div className="col-12 cursor-pointer" key={product.id} onClick={() => showDetailProduct(product.id)}>
      <div className={s.deleteButton}>
        <Button icon="pi pi-times" rounded text severity="danger" aria-label="Cancel" onClick={() => onDeleteProduct(product.id)} />
      </div>
      <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4')}>
        <ImageProduct image={product.picture} name={product.name} />
        <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
          <div className="flex flex-column align-items-center sm:align-items-start gap-3">
            <div className="text-2xl font-bold text-900">{product.name}</div>
            <div className="flex align-items-center gap-3">
              <span className="flex align-items-center gap-2">
                <i className="pi pi-tag"></i>
                <span className="font-semibold">{product.vendorCode}</span>
              </span>
            </div>
          </div>
          <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
            <span className="text-2xl font-semibold">{product.price} $</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItem;