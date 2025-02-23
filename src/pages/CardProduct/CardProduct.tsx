import ImageProduct from "components/ImageProduct";
import { Card } from "primereact/card";
import { useEffect } from "react";
import { useParams } from "react-router";
import { fetchProduct } from "store/detailProduct/detailProductOperations";
import { useAppDispatch, useAppSelector } from "store/hooks";
import s from './CardProduct.module.css';

function CardProduct() {
  let { id } = useParams();
  const dispatch = useAppDispatch();
  const product = useAppSelector(state => state.detailsProduct.product);
  
  useEffect(() => {
    if (id) dispatch(fetchProduct(+id));
  }, []);
  
  const header = (
    <ImageProduct 
      image={product?.picture} 
      name={product?.name || 'image-product'} 
    />
  );
  const footer = (
    <>
      <span className="text-2xl font-semibold">
        {product?.price} $
      </span>
    </>
  );

  return (
    <div 
      className={`card flex justify-content-center pt-5 ${s.container}`}
    >
      <Card 
        title={product?.name} 
        subTitle={product?.vendorCode} 
        footer={footer} 
        header={header} 
        className="md:w-50rem"
      >
        <p className="m-0">
          {product?.description}
        </p>
      </Card>
    </div>
  );
}

export default CardProduct;
