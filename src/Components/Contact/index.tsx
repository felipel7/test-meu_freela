import { ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import { formSchema } from '../../Validations/FormValidation';
import { Formik, Form, Field, FormikHelpers } from 'formik';

import styles from './styles.module.scss';

interface FormValues {
  name: string;
  phone: string;
}

const Contact = () => {
  const handleSubmit = (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    new Promise<void>(res => {
      setTimeout(() => {
        console.log(values);
        res();
      }, 500);
    })
      .then(_ => toast.success('Dados enviados com sucesso! :)'))
      .catch(_ => toast.error('Houve um erro, tente novamente!'));

    actions.resetForm();
  };

  return (
    <section id='form' data-aos='zoom-in-up' className={styles.formContainer}>
      <h2>Mande um oi, ligamos para você!</h2>
      <p>Preencha seus dados para que a gente possa entrar em contato.</p>
      <Formik
        validationSchema={formSchema}
        initialValues={{
          name: '',
          phone: '',
        }}
        onSubmit={handleSubmit}
      >
        {({ errors, handleChange, setFieldValue }) => (
          <Form>
            <div className={styles.formContent}>
              <div className={styles.formControl}>
                <label htmlFor='name'>Nome Completo</label>
                <Field
                  autoComplete='off'
                  id='name'
                  name='name'
                  placeholder='Ex: Mateus Ávila Isidoro'
                />
                {errors && <span>{errors.name}</span>}
              </div>

              <div className={styles.formControl}>
                <label htmlFor='phone'>Whatsapp</label>
                <Field
                  autoComplete='off'
                  id='phone'
                  name='phone'
                  placeholder='(99) 99999-9999'
                  maxLength={15}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    handleChange(e);
                    const value: string = e.target.value.replace(/\D/g, '');

                    const phone = value.replace(
                      /(..)(.....)(.*)/,
                      '($1) $2-$3'
                    );

                    setFieldValue('phone', phone, false);
                  }}
                />
                {errors && <span>{errors.phone}</span>}
              </div>
              <button
                type='submit'
                onClick={() => {
                  if (errors.name || errors.phone)
                    toast.error('Confira os dados novamente!');
                }}
              >
                Peça uma reunião
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export { Contact };
