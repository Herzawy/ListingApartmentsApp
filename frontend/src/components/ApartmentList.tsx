import { useState } from 'react';
import { Apartment } from '@/utils/types';
import ApartmentCard from './ApartmentCard';

interface ApartmentListProps {
  apartments: Apartment[];
}

export default function ApartmentList({ apartments }: ApartmentListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredApartments = apartments.filter((apartment) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      (apartment.unitName && apartment.unitName.toLowerCase().includes(lowerCaseQuery)) ||
      (apartment.unitNumber && apartment.unitNumber.toLowerCase().includes(lowerCaseQuery)) ||
      (apartment.project && apartment.project.toLowerCase().includes(lowerCaseQuery))
    );
  });

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Search by unit name, unit number, or project"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredApartments.length > 0 ? (
          filteredApartments.map((apartment) => (
            <ApartmentCard key={apartment._id} apartment={apartment} />
          ))
        ) : (
          <p>No apartments found. Try different search criteria.</p>
        )}
      </div>
    </div>
  );
}
