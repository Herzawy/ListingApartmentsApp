'use client';
import { useEffect, useState } from 'react';
import { fetchApartmentById } from '@/utils/apartment_api';

import { Apartment } from '@/utils/types';

export default function ApartmentDetails({ params }: { params: Promise<{ id: string }> }) {
  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    };

    unwrapParams();
  }, [params]);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const data = await fetchApartmentById(id);
        setApartment(data);
      } catch (err) {
        setError('Failed to fetch apartment details. Please try again later.');
      }
    };

    fetchData();
  }, [id]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!apartment) {
    return <p>Loading apartment details...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Display the apartment image */}
      {apartment.imageUrl && (
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}${apartment.imageUrl}`}
          alt={apartment.unitName}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
      )}

      {/* Apartment Unit Name */}
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{apartment.unitName}</h1>

      {/* Apartment Unit Number */}
      <p className="text-lg text-gray-600 mb-2">Unit Number: {apartment.unitNumber}</p>

      {/* Project Name */}
      {apartment.project && (
        <p className="text-lg text-gray-600 mb-2">Project: {apartment.project}</p>
      )}

      {/* Apartment Description */}
      <p className="text-lg text-gray-700 mb-4">{apartment.description}</p>

      {/* Price */}
      <p className="text-2xl font-semibold text-gray-900 mb-4">Price: ${apartment.price}</p>

      <div className="text-sm text-gray-500">
        <p>For more details or to schedule a viewing, please contact us.</p>
      </div>
    </div>
  );
}
