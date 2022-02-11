// https://www.youtube.com/watch?v=5y5WwF9s-ZI&list=PLy1nL-pvL2M6HFApWUDSGA4Y7btyKx7cE&index=1
import PaymentForm from "./PaymentForm";
// stripe elements allows me to collect sensetive payment info  using customizable ui components
// react stripe js is thin wrapper around stripe element it allows to add element to any react app using components
// if we are building an integration with stripe checkout rather than a custom payment form we only need stripe js


function App() {
  return (
    <div className="App">
      <h2>Stripe Payment</h2>
      <PaymentForm />
    </div>
  );
}

export default App;
