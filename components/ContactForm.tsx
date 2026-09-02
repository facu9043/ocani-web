"use client";

import { useState } from "react";

export default function ContactForm({ whatsappNumber }: { whatsappNumber: string }) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const lines = [
      "Hola Ocani! Te escribo desde la web.",
      "",
      `Nombre: ${name}`,
      `Email/Teléfono: ${contact}`,
      "",
      message,
    ];

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="text-sm font-medium text-ink/80">
          Nombre
        </label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="mt-1.5 w-full rounded-xl border border-forest-dark/20 bg-cream px-4 py-2.5 text-sm text-ink placeholder:text-ink/40 focus:border-forest focus:outline-none"
          placeholder="Tu nombre"
        />
      </div>

      <div>
        <label htmlFor="contact" className="text-sm font-medium text-ink/80">
          Email o teléfono
        </label>
        <input
          id="contact"
          type="text"
          required
          value={contact}
          onChange={(event) => setContact(event.target.value)}
          className="mt-1.5 w-full rounded-xl border border-forest-dark/20 bg-cream px-4 py-2.5 text-sm text-ink placeholder:text-ink/40 focus:border-forest focus:outline-none"
          placeholder="Para responderte"
        />
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium text-ink/80">
          Mensaje
        </label>
        <textarea
          id="message"
          required
          rows={4}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="mt-1.5 w-full resize-none rounded-xl border border-forest-dark/20 bg-cream px-4 py-2.5 text-sm text-ink placeholder:text-ink/40 focus:border-forest focus:outline-none"
          placeholder="Contanos qué necesitás"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-forest-dark px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-forest"
      >
        Enviar por WhatsApp
      </button>
    </form>
  );
}
