import * as yup from "yup";

export default yup.object({
  name: yup.string().required(),
  lastname: yup.string().required(),
});