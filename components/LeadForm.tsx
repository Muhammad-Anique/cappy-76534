import { useState, useRef } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { supabase, WaitlistLead } from '@/lib/supabase';

interface FormData {
  name: string;
  phone: string;
  email: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
}

interface LeadFormProps {
  formRef?: React.RefObject<HTMLDivElement>;
}

export default function LeadForm({ formRef }: LeadFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Phone validation
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');
    setErrorMessage('');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const lead: WaitlistLead = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim().toLowerCase(),
      };

      const { error } = await supabase
        .from('waitlist_leads')
        .insert([lead]);

      if (error) {
        if (error.code === '23505') {
          setErrorMessage('This email is already on the waitlist!');
        } else {
          setErrorMessage('Something went wrong. Please try again.');
        }
        setSubmitStatus('error');
      } else {
        setSubmitStatus('success');
        setFormData({ name: '', phone: '', email: '' });
      }
    } catch (err) {
      setErrorMessage('Network error. Please check your connection.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={formRef} className="w-full py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-white mb-4">
            JOIN THE <span className="text-cappy-accent">MOVEMENT</span>
          </h2>
          <p className="text-gray-400">
            Be the first to know when we drop. Limited spots available.
          </p>
        </div>

        {/* Form Container */}
        <div className="glass rounded-3xl p-8 border border-white/10">
          {submitStatus === 'success' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-cappy-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-cappy-accent" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">You&apos;re In!</h3>
              <p className="text-gray-400">
                Thanks for joining the waitlist. We&apos;ll be in touch soon.
              </p>
              <button
                onClick={() => setSubmitStatus('idle')}
                className="mt-6 text-cappy-accent hover:text-white transition-colors text-sm font-semibold"
              >
                Submit another entry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-white mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className={`w-full px-4 py-3 bg-cappy-black border rounded-xl text-white placeholder-gray-500
                           focus:outline-none focus:ring-2 focus:ring-cappy-accent transition-all
                           ${errors.name ? 'border-red-500' : 'border-white/10'}`}
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-white mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                  className={`w-full px-4 py-3 bg-cappy-black border rounded-xl text-white placeholder-gray-500
                           focus:outline-none focus:ring-2 focus:ring-cappy-accent transition-all
                           ${errors.phone ? 'border-red-500' : 'border-white/10'}`}
                />
                {errors.phone && (
                  <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`w-full px-4 py-3 bg-cappy-black border rounded-xl text-white placeholder-gray-500
                           focus:outline-none focus:ring-2 focus:ring-cappy-accent transition-all
                           ${errors.email ? 'border-red-500' : 'border-white/10'}`}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Error Message */}
              {submitStatus === 'error' && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <p className="text-sm text-red-400 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {errorMessage}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-accent text-white font-bold text-lg rounded-xl
                         hover:opacity-90 transition-all duration-300 transform hover:scale-[1.02]
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                         flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Joining...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Join Waitlist
                  </>
                )}
              </button>

              {/* Privacy Note */}
              <p className="text-center text-xs text-gray-500">
                By joining, you agree to receive updates about CAPPY. 
                We respect your privacy.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}