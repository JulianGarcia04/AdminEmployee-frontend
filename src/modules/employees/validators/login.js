import * as yup from 'yup';

const validator = yup.object({
    email: yup.string().email().required().trim(),
    password: yup.string().required()
})

export default validator;