const ALLOWED_TAGS = ['p', 'br', 'strong', 'em', 'u', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'blockquote', 'a'];

const escapeHtml = (value = '') => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

export const sanitizeHtml = (input = '') => {
  const value = String(input);

  let cleaned = value
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, '')
    .replace(/<(iframe|object|embed|form|input|button|textarea|select)[\s\S]*?>[\s\S]*?<\/\1>/gi, '')
    .replace(/\son\w+="[^"]*"/gi, '')
    .replace(/\son\w+='[^']*'/gi, '')
    .replace(/\sstyle="[^"]*"/gi, '')
    .replace(/\sstyle='[^']*'/gi, '')
    .replace(/javascript:/gi, '');

  cleaned = cleaned.replace(/<\/?([a-z0-9-]+)([^>]*)>/gi, (match, tagName, attrs = '') => {
    const tag = tagName.toLowerCase();
    if (!ALLOWED_TAGS.includes(tag)) {
      return '';
    }

    if (tag === 'a') {
      const hrefMatch = attrs.match(/\shref=(?:"([^"]*)"|'([^']*)')/i);
      const href = hrefMatch ? (hrefMatch[1] || hrefMatch[2] || '') : '';
      const safeHref = /^https?:\/\//i.test(href) ? href : '#';
      return match.startsWith('</')
        ? '</a>'
        : `<a href="${escapeHtml(safeHref)}" target="_blank" rel="noopener noreferrer">`;
    }

    return match.startsWith('</') ? `</${tag}>` : `<${tag}>`;
  });

  return cleaned;
};

export const sanitizePlainText = (input = '') => String(input).replace(/<[^>]*>/g, '').trim();

export default sanitizeHtml;
