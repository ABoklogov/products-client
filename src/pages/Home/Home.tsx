import { useEffect, useRef } from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { fetchProducts } from 'store/products/productsOperations';
import { toggleSidbar } from 'store/view/viewSlice';
import Header from 'components/Header';
import AddEventForm from 'components/AddEventForm';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import s from './Home.module.css';
import Main from 'components/Main';
import { calcTheView } from 'store/view/viewOperations';

function Home() {
  const products = useAppSelector(state => state.products);
  const visibleSidebar = useAppSelector(state => state.view.sidebar);
  const dispatch = useAppDispatch();
  const toast = useRef<Toast>(null);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(calcTheView());
  }, []);

  useEffect(() => {
    if (products.error) showToast(products.error);
  }, [products.error]);

  const showToast = (message: string) => {
    if (!toast.current) throw Error("toast is not assigned");
    toast.current.show({
      severity: 'error', summary: 'Error', detail: message, life: 3000
    });
  };

  return (
    <>
      {/* <Header /> */}
      <div className={s.mainContainer}>
        {products.isLoading ? <ProgressSpinner /> : <Main products={products.items} />}
      </div>

      <Sidebar
        visible={visibleSidebar}
        onHide={() => dispatch(toggleSidbar(false))}
        className="w-full md:w-20rem lg:w-30rem"
        position="right"
      >
        <AddEventForm />
      </Sidebar>
      <Button
        icon="pi pi-plus"
        rounded
        style={{ position: 'fixed', right: '50px', bottom: '50px' }}
        onClick={() => dispatch(toggleSidbar(true))}
      />
      <Toast ref={toast} />
    </>
  );
}

export default Home;
