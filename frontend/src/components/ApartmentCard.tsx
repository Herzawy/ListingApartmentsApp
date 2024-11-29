import Link from 'next/link';
import { Apartment } from '@/utils/types';

interface ApartmentCardProps {
  apartment: Apartment; 
}

export default function ApartmentCard({ apartment }: ApartmentCardProps) {
  return (
    <div className="border p-4 rounded-md shadow-md">
      {apartment.imageUrl && (
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}${apartment.imageUrl}`}
          alt={apartment.unitName}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
      )}
      <h3 className="text-lg font-bold">{apartment.unitName}</h3>
      <p className="text-gray-600">Unit: {apartment.unitNumber}</p>
      <p className="text-gray-600">Project: {apartment.project}</p>
      <p className="text-blue-500 font-semibold">${apartment.price}</p>
      {apartment.description && (
        <p className="text-sm text-gray-500">{apartment.description}</p>
      )}
      <Link href={`/apartment/${apartment._id}`}>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
          View Details
        </button>
      </Link>
    </div>
  );
}
