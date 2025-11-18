import jsPDFInvoiceTemplate, {
  OutputType,
  jsPDF,
} from 'jspdf-invoice-template';
import { Invoice } from '../../../models/invoice';
import { User } from '../../../models/user';

type JsPDFReturnObject = {
  pagesNumber: number; // (always) - number of pages
  jsPDFDocObject: jsPDF; // if (returnJsPDFDocObject: true) - the doc already created. You can use it to add new content, new  pages.
  blob: Blob; // if (outputType: 'blob') - returns the created pdf file as a Blob object. So you can upload and save it to your server. (Idea from a comment on Twitter)
  dataUriString: string; // if (outputType: 'datauristring')
  arrayBuffer: ArrayBuffer; // if (outputType: 'arraybuffer')
};

export const generateInvoicePdf = (
  invoice: Invoice,
  user: User,
  userImgPath: string,
  save: boolean,
) => {
  console.log(userImgPath);
  const props = {
    outputType: save ? OutputType.Save : OutputType.ArrayBuffer,
    returnJsPDFDocObject: true,
    fileName: `Invoice_${invoice.invoiceNumber}`,
    orientationLandscape: false,
    compress: true,
    logo: {
      src: userImgPath,
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
      src: userImgPath,
      type: 'JPG', //optional, when src= data:uri (nodejs case)
      width: 20, //aspect ratio = width/height
      height: 20,
      margin: {
        top: 0, //negative or positive num, from the current position
        left: 0, //negative or positive num, from the current position
      },
    },
    business: {
      name: user.companyName,
      address: `${user.street}, ${user.zipcode}, ${user.city}`,
      phone: `${user.phone}`,
      email: user.email,
      website: user.website,
    },
    contact: {
      label: 'Rechnung für:',
      name: `${invoice.order.customer.name}`,
      address: `${invoice.order.customer.street}, ${invoice.order.customer.zipcode}, ${invoice.order.customer.city}`,
      phone: `${invoice.order.customer.phone}`,
      email: invoice.order.customer.email,
      otherInfo: 'www.website.al',
    },
    invoice: {
      label: `Rechnung: ${invoice.invoiceNumber}`,
      num: invoice.id,
      invDate: `Zu zahlen am: ${new Date(invoice.dueDate).toLocaleDateString()}`,
      invGenDate: `Erstellt am: ${new Date(invoice.createdAt).toLocaleDateString()}`,
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
          title: 'Titel',
          style: {
            width: 30,
          },
        },
        {
          title: 'Beschreibung',
          style: {
            width: 80,
          },
        },
        { title: 'Preis' },
        { title: 'Anzahl' },
        { title: 'Einheit' },
        { title: 'Summe' },
      ],
      table: Array.from(Array(invoice.items.length), (_, index) => [
        index + 1,
        invoice.items[index],
        'Lorem Ipsum is simply dummy text dummy text ',
        200.5,
        4.5,
        'm2',
        400.5,
      ]),
      additionalRows: [
        {
          col1: 'Summe:',
          col2: `${invoice.total},00 €`,
          col3: 'ALL',
          style: {
            fontSize: 14, //optional, default 12
          },
        },
        {
          col1: 'MwSt:',
          col2: '20',
          col3: '%',
          style: {
            fontSize: 10, //optional, default 12
          },
        },
        {
          col1: 'Zwischensumme:',
          col2: `${invoice.total * 0.8},00 €`,
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
    pageLabel: 'Seite ',
  };

  return jsPDFInvoiceTemplate(props) as JsPDFReturnObject; //returns number of pages created
};
