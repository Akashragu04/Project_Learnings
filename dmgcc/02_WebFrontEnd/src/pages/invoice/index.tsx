import React from "react";

const InvoiceGird = React.lazy(() => import("./invoiceGrid"));


export const InvoiceConfig = [
    {
        path: "/invoice/invoiceGrid",
        element: <InvoiceGird />,
      }
]