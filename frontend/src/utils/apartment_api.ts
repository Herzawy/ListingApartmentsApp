const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const addApartment = async (apartmentData: any, imageFile: File | null) => {
  let imageUrl = '';

  if (imageFile) {
    const formData = new FormData();
    formData.append('file', imageFile);

    const uploadResponse = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!uploadResponse.ok) {
      throw new Error('Failed to upload image');
    }

    const uploadResult = await uploadResponse.json();
    imageUrl = uploadResult?.imageUrl || '';
  }
  console.log("imageUrlimageUrl",imageUrl);

  const { _id, ...apartmentPayload } = apartmentData;
  apartmentPayload.imageUrl = imageUrl;

  const response = await fetch(`${API_BASE_URL}/apartments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(apartmentPayload),
  });

  if (!response.ok) {
    throw new Error('Failed to add apartment');
  }

  return response.json();
};

// Function to fetch all apartments
export const fetchApartments = async () => {
  const response = await fetch(`${API_BASE_URL}/apartments`);
  if (!response.ok) {
    throw new Error(`Failed to fetch apartments: ${response.statusText}`);
  }
  return response.json();
};

// Function to fetch an apartment by ID
export const fetchApartmentById = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/apartments/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch apartment by ID: ${response.statusText}`);
  }
  return response.json();
};
