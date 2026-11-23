import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, Sparkles, MapPin, Phone, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Gen AI Project Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successResponse, setSuccessResponse] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const body = new FormData();
    body.append('name', formData.name);
    body.append('email', formData.email);
    body.append('message', formData.message);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: body,
      });
      if (!res.ok) throw new Error('Backend offline');
      const data = await res.json();
      setSuccessResponse(data.message || 'Message sent successfully!');
      setFormData({ name: '', email: '', subject: 'Gen AI Project Inquiry', message: '' });
    } catch (err) {
      setErrorMessage('Failed to send message. Please ensure the backend server is running.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12 md:py-20 border-b border-[#EBDDCF]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#EFE6DA] text-xs font-semibold text-[#86562D] border border-[#DDD0BF]">
            <Mail className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#231E1B]">
            Contact SketchSpace AI
          </h1>
          <p className="text-base text-[#6E6157]">
            Have inquiries about the image-to-image translation pipeline, model weights, or collaboration? Send us a message.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-[#E8DCCF] shadow-sm">
            
            {successResponse ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[#231E1B]">Message Delivered!</h3>
                <p className="text-sm text-[#665A50] max-w-sm mx-auto">{successResponse}</p>
                <button
                  type="button"
                  onClick={() => setSuccessResponse(null)}
                  className="mt-4 px-6 py-2.5 rounded-xl text-xs font-bold bg-[#8C5D33] text-white hover:bg-[#764B24]"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#7A6C60] mb-1.5">
                    Your Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-4 py-3 rounded-xl border border-[#DDD0BF] bg-[#FAF8F5] text-sm focus:outline-none focus:border-[#8C5D33] focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#7A6C60] mb-1.5">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. sarah@interiors.com"
                    className="w-full px-4 py-3 rounded-xl border border-[#DDD0BF] bg-[#FAF8F5] text-sm focus:outline-none focus:border-[#8C5D33] focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#7A6C60] mb-1.5">
                    Subject / Topic
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#DDD0BF] bg-[#FAF8F5] text-sm focus:outline-none focus:border-[#8C5D33] focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#7A6C60] mb-1.5">
                    Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows="5"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your design question, architectural idea, or evaluation feedback..."
                    className="w-full px-4 py-3 rounded-xl border border-[#DDD0BF] bg-[#FAF8F5] text-sm focus:outline-none focus:border-[#8C5D33] focus:bg-white transition-colors resize-none"
                  />
                </div>

                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl font-bold text-white bg-[#8C5D33] hover:bg-[#764B24] shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center space-x-2 text-sm disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting Inquiry...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Message</span>
                    </>
                  )}
                </button>
              </form>
            )}

          </div>

          {/* Right Column: Project & Team Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#2B231D] via-[#3B3028] to-[#211B17] text-white shadow-lg space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-[#8C5D33] flex items-center justify-center text-white">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-['Outfit']">SketchSpace AI</h3>
                  <p className="text-xs text-[#D6C5B4]">Team 9 • Gen AI Subject</p>
                </div>
              </div>

              <p className="text-sm text-[#D1C4B5] leading-relaxed">
                Developed as a full-stack Generative AI project converting architectural sketches into realistic interior renders using paired image-to-image translation.
              </p>

              <div className="pt-2 space-y-3 border-t border-white/10 text-xs text-[#E3D6C9]">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-[#C9A982]" />
                  <span>University Lab / Workstation Localhost</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-[#C9A982]" />
                  <span>team9.genai.project@academic.edu</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MessageSquare className="w-4 h-4 text-[#C9A982]" />
                  <span>FastAPI REST Server: http://127.0.0.1:8000</span>
                </div>
              </div>
            </div>

            {/* Evaluation Readiness */}
            <div className="p-6 rounded-3xl bg-white border border-[#E8DCCF] shadow-sm space-y-3">
              <h4 className="text-sm font-bold text-[#231E1B]">Evaluation & Viva Readiness</h4>
              <p className="text-xs text-[#6B5E53] leading-relaxed">
                All pages, canvas drawing mechanisms, ControlNet structural edge extraction, Pix2Pix architecture, and FastAPI routes are configured for live demonstration.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
