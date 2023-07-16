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
    currency: yup.string().required(String("currency is required")),
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

