import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

interface ContactItemProps {
  icon: React.ReactNode;
  title: string;
  content: string;
}

const ContactItem = ({ icon, title, content }: ContactItemProps) => (
  <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-purple-50 transition-colors">
    <div className="text-purple-600">{icon}</div>
    <div>
      <h4 className="font-medium text-gray-900">{title}</h4>
      <p className="text-gray-600">{content}</p>
    </div>
  </div>
);

export const ContactInfo = () => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Información de contacto</h3>
      
      <div className="space-y-4">
        <ContactItem
          icon={<MapPin className="w-6 h-6" />}
          title="Ubicación"
          content="Cúcuta, Colombia"
        />
        
        <ContactItem
          icon={<Phone className="w-6 h-6" />}
          title="Teléfono"
          content="+57 (318) 641-1411"
        />
        
        <ContactItem
          icon={<Mail className="w-6 h-6" />}
          title="Email"
          content="hensteve250@gmail.com"
        />
        
        <ContactItem
          icon={<Clock className="w-6 h-6" />}
          title="Horario"
          content="Lun - Vie: 7:00 AM - 7:00 PM"
        />
      </div>

      <div className="mt-8 pt-8 border-t border-gray-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Sígueme en redes</h4>
        <div className="flex space-x-4">
          {['LinkedIn', 'GitHub', 'Twitter'].map((network) => (
            <a
              key={network}
              href="#"
              className="px-4 py-2 text-sm text-purple-600 border border-purple-600 rounded-lg
                       hover:bg-purple-600 hover:text-white transition-colors"
            >
              {network}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};