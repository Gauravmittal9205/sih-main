import React, { useState } from 'react';

const Feedback: React.FC = () => {
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(5);
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-6">
      <div className="max-w-xl mx-auto bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Feedback (Hinglish)</h1>
        <p className="text-sm text-gray-600 mb-4">Apka feedback hamare liye bahut important hai. Please apni baat simple shabdon me likhiye.</p>
        {sent ? (
          <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm">Shukriya! Aapka feedback mil gaya.</div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Rating (1-5)</label>
              <input type="range" min={1} max={5} value={rating} onChange={(e) => setRating(Number(e.target.value))} className="w-full" />
              <div className="text-xs text-gray-600 mt-1">Rating: {rating}</div>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Message</label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} className="w-full border border-gray-300 rounded-lg p-2 text-sm" placeholder="Yahan likhein..." required />
            </div>
            <button type="submit" className="px-4 py-2 rounded-lg bg-teal-600 text-white text-sm">Send</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Feedback;


