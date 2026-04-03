import React from 'react';
import { Mail, Phone, UserRound } from 'lucide-react';

function resolveContact(item = {}) {
  return item.useCustomContactDetails
    ? {
        name: item.customContactName || item.contactPersonName || item.displaySellerName || item.owner?.name || item.userName || 'Contact',
        phone: item.customContactPhone || item.phoneNumber || item.displaySellerPhone || item.owner?.phone || '',
        email: item.customContactEmail || item.email || item.displaySellerEmail || item.owner?.email || '',
      }
    : {
        name: item.contactPersonName || item.owner?.name || item.userName || 'Contact',
        phone: item.phoneNumber || item.owner?.phone || '',
        email: item.email || item.owner?.email || '',
      };
}

export default function ContactCard({ item = {}, buttonLabel = 'Enquire Now', onAction, helperText = 'Get in touch for floor plans, pricing, and site visits.' }) {
  const contact = resolveContact(item);

  return (
    <div className="pd-contact-card">
      <h3>Contact details</h3>
      <p>{helperText}</p>
      <div className="pd-chip-list" style={{ marginBottom: 16 }}>
        <span className="pd-info-chip"><UserRound size={14} /> {contact.name || 'Not shared'}</span>
        {contact.phone ? <span className="pd-info-chip"><Phone size={14} /> {contact.phone}</span> : null}
        {contact.email ? <span className="pd-info-chip"><Mail size={14} /> {contact.email}</span> : null}
      </div>
      <button type="button" className="pd-contact-btn" onClick={onAction}>
        <Phone size={16} /> {buttonLabel}
      </button>
    </div>
  );
}

export { resolveContact };
