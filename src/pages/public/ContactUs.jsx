import React, { useState } from 'react';

export default function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div style={{ maxWidth: 1180, margin: '0 auto', padding: '2rem 1.25rem 4rem' }}>
      <section style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
        <div style={{ padding: '2rem', borderRadius: 24, background: 'linear-gradient(135deg, #eff6ff, #ecfeff)', border: '1px solid #cbd5e1' }}>
          <p style={{ fontWeight: 700, color: '#1d4ed8', marginBottom: 8 }}>Contact Us</p>
          <h1 style={{ marginBottom: 12 }}>Talk to the Purandar Estate team</h1>
          <p style={{ color: '#475569', lineHeight: 1.7 }}>We help buyers, tenants, owners, and agents discover and manage verified property listings across Purandar and nearby Pune locations.</p>
          <div style={{ marginTop: '1.25rem', display: 'grid', gap: 10 }}>
            <div><strong>Phone:</strong> +91 98765 43210</div>
            <div><strong>Email:</strong> support@purandarestate.com</div>
            <div><strong>Address:</strong> Saswad, Purandar, Pune, Maharashtra</div>
          </div>
        </div>

        <div style={{ padding: '2rem', borderRadius: 24, background: '#fff', border: '1px solid #cbd5e1' }}>
          <h2 style={{ marginBottom: 12 }}>Send us a message</h2>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
            <input className="styled-input" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <input className="styled-input" placeholder="Your email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            <textarea className="styled-textarea" rows={6} placeholder="How can we help you?" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
            <button type="submit" className="btn btn-primary">Send Message</button>
          </form>
          {submitted ? <p style={{ marginTop: 12, color: '#0f766e' }}>Message sent. We will get back to you soon.</p> : null}
        </div>
      </section>

      <section style={{ padding: '2rem', borderRadius: 24, background: '#fff', border: '1px solid #cbd5e1' }}>
        <p style={{ fontWeight: 700, color: '#1d4ed8', marginBottom: 8 }}>About Us</p>
        <h2 style={{ marginBottom: 12 }}>Built for practical property search and management</h2>
        <p style={{ color: '#475569', lineHeight: 1.8, marginBottom: 12 }}>Purandar Estate is a modern real estate platform focused on helping users browse verified listings, contact sellers, save favorites, and post new properties with a clean owner workflow.</p>
        <p style={{ color: '#475569', lineHeight: 1.8 }}>Our goal is to make local discovery simpler while keeping the experience responsive, searchable, and useful for both property seekers and property owners.</p>
      </section>
    </div>
  );
}
