import emailjs from "@emailjs/browser";
import { useRef, useState, useEffect } from "react";

export default function Contact() {
  const form = useRef();
  const [status, setStatus] = useState(null); // "success" | "error" | null
  const [fade, setFade] = useState(false); // controls opacity fade

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_ncqbleg",          // your EmailJS service ID
        "Email Contact Form",       // your template ID
        form.current,
        "5xuTTPIsjZ-5B_W24"         // your public key
      )
      .then(
        () => {
          setStatus("success");
          form.current.reset();
        },
        (error) => {
          console.error(error);
          setStatus("error");
        }
      );
  };

  // handle fade timing
  useEffect(() => {
    if (status) {
      setFade(true); // make it visible
      const fadeTimer = setTimeout(() => setFade(false), 3500); // start fade
      const clearTimer = setTimeout(() => setStatus(null), 4200); // hide fully
      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(clearTimer);
      };
    }
  }, [status]);

  return (
    <section
      id="contact"
      className="bg-white py-16 px-6 text-center max-w-3xl mx-auto"
    >
      <h3 className="text-3xl font-bold mb-6">Contact</h3>
      <p className="text-lg text-gray-700 mb-8">
        For commissions, purchase enquiries, or collaborations, reach Julie
        directly by email or send a quick message below.
      </p>

      {/* ✅ Success / Error banners */}
      {status && (
        <div
          className={`mb-6 p-3 rounded border transition-all duration-700 ease-in-out ${
            fade ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          } ${
            status === "success"
              ? "bg-green-100 text-green-800 border-green-300"
              : "bg-red-100 text-red-800 border-red-300"
          }`}
        >
          {status === "success"
            ? "✅ Message sent successfully!"
            : "❌ Failed to send message. Please try again later."}
        </div>
      )}

      <form ref={form} onSubmit={sendEmail} className="grid gap-4 text-left">
        <input
          type="text"
          name="from_name"
          placeholder="Your name"
          className="p-3 rounded bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
          required
        />
        <input
          type="email"
          name="from_email"
          placeholder="Your email"
          className="p-3 rounded bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
          required
        />
        <textarea
          name="message"
          rows="4"
          placeholder="Your message"
          className="p-3 rounded bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
          required
        />
        <button
          type="submit"
          className="bg-pink-600 hover:bg-pink-700 text-white text-lg font-semibold py-2 rounded transition"
        >
          Send Message
        </button>
      </form>
    </section>
  );
}
