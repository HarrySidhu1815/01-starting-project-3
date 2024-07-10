import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async() => {
            const response = await fetch('https://reduxcart-d17e0-default-rtdb.firebaseio.com/cart.json')
            
            if(!response.ok){
                throw new Error('Failed to fetch the data')
            }

            const data = await response.json()
            return data
        }
        try {
            const cartData = await fetchData()
            dispatch(cartActions.replaceCart({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity
            }))
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                  status: "error",
                  title: "Error!",
                  message: "Sending cart data failed!",
                })
              )
        }
    }
}

export const sendCartData = (cart) => {
    return async (dispatch) => {
      dispatch(
        uiActions.showNotification({
          status: "penidng",
          title: "Sending...",
          message: "Sending cart data",
        })
      );
      const sendCartData = async () => {
        const response = await fetch(
          "https://reduxcart-d17e0-default-rtdb.firebaseio.com/cart.json",
          {
            method: "PUT",
            body: JSON.stringify({
                items: cart.items,
                totalQuantity: cart.totalQuantity
            }),
          }
        );
  
        if (!response.ok) {
          throw new Error("Sending the cart data failed");
        }
      };
      try {
          await sendCartData()
          dispatch(
            uiActions.showNotification({
              status: "success",
              title: "Success!",
              message: "Your data is successfully sent!",
            })
          );
      } catch (error) {
          dispatch(
            uiActions.showNotification({
              status: "error",
              title: "Error!",
              message: "Sending cart data failed!",
            })
          )
      }
    };
  };