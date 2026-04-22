import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const ContactPage = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Top Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('contact.title')} <span className="text-blue-600">{t('contact.titleHighlight')}</span> {t('contact.titleSuffix')}
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        {/* Main Content - 2 Column Layout */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {/* Left Side - Contact Form */}
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:p-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">{t('contact.getInTouch')}</h2>
            <form className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('contact.name')}</label>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('contact.email')}</label>
                <input
                  type="email"
                  placeholder="abc@example.com"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('contact.message')}</label>
                <textarea
                  placeholder={t('contact.messagePlaceholder')}
                  rows="4"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                />
              </div>
              <a 
                href="https://wa.me/351920651254" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full bg-blue-600 text-white py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-medium text-center"
              >
                {t('contact.sendMessage')}
              </a>
            </form>
          </div>

          {/* Right Side - Contact Info Panel */}
          <div className="space-y-4 sm:space-y-6">
            {/* WhatsApp Card */}
            <a 
              href="https://wa.me/351920651254" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block bg-green-600 rounded-xl p-4 sm:p-6 text-white hover:bg-green-700 transition-colors"
            >
              <h3 className="text-lg sm:text-xl font-semibold mb-2">{t('contact.chatWhatsApp')}</h3>
              <p className="text-green-100 text-sm sm:text-base">{t('contact.instantReply')}</p>
            </a>

            {/* Direct Contact */}
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">{t('contact.directContact')}</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-xs">✉</span>
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base">concierge@boltcar.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-xs">📞</span>
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base">+351 210 123 456</span>
                </div>
              </div>
            </div>

            {/* Map Card */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="bg-gray-200 h-32 sm:h-48 flex items-center justify-center">
                <span className="text-gray-500 font-medium text-sm sm:text-base">Lisbon, PT</span>
              </div>
              <div className="p-3 sm:p-4">
                <p className="text-gray-700 text-sm sm:text-base">
                  Avenida da Liberdade, 1100-150<br />
                  Lisbon, Portugal
                </p>
              </div>
            </div>
          </div>
        </div>

              </div>
    </div>
  );
};

export default ContactPage;
