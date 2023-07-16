import React from "react";

const Signin = React.lazy(() => import("./Signin"));
const ForgotPassword = React.lazy(() => import("./ForgetPassword"));
const ApprovalBusinessCase = React.lazy(() => import("../approvalpage/ApprovalBusinessCase"));
const SLAApproval = React.lazy(()=>import("../approvalpage/SLAApproval"))

const ConfirmSignupAwsCognito = React.lazy(
  () => import("./ConfirmSignupAwsCognito")
);
const ResetPasswordAwsCognito = React.lazy(
  () => import("./ResetPasswordAwsCognito")
);

export const authRouteConfig = [
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/forget-password",
    element: <ForgotPassword />,
  },
  {
    path: "/confirm-signup",
    element: <ConfirmSignupAwsCognito />,
  },
  {
    path: "/reset-password/:token",
    element: <ResetPasswordAwsCognito />,
  },
  {
    path: "/business-approvel/:Biz_Case_ID/:Approval_ID/:receiver/:token",
    element: <ApprovalBusinessCase />,
  },
  {
    path: "/sla-approvals/:Approval_ID/:receiver/:token",
    element: <SLAApproval />,
  },
];
