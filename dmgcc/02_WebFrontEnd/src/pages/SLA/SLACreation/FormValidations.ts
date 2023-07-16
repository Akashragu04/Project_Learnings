import * as yup from "yup";

export const bizCaseSLAValidationSchema = yup.object({
    start_date: yup
        .date()
        .nullable()
        .required(String("Biz SLA Start Date is required")),
    end_date: yup
        .date()
        .nullable()
        .required(String("Biz SLA End Date is required")),
    project_name: yup.string().required(String("Project Name is required")),
    currency: yup.string().required(String("Currency is required")),
    contract_option: yup.string().required(String("Contract option is required")),
    country: yup.string().required(String("Country is required")),    
    slaname: yup.string().required(String("SLA name is required")),
    customer_company: yup.string().required(String("Customer name is required")),
    revenue_cost_center: yup.array().of(
        yup.object().shape({
            cost_center: yup.string().required(String("Cost Centre Code is required")),
            allocate_percentage: yup.string().required(String("Allocate percentage is required")),
        })), 
    organization_type: yup.string().required(String("Organization is required")),
    billing_cycle: yup.string().required(String("Billing cycle is required")),
    //customer_company: yup.string().required(String("currency is required")),
    // tariff_sheet: yup.object().shape({
    //     cost_center_code: yup.string().required(String("Cost Centre Code is required")),
    //     material_description: yup.string().required(String("Material Description is required")),
    // }),
    // io: yup.object().shape({
    //     io_category: yup.string().required(String("IO Category is required")),
    // }),
    // po: yup.object().shape({
    //     vendor: yup.string().required(String("Vendor is required")),
    // }),
    

});

