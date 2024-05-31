import { updateCartActions } from '../../store/updateCart';
import { useDispatch } from 'react-redux';
import classes from './CartItem.module.css';

const CartItem = (props) => {
  const { title, quantity, total, price, id } = props.item;

  const dispatch = useDispatch();
  const onaddCart = () =>{
    dispatch(updateCartActions.handleAddToCart( {id, title, price,} ));
  }

  const onremoveCart = () =>{
    dispatch(updateCartActions.handleRemovefromCart(id));
  }

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={onremoveCart}>-</button>
          <button onClick={onaddCart}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
