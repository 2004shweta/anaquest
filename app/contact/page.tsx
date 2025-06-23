"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, User, Mail as MailIcon } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [responseError, setResponseError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResponseMessage(null);
    setResponseError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setResponseMessage('Thank you for your message! We\'ll get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setResponseError(data.message || 'Failed to send message. Please try again later.');
      }
    } catch (error) {
      setResponseError('Failed to send message. Please try again later.');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="w-full min-h-screen p-4">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Get in Touch
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Have questions about our quiz platform? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Contact Information
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Reach out to us through any of these channels. We're here to help you succeed in your learning journey.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4 p-6 bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-md">
              <div className="p-3 bg-blue-100 dark:bg-blue-200/20 rounded-lg">
                <Mail className="text-blue-600 dark:text-blue-300" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Email</h3>
                <p className="text-gray-600 dark:text-gray-300">support@anaquest.com</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">We'll respond within 24 hours</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-md">
              <div className="p-3 bg-green-100 dark:bg-green-200/20 rounded-lg">
                <Phone className="text-green-600 dark:text-green-300" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Phone</h3>
                <p className="text-gray-600 dark:text-gray-300">+1 (555) 123-4567</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Mon-Fri 9AM-6PM EST</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-md">
              <div className="p-3 bg-purple-100 dark:bg-purple-200/20 rounded-lg">
                <MapPin className="text-purple-600 dark:text-purple-300" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Office</h3>
                <p className="text-gray-600 dark:text-gray-300">123 Learning Street</p>
                <p className="text-gray-600 dark:text-gray-300">Education City, EC 12345</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">United States</p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  How do I reset my password?
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Click on the "Forgot Password" link on the login page and follow the instructions sent to your email.
                </p>
              </div>
              <div className="p-4 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  Can I create custom quizzes?
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Yes! Navigate to the Custom Quiz section to create your own personalized quizzes.
                </p>
              </div>
              <div className="p-4 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  How do I track my progress?
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Visit your dashboard to see detailed analytics and progress tracking for all your quizzes.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white/90 dark:bg-gray-900/90 rounded-2xl p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-lg">
              <MessageSquare className="text-primary" size={24} />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Send us a Message
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="What's this about?"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                placeholder="Tell us more about your inquiry..."
              />
            </div>

            {responseMessage && (
              <div className="w-full text-green-600 bg-green-100 border border-green-300 rounded-lg p-3 text-center">
                {responseMessage}
              </div>
            )}
            {responseError && (
              <div className="w-full text-red-600 bg-red-100 border border-red-300 rounded-lg p-3 text-center">
                {responseError}
              </div>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 