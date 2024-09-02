import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51Pq2e0GykZTQLEnASYRbCO8GoMcxjpI3O8MHgIsxy7i1pvLwLNa0iQ49khQ09hrBZhFI5452BWkQp084T1vQof41008CUD74EU',
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`,
    );
    console.log(session);

    // 2) Create checkout form + change credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch {
    console.log(err);
    showAlert('error', err);
  }
};
