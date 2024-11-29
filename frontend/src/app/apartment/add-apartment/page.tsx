import { useState } from 'react';
import { addApartment } from '@/utils/apartment_api';
import { Apartment } from '@/utils/types';

interface AddApartmentPageProps {
  onClose: () => void;
  onAddApartment: (apartment: Apartment) => void;
}

const AddApartmentPage: React.FC<AddApartmentPageProps> = ({ onClose, onAddApartment }) => {
  const [unitName, setUnitName] = useState('');
  const [unitNumber, setUnitNumber] = useState('');
  const [project, setProject] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [showModal, setShowModal] = useState(true);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; 
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newApartment: Apartment = {
      _id: '', 
      unitName,
      unitNumber,
      project,
      price: Number(price),
      description,
      imageUrl: '',
    };

    try {
      const data = await addApartment(newApartment, imageFile);
      onAddApartment(data);
      console.log('Apartment added successfully!');
      onClose();
    } catch (error) {
      console.error('Failed to add apartment:', error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300); 
  };

  return (
    <div className={`fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50 ${showModal ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity duration-300`}>
      <div className={`bg-white p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl transform ${showModal ? 'scale-100' : 'scale-90'} transition-all duration-300`}>
        <h2 className="text-xl font-bold mb-4">Add New Apartment</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="unitName">Unit Name</label>
            <input
              id="unitName"
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={unitName}
              onChange={(e) => setUnitName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="unitNumber">Unit Number</label>
            <input
              id="unitNumber"
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={unitNumber}
              onChange={(e) => setUnitNumber(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="project">Project</label>
            <input
              id="project"
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={project}
              onChange={(e) => setProject(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="price">Price</label>
            <input
              id="price"
              type="number"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="description">Description</label>
            <textarea
              id="description"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="imageUrl">Image Upload</label>
            <input
              id="imageUrl"
              type="file"
              className="w-full p-2 border border-gray-300 rounded-md"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Add Apartment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddApartmentPage;
