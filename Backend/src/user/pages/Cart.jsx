// import React, { useEffect, useState } from "react";
// import API from "../../services/api";
// import { useNavigate } from "react-router-dom";
// import "./Cart.css";

// function Cart() {
//   const [cart, setCart] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     loadCart();
//   }, []);

//   const loadCart = async () => {
//     try {
//       const email = localStorage.getItem("email");
//       const res = await API.get(`/student/cart?email=${email}`);
//       setCart(res.data); // ✅ direct set
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // ✅ REMOVE
//   const removeItem = async (id) => {
//     await API.delete(`/student/remove-from-cart/${id}`);

//     // instant UI update
//     setCart(cart.filter((item) => item.id !== id));
//   };

//   // ✅ UPDATE QTY (FINAL FIX)
//   const updateQty = async (id, newQty) => {
//     if (newQty < 1) return;

//     try {
//       await API.put(
//         `/student/update-quantity?cartId=${id}&quantity=${newQty}`
//       );

//       // ✅ ONLY LOCAL UPDATE (NO loadCart)
//       setCart((prev) =>
//         prev.map((item) =>
//           item.id === id
//             ? { ...item, quantity: newQty }
//             : item
//         )
//       );
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // ✅ TOTAL
//   const total = cart.reduce(
//     (sum, item) => sum + item.course.price * item.quantity,
//     0
//   );

//   // ✅ CHECKOUT
//   const goToCheckout = async () => {
//     const email = localStorage.getItem("email");

//     if (!email || cart.length === 0) {
//       alert("Cart empty ❌");
//       return;
//     }

//     setLoading(true);

//     try {
//       await API.post(`/student/create-order?email=${email}`);
//       navigate("/checkout");
//     } catch (e) {
//       alert("Error ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="cart-wrapper">
//       <h2>Your Cart 🛒</h2>

//       {cart.length === 0 ? (
//         <p>Cart is empty ❌</p>
//       ) : (
//         <>
//           <div className="cart-list">
//             {cart.map((item) => (
//               <div className="cart-item" key={item.id}>
//                 <img
//                   src={
//                     item.course.imageUrl ||
//                     "https://via.placeholder.com/150"
//                   }
//                   alt="course"
//                 />

//                 <div className="cart-info">
//                   <h3>{item.course.courseName}</h3>
//                   <p>₹ {item.course.price}</p>

//                   <div className="qty">
//                     <button
//                       onClick={() =>
//                         updateQty(item.id, item.quantity - 1)
//                       }
//                     >
//                       -
//                     </button>

//                     {/* ✅ NORMAL render */}
//                     <span>{item.quantity}</span>

//                     <button
//                       onClick={() =>
//                         updateQty(item.id, item.quantity + 1)
//                       }
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>

//                 <button
//                   onClick={() => removeItem(item.id)}
//                   className="remove"
//                 >
//                   ❌
//                 </button>
//               </div>
//             ))}
//           </div>

//           <div className="cart-footer">
//             <h3>Total: ₹ {total}</h3>

//             <button
//               onClick={goToCheckout}
//               disabled={loading}
//               className="checkout-btn"
//             >
//               {loading ? "Processing..." : "Proceed to Checkout"}
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default Cart;

import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const email = localStorage.getItem("email");
      const res = await API.get(`/student/cart?email=${email}`);
      setCart(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // REMOVE ITEM
  const removeItem = async (id) => {
    await API.delete(`/student/remove-from-cart/${id}`);
    setCart(cart.filter((item) => item.id !== id));
  };

  // UPDATE QUANTITY
  const updateQty = async (id, newQty) => {
    if (newQty < 1) return;

    try {
      await API.put(
        `/student/update-quantity?cartId=${id}&quantity=${newQty}`
      );

      setCart((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: newQty } : item
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  // TOTAL
  const total = cart.reduce(
    (sum, item) => sum + item.course.price * item.quantity,
    0
  );

  // CHECKOUT
  const goToCheckout = async () => {
    const email = localStorage.getItem("email");

    if (!email || cart.length === 0) {
      alert("Cart empty ❌");
      return;
    }

    setLoading(true);

    try {
      await API.post(`/student/create-order?email=${email}`);
      navigate("/checkout");
    } catch (e) {
      alert("Error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cart-wrapper">
      <h2>Your Cart 🛒</h2>

      {cart.length === 0 ? (
        <div className="empty-cart">Cart is empty ❌</div>
      ) : (
        <>
          <div className="cart-list">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img
                  src={item.course.imageUrl || "https://via.placeholder.com/150"}
                  alt="course"
                />

                <div className="cart-info">
                  <h3>{item.course.courseName}</h3>
                  <p className="price">₹ {item.course.price}</p>

                  <div className="qty">
                    <button onClick={() => updateQty(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQty(item.id, item.quantity + 1)}>+</button>
                  </div>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="remove-btn"
                >
                  ❌
                </button>
              </div>
            ))}
          </div>

          <div className="cart-footer">
            <h3>Total: ₹ {total}</h3>

            <button
              onClick={goToCheckout}
              disabled={loading}
              className="checkout-btn"
            >
              {loading ? "Processing..." : "Proceed to Checkout"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;