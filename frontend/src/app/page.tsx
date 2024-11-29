'use client';

import '../styles/globals.css';
import ApartmentList from '@/components/ApartmentList';
import { useState, useEffect } from 'react';
import { Apartment } from '@/utils/types';
import { fetchApartments } from '@/utils/apartment_api';
import AddApartmentPage from './apartment/add-apartment/page';

export default function HomePage() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('useEffect is running');
    const loadApartments = async () => {
      try {
        setLoading(true);
        const data = await fetchApartments();
        console.log("Fetched apartments:", data);
        setApartments(data);
      } catch (err) {
        setError('Failed to fetch apartments.');
        console.error('Error fetching apartments:', err);
      } finally {
        setLoading(false);
      }
    };

    loadApartments();
  }, []);
  
  console.log('showModal:', showModal);

  const handleAddApartmentClick = () => {
    console.log('Opening Modal');
    setShowModal(true); // Show modal
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddApartment = (newApartment: Apartment) => {
    setApartments((prevApartments) => [...prevApartments, newApartment]); 
    setShowModal(false);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to Apartment Listings</h1>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
        onClick={handleAddApartmentClick}
      >
        Add New Apartment
      </button>

      {loading && <p>Loading apartments...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && <ApartmentList apartments={apartments} />}

      {showModal && <AddApartmentPage onClose={handleCloseModal} onAddApartment={handleAddApartment} />}
    </div>
  );
}
