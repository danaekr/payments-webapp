const stripe = Stripe('put your own stripe public key here');

document.querySelectorAll(".subscribe-button").forEach(button => {
  button.addEventListener("click", async () => {
    const price = button.getAttribute("data-price");
    const response = await fetch("http://localhost:3000/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: price * 100 })
    });
    const { clientSecret } = await response.json();

    const elements = stripe.elements();
    const card = elements.create("card");
    card.mount("#card-element");

    const form = document.getElementById("payment-form");
    const paymentSection = document.getElementById("payment-section");
    paymentSection.classList.remove("hidden");
    paymentSection.classList.add("visible");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card
        }
      });
      const message = document.getElementById("payment-message");
      if (error) {
        message.textContent = error.message;
      } else if (paymentIntent.status === "succeeded") {
        message.textContent = "Payment successful!";
      }
    });
  });
});

const faders = document.querySelectorAll('.fade-in');
const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    observer.unobserve(entry.target);
  });
}, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
faders.forEach(fader => appearOnScroll.observe(fader));
