import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector } from 'react-redux';

function App() {

  const isShowCart = useSelector(state => state.cartItems.showCart);
  const cartItems = useSelector(state => state.updateCart.cartItems);

  return (
      <Layout cartItems={cartItems}>
        {isShowCart && <Cart />}
        <Products />
      </Layout>
  );
}

export default App;
