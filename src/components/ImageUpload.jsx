import Form from 'react-bootstrap/Form';
import { useState } from 'react';

function ImageUpload() {
  const preset_name = 'custom-forms';
  const cloud_name = 'dz20tyim6';

  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', preset_name);

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        {
          method: 'POST',
          body: data,
        }
      );

      const file = await response.json();
      setImage(file.secure_url);
      console.log(file.secure_url);
      setLoading(false);
    } catch (error) {
      console.error('Error uploading image:', error);
      setLoading(false);
    }
  };

  return (
    <>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Change image</Form.Label>
        <Form.Control type="file" onChange={(e) => uploadImage(e)} />
      </Form.Group>
      {loading ? <p>Loading...</p> : <img src={image} />}
    </>
  );
}

export default ImageUpload;
