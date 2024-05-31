import { useSelector, useDispatch } from 'react-redux';
import { cartItemsAction } from '../../store/cartItems';
import classes from './CartButton.module.css';

const CartButton = (props) => {

  const totalQuantity = useSelector(state => state.updateCart.totalQuantity);

  const dispatch = useDispatch();

  const onShowCart = () =>{
    //console.log('clicked')
    dispatch(cartItemsAction.handleShowCart())
  }

  return (
    <button className={classes.button} onClick={onShowCart}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
