// import React from 'react';

// interface Props {
//   pdfUrl: string;
// }

// const PdfViewer: React.FC<Props> = ({ pdfUrl }) => {
//   return (
//     <iframe src={pdfUrl} width="100%" height="100%" title="test"></iframe>
//   );
// };

// export default PdfViewer;
import React from 'react';
// import { Document, Page } from 'react-pdf';

interface Props {
  pdfUrl: string;
}

const PdfViewer: React.FC<Props> = ({ pdfUrl }) => {
  return (
    <React.Fragment>
    {/* // <Document file={pdfUrl}>
    //   <Page pageNumber={1} />
    // </Document> */}

    </React.Fragment>
  );
};

export default PdfViewer;