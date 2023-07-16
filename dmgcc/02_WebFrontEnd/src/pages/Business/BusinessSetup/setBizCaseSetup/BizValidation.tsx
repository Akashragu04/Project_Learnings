import * as yup from 'yup';

export const  validationBiz = yup.object().shape({
    facility: yup.array().of(
        yup.object().shape({
            quantity: yup.number()
            .required('Please enter the Quantity'),
            cost: yup.number()
            .required('Please enter the Cost'),
            cost_type: yup.string()
            .required('Please enter the Cost Type'),
            status: yup.string()
            .required('Please enter the Status'),
            })
        )
})

