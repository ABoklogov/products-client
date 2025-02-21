import { DataViewLayoutOptions } from 'primereact/dataview';
import s from './Header.module.css';
import { View } from 'interfaces/View';
import { useAppDispatch } from 'store/hooks';
import { changeView } from 'store/view/viewOperations';

interface Props {
  view: View;
};

function Header({view}: Props) {
  const dispatch = useAppDispatch();
  
  const onChangeView = (e: any) => {
    dispatch(changeView(e.value))
  };
  return (
    <div className="flex justify-content-end">
      <DataViewLayoutOptions layout={view} onChange={onChangeView} />
    </div>
);
};

export default Header;