import { Card } from "primereact/card";
import { useEffect } from "react";
import { useParams } from "react-router";
import { fetchProduct } from "store/detailProduct/detailProductOperations";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import s from './CardProduct.module.css';
import { ProgressSpinner } from "primereact/progressspinner";
import ImageDetailsProduct from "components/ImageDetailsProduct";
import { Tag } from "primereact/tag";
import Price from "components/Price";

function CardProduct() {
  let { id } = useParams();
  const dispatch = useAppDispatch();
  const product = useAppSelector(state => state.detailsProduct.product);
  const isLoading = useAppSelector(state => state.detailsProduct.isLoading);
  
  useEffect(() => {
    if (id) dispatch(fetchProduct(+id));
  }, []);
  
  const footer = (
    <div className={s.footer}>
      <Price product={product}/>
      {product?.sale && (
        <Tag 
          className="mt-2" 
          icon="pi pi-percentage" 
          severity="danger" 
          value={product.sale}
        ></Tag>
      )}
    </div>
  );

  return (
    <div 
      className={`card flex justify-content-center pt-5 ${s.container}`}
    >
      {isLoading ? (
        <ProgressSpinner className={s.spinner}/>
      ) : (
        <Card 
          title={product?.name} 
          subTitle={product?.vendorCode} 
          footer={footer} 
          header={<ImageDetailsProduct/>} 
          className="md:w-50rem"
        >
          <p className="m-0">
            {product?.description}
          </p>
        </Card>
      )}
    </div>
  );
}

export default CardProduct;
