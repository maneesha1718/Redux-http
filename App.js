import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { Fragment } from 'react';
import Notification from './components/UI/Notification';
import { sendCartData } from './store/cartBackend';
import { fetchCartData } from './store/cartBackend';

let isInitial = true;

function App() {

  const isShowCart = useSelector(state => state.cartItems.showCart);
  const cart = useSelector(state => state.updateCart);
  const notification = useSelector(state => state.cartItems.notification);

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    dispatch(sendCartData(cart));
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && <Notification status= {notification.status} title= {notification.title} message= {notification.message} />}
      <Layout >
        {isShowCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
