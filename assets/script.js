const form = document.querySelector("#eventForm");
const status = document.querySelector("#formStatus");

if (form && status) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = data.get("name") || "there";
    const eventType = data.get("event") || "event";
    const location = data.get("location") || "the venue";

    status.textContent = `Thanks ${name}. Your ${eventType.toLowerCase()} enquiry for ${location} is ready. Connect this form to Formspree or email to send it directly.`;
    status.classList.add("is-visible");
  });
}
