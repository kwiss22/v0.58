import React from 'react';
import { User } from 'lucide-react';

/**
 * Standalone doctor profile card (demo / copy-paste from Figma Make).
 */

interface DoctorCardProps {
  doctor: {
    id: string;
    name: string;
    hospital: string;
    department: string;
    badge: '\uC0C1\uAE09\uBCF4\uC6D0 \uAD50\uC218' | '\uBA85\uC758 \uCD94\uCC9C';
    category?: string;
  };
  onDetailClick?: (doctor: DoctorCardProps['doctor']) => void;
}

export function DoctorProfileCard({ doctor, onDetailClick }: DoctorCardProps) {
  const badgeConfig: Record<
    DoctorCardProps['doctor']['badge'],
    { emoji: string; text: string; color: string; bgColor: string }
  > = {
    '\uC0C1\uAE09\uBCF4\uC6D0 \uAD50\uC218': {
      emoji: '\uD83C\uDFE5',
      text: '\uC0C1\uAE09\uC885\uD569\uBCF4\uC6D0 \uAD50\uC218 \uCD9C\uC2E0',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    '\uBA85\uC758 \uCD94\uCC9C': {
      emoji: '\u2B50',
      text: '\uBA85\uC758 \uCD94\uCC9C',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
  };

  const config = badgeConfig[doctor.badge];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${config.color} ${config.bgColor}`}>
        {config.emoji} {config.text}
      </div>

      <div className="flex flex-col items-center mb-4">
        <div className="w-16 h-16 rounded-full mb-3 bg-gray-200 flex items-center justify-center">
          <User className="w-8 h-8 text-gray-400" />
        </div>

        <h3 className="text-lg font-bold text-gray-900">
          {doctor.name}{' '}
          <span className="text-sm font-normal text-gray-500">{'\uAD50\uC218'}</span>
        </h3>

        <div className="flex flex-col items-center gap-1 mt-2">
          <p className="text-sm text-teal-600 font-medium">{doctor.hospital}</p>
          <p className="text-xs text-gray-500">{doctor.department}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onDetailClick?.(doctor)}
        className="w-full py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
      >
        {'\uC0C1\uC138\uBCF4\uAE30'}
      </button>
    </div>
  );
}

export function DoctorCardDemo() {
  const sampleDoctors: DoctorCardProps['doctor'][] = [
    {
      id: 'd1',
      name: '\uACF5\uCC3D\uBBFC',
      hospital: '\uCDA9\uBD81\uB300\uD559\uAD50\uBCF4\uC6D0',
      department: '\uC815\uD615\uC678\uACFC',
      badge: '\uBA85\uC758 \uCD94\uCC9C',
      category: '\uCC99\uCD94',
    },
    {
      id: 'd2',
      name: '\uAE40\uB098\uD76C',
      hospital: '\uC138\uC885\uCDA9\uB0A8\uB300\uD559\uAD50\uBCF4\uC6D0',
      department: '\uC815\uD615\uC678\uACFC',
      badge: '\uC0C1\uAE09\uBCF4\uC6D0 \uAD50\uC218',
      category: '\uAD00\uC808',
    },
    {
      id: 'd3',
      name: '\uC774\uC2B9\uC900',
      hospital: '\uC11C\uC6B8\uC544\uC0B0\uBCF4\uC6D0',
      department: '\uAC04\uB2F4\uCDE8\uC678\uACFC',
      badge: '\uC0C1\uAE09\uBCF4\uC6D0 \uAD50\uC218',
      category: '\uAC04\uC9C8\uD658',
    },
  ];

  const handleDetailClick = (d: DoctorCardProps['doctor']) => {
    console.log('\uC0C1\uC138\uBCF4\uAE30 \uD074\uB9AD:', d);
    alert(`${d.name} \uAD50\uC218\uB2D8\uC758 \uC0C1\uC138 \uC815\uBCF4\uB97C \uBD88\uB7EC\uC635\uB2C8\uB2E4.`);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">{'\uC758\uC0AC \uD504\uB85C\uD544 \uCE74\uB4DC \uB370\uBAA8'}</h1>
        <p className="text-gray-600 mb-8">
          {'\uB2E4\uC591\uD55C \uB808\uC774\uC544\uC6C3\uC73C\uB85C \uC0AC\uC6A9\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.'}
        </p>

        <h2 className="text-xl font-semibold mb-4">{'\uADF8\uB9AC\uB4DC \uB808\uC774\uC544\uC6C3 (3\uC5F4)'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {sampleDoctors.map((doc) => (
            <DoctorProfileCard key={doc.id} doctor={doc} onDetailClick={handleDetailClick} />
          ))}
        </div>

        <h2 className="text-xl font-semibold mb-4">{'\uAC00\uB85C \uC2A4\uD06C\uB864 \uB808\uC774\uC544\uC6C3'}</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {sampleDoctors.map((doc) => (
            <div key={doc.id} className="flex-shrink-0 w-72">
              <DoctorProfileCard doctor={doc} onDetailClick={handleDetailClick} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
