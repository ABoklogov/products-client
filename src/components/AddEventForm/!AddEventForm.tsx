
// import { useRef } from "react";
// import { useFormik, FormikProps, FormikConfig } from 'formik';
// import { InputText } from "primereact/inputtext";
// import { Button } from 'primereact/button';
// import { Toast } from 'primereact/toast';
// import { classNames } from 'primereact/utils';

// type Errors = {
//   value: string;
// };

// interface Form {
//   value: string;
// };


// function AddEventForm() {
//   const toast = useRef<Toast>(null);

//   const show = (data: any) => {
//     if (!toast.current) throw Error("toast is not assigned");
//     toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: formik.values.value });
//   };

//   const formik: FormikProps<Form> = useFormik<Form>({
//     initialValues: {
//       value: ''
//     },
//     validate: (data) => {
//       let errors: Errors = { value: '' };

//       if (!data.value) {
//         errors.value = 'Name - Surname is required.';
//       }

//       return errors;
//     },
//     onSubmit: (data) => {
//       data && show(data);
//       formik.resetForm();
//     }
//   });

//   const isFormFieldInvalid = (name: string) => !!(formik.touched[name] && formik.errors[name]);

//   const getFormErrorMessage = (name: string) => {
//     return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
//   };

//   return (
//     <div className="card flex justify-content-center">
//       <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2">
//         <span className="p-float-label">
//           <Toast ref={toast} />
//           <InputText
//             id="value"
//             name="value"
//             value={formik.values.value}
//             onChange={(e) => {
//               formik.setFieldValue('value', e.target.value);
//             }}
//             className={classNames({ 'p-invalid': isFormFieldInvalid('value') })}
//           />
//           <label htmlFor="input_value">Name - Surname</label>
//         </span>
//         {getFormErrorMessage('value')}
//         <Button type="submit" label="Submit" />
//       </form>
//     </div>
//   );
// };

// export default AddEventForm;
export { }