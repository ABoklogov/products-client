import { Card } from 'primereact/card';
import s from './CardContent.module.css';
import { Avatar } from 'primereact/avatar';
import { Product } from 'interfaces/Products.interface';
const selectedStyles = {
  backgroundColor: 'var(--highlight-bg)'
};

function CardContent({
  id,
  name,
  description,
  vendorCode,
  picture,
  price,
  sale
}: Product) {
  return (
    <Card>
      <div className={s.content}>
        <div className={s.contentBody}>
          <div className={s.contentRight}>
            <div className={s.contentSubBox}>
              <div className={s.label}>Артикул:</div>
              <div className={s.value}>{vendorCode}</div>
            </div>
            {/* <div className={s.contentSubBox}>
              <div className={s.label}>Важность:</div>
              <div className={s.value}>{importance}</div>
            </div> */}
            {/* <div className={s.contentSubBox}>
              <div className={s.label}>Оборудование:</div>
              <div className={s.value}>{equipment}</div>
            </div> */}
          </div>

          <div className={s.contentAvatar}>
            <Avatar
              style={{ marginBottom: '10px' }}
              icon="pi pi-user"
              size="xlarge"
              shape="circle"
            />
            {/* <div className={s.value}>{responsible}</div> */}
          </div>
        </div>

        <div className={s.contentFooter}>
          <div className={s.label}>Описание:</div>
          <div className={s.value}>{description}</div>
        </div>
      </div>
    </Card>
  );
};

export default CardContent;