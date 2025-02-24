import { useEffect, useRef, useState } from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { calcLimit, calcPage, calcSort, fetchProducts } from 'store/products/productsOperations';
import { toggleSidbar, toggleSidbarFilter } from 'store/view/viewSlice';
import AddProductForm from 'components/AddProductForm';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import s from './Home.module.css';
import Main from 'components/Main';
import { calcView } from 'store/view/viewOperations';
import FiltersView from 'components/FiltersView';

function Home() {
  const dispatch = useAppDispatch();
  const toast = useRef<Toast>(null);
  const products = useAppSelector(state => state.products);
  const visibleSidebar = useAppSelector(state => state.view.sidebar);
  const visibleSidebarFilter = useAppSelector(state => state.view.sidebarFilter);
  const sort = useAppSelector(state => state.products.sort);
  const page = useAppSelector(state => state.products.page);
  const limit = useAppSelector(state => state.products.limit);
  const filter = useAppSelector(state => state.products.filter);
  const [firstRender, setFirstRender] = useState(true);
  
  useEffect(() => {
    dispatch(calcView());
    dispatch(calcSort());
    dispatch(calcLimit());
    dispatch(calcPage());
    dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
      return
    };
    dispatch(fetchProducts());
  }, [sort, limit, page, filter]);

  useEffect(() => {
    if (products.error) showToast({
      severity: 'error', 
      summary: 'Error',
      detail: products.error,
      life: 3000,
    });
  }, [products.error]);

  const showToast = (options: any) => {
    if (!toast.current) throw Error("toast is not assigned");
    toast.current.show(options);
  };

  return (
    <>
      <div className={s.mainContainer}>
        {products.isLoading ? <ProgressSpinner /> : <Main products={products.items} />}
      </div>

      <Sidebar
        visible={visibleSidebarFilter}
        onHide={() => dispatch(toggleSidbarFilter(false))}
        className="w-full md:w-20rem lg:w-30rem"
        position="left"
      >
        <FiltersView />
      </Sidebar>
      <Sidebar
        visible={visibleSidebar}
        onHide={() => dispatch(toggleSidbar(false))}
        className="w-full md:w-20rem lg:w-30rem"
        position="right"
      >
        <AddProductForm showToast={showToast}/>
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
