import { useState } from 'react';
import axiosInstance from './helpers/axios';
import Container from './components/Container';
import Form from './components/Form';
import { saveAs } from 'file-saver';
import Header from './components/Header';
import Footer from './components/Footer';
import Loader from './components/Loader';

export default function App() {
  const [loading, setLoading] = useState(false);

  const handleFormSubmission = async (invoiceData) => {
    setLoading(true);

    const formData = new FormData();

    const {
      details: { companyLogo },
    } = invoiceData;

    formData.append('companyLogo', companyLogo);

    invoiceData.details.companyLogo = '';

    formData.append('invoiceData', JSON.stringify(invoiceData));

    try {
      const postResponse = await axiosInstance.post('/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const getResponse = await axiosInstance.get('/download', {
        responseType: 'blob',
      });

      setLoading(false);

      const invoicePdfBlob = new Blob([getResponse.data], {
        type: 'application/pdf',
      });

      const invoicePreviewUrl = URL.createObjectURL(invoicePdfBlob);

      window.open(invoicePreviewUrl, '_blank');

      saveAs(invoicePdfBlob, `invoice_${new Date().getTime()}.pdf`);
    } catch (e) {
      console.error('Error:', e);
    }
  };

  return (
    <div className="app">
      {loading && <Loader />}
      <Header />
      <Container>
        <Form onSubmit={handleFormSubmission} />
      </Container>
      <Footer />
    </div>
  );
}
