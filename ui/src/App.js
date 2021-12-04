import axios from "axios";
import Container from "./components/Container";
import Form from "./components/Form";
import { useEffect } from "react";

function App() {
  const createAndDownloadInvoice = async (invoiceData) => {
    const formData = new FormData();

    const {
      details: { companyLogo },
    } = invoiceData;

    formData.append("companyLogo", companyLogo);

    invoiceData.details.companyLogo = "";

    formData.append("invoiceData", JSON.stringify(invoiceData));

    const res = await axios.post("/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log(res.data);
  };

  return (
    <div>
      <Container>
        <Form onCreateAndDownloadInvoice={createAndDownloadInvoice} />
      </Container>
    </div>
  );
}

export default App;
