import React from "react";

const PreInvoiceGird = React.lazy(() => import("./PreInvoiceGrid"));
const PreInvoiceCreation = React.lazy( () => import("./PreInvoiceCreation"))
const UpdatePreInvoice = React.lazy( () => import("./PreInvoiceCreation"))

export const preInvoiceConfig = [
    {
        path: "/Preinvoice/PreInvoiceGrid",
        element: <PreInvoiceGird />,
      },
      {
        path: "/Preinvoice/PreInvoice-creation/:slaid",
        element: <PreInvoiceCreation />,
      },
      {
        path: "/Preinvoice/PreInvoice-update/:slaid",
        element: <UpdatePreInvoice />,
      },
]