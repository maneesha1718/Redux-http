import { cartItemsAction } from './cartItems';
import { updateCartActions } from './updateCart';

export const fetchCartData = () => {
  return (dispatch) => {
    dispatch(cartItemsAction.handleNotification({
      status: 'pending',
      title: 'Updating',
      message: 'Cart updation inprogress'
    }))

    const fetchRequest = async () => {
      const response = await fetch(
        'https://reducer-cart-default-rtdb.europe-west1.firebasedatabase.app/cart.json',
      );

      if (!response.ok) {
        throw new Error('Fetching data failed!')
      }

      const data = await response.json()

      dispatch(updateCartActions.replaceCart({
        cartItems: data.cartItems || [],
        totalQuantity: data.totalQuantity
      }))
    }

    fetchRequest().catch(error => {
      dispatch(cartItemsAction.handleNotification({
        status: 'error',
        title: 'Error',
        message: 'Failed to fetch data to Backend!'
      }))
    });
  }
}

export const sendCartData = (cart) => {
  return (dispatch) => {
    dispatch(cartItemsAction.handleNotification({
      status: 'pending',
      title: 'Updating',
      message: 'Cart updation inprogress'
    }))

    const sendRequest = async () => {
      const response = await fetch(
        'https://reducer-cart-default-rtdb.europe-west1.firebasedatabase.app/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error('Sending data failed!')
      }

      else {
        console.log('Yoo')
      }

      const data = await response.json()

      dispatch(cartItemsAction.handleNotification({
        status: 'success',
        title: 'Success..!',
        message: 'Data uploaded successfully!'
      }))
    }

    sendRequest().catch(error => {
      dispatch(cartItemsAction.handleNotification({
        status: 'error',
        title: 'Error',
        message: 'Failed to send data to Backend!'
      }))
    });
  }
}