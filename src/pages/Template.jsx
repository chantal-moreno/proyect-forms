import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../api/axios';

function Template() {
  const { templateId } = useParams();
  const [template, setTemplate] = useState([]);

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const res = await axios.get(`/template/${templateId}`);
        const template = res.data;
        console.log(template);
        setTemplate(template);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchTemplate();
  }, [templateId]);

  return (
    <>
      <h1>Template</h1>
    </>
  );
}

export default Template;
