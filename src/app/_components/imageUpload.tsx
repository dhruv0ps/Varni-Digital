import { useState } from 'react';
import Image from 'next/image';

const ImageUpload = () => {
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('/api/cloudinary', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    if (data.url) setImage(data.url);
  };

  return (
    <div>
      <input type="file" onChange={handleImageUpload} />
      <Image src={image || ''} alt='Uploaded' />
      {/* {image && <img src={image} alt="Uploaded" />} */}
    </div>
  );
};

export default ImageUpload;
