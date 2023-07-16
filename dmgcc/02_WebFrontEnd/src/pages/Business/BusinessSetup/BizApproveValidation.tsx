import * as yup from 'yup';

export const  validationBiz:any = yup.object().shape({
    approvel: yup.array().of(
        yup.object().shape({
            short_id: yup.string()
            .required('Please select short id'),
            sequence_level: yup.string()
            .required('Please select sequence level'),
            })
        )
})
