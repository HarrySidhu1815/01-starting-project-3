import { useDispatch, useSelector } from 'react-redux';
import classes from './CartButton.module.css';
import {uiActions} from '../../store/ui-slice.js'

const CartButton = (props) => {
  const dispatch = useDispatch()
  const cartQuantity = useSelector(state => state.cart.totalQuantity)
  function handleToogleCart(){
    dispatch(uiActions.toogle())
  }
  return (
    <button className={classes.button} onClick={handleToogleCart}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
