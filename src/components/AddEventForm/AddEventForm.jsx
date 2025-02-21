import { useRef } from "react";
import { useFormik } from 'formik';
import { useAppDispatch } from 'store/hooks';
// import { addEvent } from 'store/products/productsOperations';
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { RadioButton } from "primereact/radiobutton";
import { classNames } from 'primereact/utils';
import ShortUniqueId from 'short-unique-id';
import s from './AddEventForm.module.css';

function AddEventForm() {
  const toast = useRef(null);
  const dispatch = useAppDispatch();

  const show = ({ importance, equipment, message, responsible }) => {
    const { randomUUID } = new ShortUniqueId({ length: 10 })
    const id = randomUUID();
    const date = new Date().toLocaleString();

    // dispatch(addEvent({ id, date, importance, equipment, message, responsible }));

    toast.current.show({ severity: 'success', summary: 'Событие добавлено' });
  };

  const formik = useFormik({
    initialValues: {
      importance: 'Низкая', // важность
      equipment: '', // оборудование
      message: '', // сообщение
      responsible: '', // ответственный
    },
    validate: (data) => {
      let errors = {};

      if (!data.equipment) {
        errors.equipment = 'Поле обязательное для заполнения';
      };
      if (!data.message) {
        errors.message = 'Поле обязательное для заполнения';
      };
      if (!data.responsible) {
        errors.responsible = 'Поле обязательное для заполнения';
      };

      return errors;
    },
    onSubmit: (data) => {
      data && show(data);
      formik.resetForm();
    }
  });

  const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name) => {
    return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
  };

  return (
    <div className={s.formContainer}>

      <div className='text-2xl font-bold text-900 mb-4'>
        Добавление события
      </div>

      <div className="card flex justify-content-center">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-column gap-2 form"
          style={{ width: '100%' }}
        >
          <Toast ref={toast} />

          {/* Важность */}
          <span className='mb-1'>Важность</span>
          <div className="flex flex-wrap gap-3 mb-4">
            <div className="flex align-items-center">
              <RadioButton
                inputId="importance1"
                name="importance"
                value="Низкая"
                onChange={(e) => formik.setFieldValue('importance', e.value)}
                checked={formik.values.importance === 'Низкая'}
              />
              <label htmlFor="importance1" className="ml-2">Низкая</label>
            </div>
            <div className="flex align-items-center">
              <RadioButton
                inputId="importance2"
                name="importance"
                value="Высокая"
                onChange={(e) => formik.setFieldValue('importance', e.value)}
                checked={formik.values.importance === 'Высокая'}
              />
              <label htmlFor="importance2" className="ml-2">Высокая</label>
            </div>
            <div className="flex align-items-center">
              <RadioButton
                inputId="importance3"
                name="importance"
                value="Критическая"
                onChange={(e) => formik.setFieldValue('importance', e.value)}
                checked={formik.values.importance === 'Критическая'}
              />
              <label htmlFor="importance3" className="ml-2">Критическая</label>
            </div>
          </div>

          {/* оборудование */}
          <span className="mb-2">
            <span className="p-float-label">
              <InputText
                id="equipment"
                name="equipment"
                value={formik.values.equipment}
                onChange={(e) => {
                  formik.setFieldValue('equipment', e.target.value);
                }}
                style={{ width: '100%' }}
                className={classNames({ 'p-invalid': isFormFieldInvalid('equipment') })}
              />
              <label htmlFor="input_value">оборудование</label>
            </span>
            {getFormErrorMessage('equipment')}
          </span>

          {/* сообщение */}
          <span className="mb-2">
            <span className="p-float-label">
              <InputText
                id="message"
                name="message"
                value={formik.values.message}
                onChange={(e) => {
                  formik.setFieldValue('message', e.target.value);
                }}
                style={{ width: '100%' }}
                className={classNames({ 'p-invalid': isFormFieldInvalid('message') })}
              />
              <label htmlFor="input_value">сообщение</label>
            </span>

            {getFormErrorMessage('message')}
          </span>

          {/* ответственный */}
          <span className="mb-4">
            <span className="p-float-label">
              <InputText
                id="responsible"
                name="responsible"
                value={formik.values.responsible}
                onChange={(e) => {
                  formik.setFieldValue('responsible', e.target.value);
                }}
                style={{ width: '100%' }}
                className={classNames({ 'p-invalid': isFormFieldInvalid('responsible') })}
              />
              <label htmlFor="input_value">ответственный</label>
            </span>

            {getFormErrorMessage('responsible')}
          </span>

          <Button type="submit" label="Добавить" />
        </form>
      </div>
    </div>
  )
};

export default AddEventForm;