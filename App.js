import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { Fragment } from 'react';
import Notification from './components/UI/Notification';
import { cartItemsAction } from './store/cartItems';
import { updateCartActions } from './store/updateCart';


let isInitial = true;

function App() {

  const isShowCart = useSelector(state => state.cartItems.showCart);
  const cart = useSelector(state => state.updateCart);
  const notification = useSelector(state => state.cartItems.notification);

  const dispatch = useDispatch();

  useEffect(() => {
    const sendCartData = async () => {

      dispatch(
        cartItemsAction.handleNotification({
          status: 'pending',
          title: 'Sending...',
          message: 'Sending cart data!',
        })
      );

      const response = await fetch(
        'https://reducer-cart-default-rtdb.europe-west1.firebasedatabase.app/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        throw new Error('Sending cart data failed.');
      }

      dispatch(
        cartItemsAction.handleNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent cart data successfully!',
        })
      );
    };

    if (isInitial) {
      isInitial = false;
      return;
    }

    sendCartData().catch((error) => {
      dispatch(
        cartItemsAction.handleNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed!',
        })
      );
    });
  }, [cart, dispatch]);

  useEffect(() => {
    const fetchCartData = async () => {

      dispatch(
        cartItemsAction.handleNotification({
          status: 'pending',
          title: 'Sending...',
          message: 'Sending cart data!',
        })
      );

      const response = await fetch(
        'https://reducer-cart-default-rtdb.europe-west1.firebasedatabase.app/cart.json',);

      if (!response.ok) {
        throw new Error('Fetching cart data failed.');
      }

      const data = await response.json();

      dispatch(
        updateCartActions.replaceCart(data)
      );
    };

    if (isInitial) {
      isInitial = false;
      return;
    }

    fetchCartData().catch((error) => {
      dispatch(
        cartItemsAction.handleNotification({
          status: 'error',
          title: 'Error!',
          message: 'Fetching cart data failed!',
        })
      );
    });
  }, [dispatch] )


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
