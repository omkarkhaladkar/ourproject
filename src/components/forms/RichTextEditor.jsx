import React, { useRef } from 'react';
import { Bold, Heading2, Italic, List, ListOrdered, Quote, Underline } from 'lucide-react';

const ACTIONS = [
  { icon: Bold, label: 'Bold', command: 'bold' },
  { icon: Italic, label: 'Italic', command: 'italic' },
  { icon: Underline, label: 'Underline', command: 'underline' },
  { icon: Heading2, label: 'Heading', command: 'formatBlock', value: 'h2' },
  { icon: List, label: 'Bullet List', command: 'insertUnorderedList' },
  { icon: ListOrdered, label: 'Numbered List', command: 'insertOrderedList' },
  { icon: Quote, label: 'Quote', command: 'formatBlock', value: 'blockquote' },
];

export default function RichTextEditor({ value = '', onChange, error = '' }) {
  const editorRef = useRef(null);

  const runCommand = (command, commandValue = null) => {
    editorRef.current?.focus();
    document.execCommand(command, false, commandValue);
    onChange?.(editorRef.current?.innerHTML || '');
  };

  return (
    <div className={`rte-wrap ${error ? 'rte-wrap-error' : ''}`}>
      <div className="rte-toolbar">
        {ACTIONS.map(({ icon: Icon, label, command, value: commandValue }) => (
          <button key={label} type="button" className="rte-btn" onClick={() => runCommand(command, commandValue)} title={label}>
            <Icon size={16} />
          </button>
        ))}
      </div>
      <div
        ref={editorRef}
        className="rte-editor"
        contentEditable
        suppressContentEditableWarning
        dangerouslySetInnerHTML={{ __html: value }}
        onInput={(event) => onChange?.(event.currentTarget.innerHTML)}
      />
      {error ? <p className="ppf-input-error">{error}</p> : null}
    </div>
  );
}
