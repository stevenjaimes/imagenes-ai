import React, { useState } from 'react';
import { Send } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { ContactInfo } from './ContactInfo';
import { InputField } from './InputField';
import { TextArea } from './TextArea';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Replace these with your actual EmailJS credentials
      const result = await emailjs.send(
        import.meta.env.VITE_YOUR_SERVICE_ID,
        import.meta.env.VITE_YOUR_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        import.meta.env.VITE_YOUR_PUBLIC_KEY
      );

      if (result.status === 200) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error sending email:', error);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Contáctame</h2>
          <p className="text-lg text-gray-600">
            ¿Tienes alguna pregunta o propuesta? No dudes en contactarme
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <ContactInfo />
          </div>

          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Nombre"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <InputField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <InputField
                label="Asunto"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="mt-6"
              />

              <TextArea
                label="Mensaje"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="mt-6"
              />

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 text-white rounded-lg flex items-center justify-center gap-2 transition-all
                    ${isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-purple-600 hover:bg-purple-700 active:transform active:scale-95'
                    }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Enviar mensaje</span>
                    </>
                  )}
                </button>
              </div>

              {submitStatus === 'success' && (
                <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg text-center">
                  ¡Mensaje enviado con éxito! Te contactaré pronto.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg text-center">
                  Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;