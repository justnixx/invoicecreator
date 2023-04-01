import { useState } from 'react';
import axiosInstance from './helpers/axios';
import Container from './components/Container';
import Form from './components/Form';
import { saveAs } from 'file-saver';
import Header from './components/Header';
import Footer from './components/Footer';
import Loader from './components/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

      toast.success(postResponse.data?.message);

      const getResponse = await axiosInstance.get('/download', {
        responseType: 'blob',
      });

      const invoicePdfBlob = new Blob([getResponse.data], {
        type: 'application/pdf',
      });

      const invoicePreviewUrl = URL.createObjectURL(invoicePdfBlob);

      window.open(invoicePreviewUrl, '_blank');

      saveAs(invoicePdfBlob, `invoice_${new Date().getTime()}.pdf`);
    } catch (e) {
      toast.error(e.response.data?.error.message);

      console.error('Error:', e);
    } finally {
      setTimeout(() => setLoading(false), 2000);
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
      <ToastContainer
        position={toast.POSITION.BOTTOM_CENTER}
        autoClose={5000}
        hideProgressBar={true}
        draggable={false}
      />
    </div>
  );
}
