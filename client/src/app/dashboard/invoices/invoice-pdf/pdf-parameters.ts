import jsPDFInvoiceTemplate, {
  OutputType,
  jsPDF,
} from 'jspdf-invoice-template';
import { Invoice } from '../../../models/invoice';

type JsPDFReturnObject = {
  pagesNumber: number; // (always) - number of pages
  jsPDFDocObject: jsPDF; // if (returnJsPDFDocObject: true) - the doc already created. You can use it to add new content, new  pages.
  blob: Blob; // if (outputType: 'blob') - returns the created pdf file as a Blob object. So you can upload and save it to your server. (Idea from a comment on Twitter)
  dataUriString: string; // if (outputType: 'datauristring')
  arrayBuffer: ArrayBuffer; // if (outputType: 'arraybuffer')
};

export const generateInvoicePdf = (invoice: Invoice): JsPDFReturnObject => {
  const props = {
    outputType: OutputType.ArrayBuffer,
    returnJsPDFDocObject: true,
    fileName: `Invoice_${invoice.invoiceNumber}`,
    orientationLandscape: false,
    compress: true,
    logo: {
      src: 'https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/logo.png',
      type: 'PNG', //optional, when src= data:uri (nodejs case)
      width: 53.33, //aspect ratio = width/height
      height: 26.66,
      margin: {
        top: 0, //negative or positive num, from the current position
        left: 0, //negative or positive num, from the current position
      },
    },
    stamp: {
      inAllPages: true, //by default = false, just in the last page
      src: 'https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg',
      type: 'JPG', //optional, when src= data:uri (nodejs case)
      width: 20, //aspect ratio = width/height
      height: 20,
      margin: {
        top: 0, //negative or positive num, from the current position
        left: 0, //negative or positive num, from the current position
      },
    },
    business: {
      name: 'Business Name',
      address: 'Albania, Tirane ish-Dogana, Durres 2001',
      phone: '(+355) 069 11 11 111',
      email: 'email@example.com',
      email_1: 'info@example.al',
      website: 'www.example.al',
    },
    contact: {
      label: 'Rechnung für:',
      name: `${invoice.order.customer.name}`,
      address: `${invoice.order.customer.street}, ${invoice.order.customer.zipcode} ${invoice.order.customer.city}`,
      phone: `${invoice.order.customer.phone}`,
      email: `${invoice.order.customer.email}`,
      otherInfo: 'www.website.al',
    },
    invoice: {
      label: `Rechnungsnr.: ${invoice.invoiceNumber}`,
      num: 19,
      invDate: `Zahlungstermin: ${invoice.dueDate}`,
      invGenDate: `Rechnungsdatum: ${invoice.dueDate}`,
      headerBorder: false,
      tableBodyBorder: false,
      header: [
        {
          title: '#',
          style: {
            width: 10,
          },
        },
        {
          title: 'Title',
          style: {
            width: 30,
          },
        },
        {
          title: 'Description',
          style: {
            width: 80,
          },
        },
        { title: 'Price' },
        { title: 'Quantity' },
        { title: 'Unit' },
        { title: 'Total' },
      ],
      table: Array.from(Array(10), (_, index) => [
        index + 1,
        'There are many variations ',
        'Lorem Ipsum is simply dummy text dummy text ',
        200.5,
        4.5,
        'm2',
        400.5,
      ]),
      additionalRows: [
        {
          col1: 'Total:',
          col2: '145,250.50',
          col3: 'ALL',
          style: {
            fontSize: 14, //optional, default 12
          },
        },
        {
          col1: 'VAT:',
          col2: '20',
          col3: '%',
          style: {
            fontSize: 10, //optional, default 12
          },
        },
        {
          col1: 'SubTotal:',
          col2: '116,199.90',
          col3: 'ALL',
          style: {
            fontSize: 10, //optional, default 12
          },
        },
      ],
      invDescLabel: 'Invoice Note',
      invDesc:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.",
    },
    footer: {
      text: 'The invoice is created on a computer and is valid without the signature and stamp.',
    },
    pageEnable: true,
    pageLabel: 'Page ',
  };

  const pdfObject = jsPDFInvoiceTemplate(props) as JsPDFReturnObject;

  return pdfObject;
};
