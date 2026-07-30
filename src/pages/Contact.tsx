import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Facebook, Clock } from 'lucide-react';
import React, { useState } from 'react';

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Get form data
    const formData = new FormData(e.target as HTMLFormElement);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const phone = formData.get('phone');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    const body = `Name: ${firstName} ${lastName}%0D%0APhone: ${phone}%0D%0A%0D%0A${message}`;
    
    // Direct immediately to email
    window.location.href = `mailto:adjim1990@gmail.com?subject=${encodeURIComponent(subject as string)}&body=${body}`;
    
    setIsSubmitting(false);
  };

  return (
    <div className="py-20 px-4 bg-kayhab-cream min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-playfair font-bold text-kayhab-primary mb-6">Get In Touch</h1>
          <div className="w-24 h-1 bg-kayhab-caramel mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-kayhab-primary/5 border border-kayhab-caramel/10"
          >
            <h3 className="font-playfair text-2xl font-bold text-kayhab-primary mb-6">Send us a message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-poppins text-kayhab-primary/80 mb-2">First Name</label>
                  <input required name="firstName" type="text" className="w-full px-4 py-3 rounded-lg border border-kayhab-primary/20 focus:border-kayhab-caramel focus:ring-2 focus:ring-kayhab-caramel/20 outline-none transition-all font-poppins bg-kayhab-cream/30" />
                </div>
                <div>
                  <label className="block text-sm font-poppins text-kayhab-primary/80 mb-2">Last Name</label>
                  <input required name="lastName" type="text" className="w-full px-4 py-3 rounded-lg border border-kayhab-primary/20 focus:border-kayhab-caramel focus:ring-2 focus:ring-kayhab-caramel/20 outline-none transition-all font-poppins bg-kayhab-cream/30" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-poppins text-kayhab-primary/80 mb-2">Email</label>
                <input required name="email" type="email" className="w-full px-4 py-3 rounded-lg border border-kayhab-primary/20 focus:border-kayhab-caramel focus:ring-2 focus:ring-kayhab-caramel/20 outline-none transition-all font-poppins bg-kayhab-cream/30" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-poppins text-kayhab-primary/80 mb-2">Phone Number</label>
                  <input required name="phone" type="tel" className="w-full px-4 py-3 rounded-lg border border-kayhab-primary/20 focus:border-kayhab-caramel focus:ring-2 focus:ring-kayhab-caramel/20 outline-none transition-all font-poppins bg-kayhab-cream/30" />
                </div>
                <div>
                  <label className="block text-sm font-poppins text-kayhab-primary/80 mb-2">Subject</label>
                  <input required name="subject" type="text" className="w-full px-4 py-3 rounded-lg border border-kayhab-primary/20 focus:border-kayhab-caramel focus:ring-2 focus:ring-kayhab-caramel/20 outline-none transition-all font-poppins bg-kayhab-cream/30" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-poppins text-kayhab-primary/80 mb-2">Message</label>
                <textarea required name="message" rows={5} className="w-full px-4 py-3 rounded-lg border border-kayhab-primary/20 focus:border-kayhab-caramel focus:ring-2 focus:ring-kayhab-caramel/20 outline-none transition-all font-poppins bg-kayhab-cream/30 resize-none"></textarea>
              </div>
              <button disabled={isSubmitting} type="submit" className="w-full py-4 bg-kayhab-primary hover:bg-kayhab-chocolate text-kayhab-cream font-semibold rounded-lg transition-all duration-300 font-poppins disabled:opacity-70">
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>

          {/* Contact Information & Map */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col space-y-8"
          >
            <div className="bg-kayhab-primary text-kayhab-cream p-8 md:p-12 rounded-3xl shadow-xl">
              <h3 className="font-playfair text-2xl font-bold mb-8 text-kayhab-gold">Contact Information</h3>
              <div className="space-y-6 font-poppins">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 mr-4 text-kayhab-caramel flex-shrink-0" />
                  <div>
                    <h4 className="font-bold mb-1">Business Address</h4>
                    <p className="text-kayhab-cream/80 text-sm">123 Luxury Avenue, Victoria Island<br/>Lagos, Nigeria</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="w-6 h-6 mr-4 text-kayhab-caramel flex-shrink-0" />
                  <div>
                    <h4 className="font-bold mb-1">Phone</h4>
                    <p className="text-kayhab-cream/80 text-sm">08064292639</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="w-6 h-6 mr-4 text-kayhab-caramel flex-shrink-0" />
                  <div>
                    <h4 className="font-bold mb-1">Email</h4>
                    <a href="mailto:adjim1990@gmail.com" className="text-kayhab-cream/80 text-sm hover:text-kayhab-caramel transition-colors block">adjim1990@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="w-6 h-6 mr-4 text-kayhab-caramel flex-shrink-0" />
                  <div>
                    <h4 className="font-bold mb-1">Business Hours</h4>
                    <p className="text-kayhab-cream/80 text-sm">Mon - Fri: 9:00 AM - 6:00 PM<br/>Sat: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-kayhab-cream/20">
                <h4 className="font-playfair font-bold mb-4">Connect with us</h4>
                <div className="flex space-x-4">
                  <a href="https://wa.me/2348064292639" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-kayhab-cream/10 flex items-center justify-center hover:bg-kayhab-caramel transition-colors text-kayhab-cream hover:text-kayhab-primary" title="WhatsApp">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                  </a>
                  <a href="https://www.facebook.com/share/1DDduAqBWR/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-kayhab-cream/10 flex items-center justify-center hover:bg-kayhab-caramel transition-colors text-kayhab-cream hover:text-kayhab-primary">
                    <Facebook className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Google Map Placeholder */}
            <div className="flex-grow bg-white rounded-3xl overflow-hidden border border-kayhab-caramel/10 relative min-h-[300px] flex items-center justify-center shadow-xl shadow-kayhab-primary/5">
              <div className="text-center p-6 bg-kayhab-cream/80 backdrop-blur-sm border border-kayhab-primary/10 rounded-xl m-4">
                <MapPin className="w-8 h-8 mx-auto mb-2 text-kayhab-primary/40" />
                <p className="font-playfair text-lg font-semibold text-kayhab-primary/60">[ Google Map Placeholder ]</p>
                <p className="font-poppins text-sm text-kayhab-primary/40">Victoria Island, Lagos</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
