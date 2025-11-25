import React, { useState } from 'react';
import { MapPin, Phone, Clock, ChevronDown } from 'lucide-react';

const Location = () => {
  const branches = [
    {
      id: 'chandranagar',
      name: 'Chandranagar (Main)',
      address: 'Chandranagar, Palakkad, Kerala 678001',
      phone: '+91 92 07 57 46 33',
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.089066601243!2d76.6412493749942!3d10.77666998937089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba86dfa087d31ad%3A0x1c342c9d2a000000!2sChandranagar%2C%20Palakkad%2C%20Kerala!5e0!3m2!1sen!2sin!4v1701388800000!5m2!1sen!2sin"
    },
    {
      id: 'kalmandapam',
      name: 'Kalmandapam Branch',
      address: 'Kalmandapam, Palakkad, Kerala 678001',
      phone: '+91 92 07 57 46 34',
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.123456789!2d76.654321!3d10.765432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba86e1234567890%3A0xabcdef123456!2sKalmandapam%2C%20Palakkad%2C%20Kerala!5e0!3m2!1sen!2sin"
    },
    {
      id: 'ottapalam',
      name: 'Ottapalam Branch',
      address: 'Ottapalam, Palakkad, Kerala 679101',
      phone: '+91 92 07 57 46 35',
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31355.66358763668!2d76.35686355656434!3d10.77436668586386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7d10000000001%3A0x40b308233366666!2sOttapalam%2C%20Kerala!5e0!3m2!1sen!2sin"
    },
  ];

  const [selectedBranch, setSelectedBranch] = useState(branches[0]);

  const handleBranchChange = (e) => {
    const branch = branches.find(b => b.id === e.target.value);
    setSelectedBranch(branch);
  };

  return (
    <section id="location" className="bg-white/30 py-12 md:py-20">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl text-gray-900 mb-6">Visit Our Studio</h2>
            <p className="text-gray-600 mb-8 text-lg">
              Come visit our design studio to discuss your event in person. We have samples of balloons, fabrics, and props for you to see.
            </p>

            {/* Branch Selector */}
            <div className="mb-8">
              <label htmlFor="branch-select" className="block text-sm font-medium text-gray-700 mb-2">Select Branch</label>
              <div className="relative max-w-xs">
                <select
                  id="branch-select"
                  value={selectedBranch.id}
                  onChange={handleBranchChange}
                  className="block w-full pl-4 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-lg shadow-sm bg-white appearance-none cursor-pointer"
                >
                  {branches.map((branch) => (
                    <option key={branch.id} value={branch.id}>
                      {branch.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDown size={16} />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-gray-900 font-bold text-lg mb-1">Address</h4>
                  <p className="text-gray-600 whitespace-pre-line">{selectedBranch.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-gray-900 font-bold text-lg mb-1">Phone</h4>
                  <p className="text-gray-600">{selectedBranch.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="text-gray-900 font-bold text-lg mb-1">Opening Hours</h4>
                  <p className="text-gray-600">Mon - Sat: 10:00 AM - 8:00 PM<br />Sun: By Appointment</p>
                </div>
              </div>
            </div>
          </div>

          <div className="h-[400px] rounded-2xl overflow-hidden glass-panel p-2">
            <div className="w-full h-full bg-gray-800 rounded-xl flex items-center justify-center relative overflow-hidden">
               <iframe 
                key={selectedBranch.id} // Force re-render on branch change
                src={selectedBranch.mapUrl}
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen="" 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
