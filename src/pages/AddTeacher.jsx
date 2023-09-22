import React, { Fragment, useEffect, useState } from 'react';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import TextField from '../components/TextField';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FileBase64 from 'react-file-base64';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import AlertMessage from '../components/AlertMessage';
import { Helmet } from 'react-helmet-async';
import { resetRegister, createTeacher } from '../redux/slices/createTeacher';

const AddTeacher = () => {
  const dispatch = useDispatch();
  let { loading, error, message } = useSelector(
    (state) => state.createTeacherSlice
  );
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    phone: '',
    code: '',
    password: '',
    confirmPassword: '',
    material: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[\u0600-\u06FF\s]+$/, 'الاسم مطلوب باللفة العربية')
      .required('الاسم مطلوب'),

    phone: Yup.string()
      .matches(/^01\d{9}(,\s*01\d{9})*$/, 'هذا التنسيق غير صالح')
      .required('رقم الهاتف مطلوب'),

    code: Yup.string()
      .required('كود المعلم مطلوب')
      .matches(/^(Mr\.|Mrs\.)/, 'يجب ان يبدأ ب Mr او Mrs ')
      .length(12, 'يجب ان يكون 12 أحرف او أرقام'),
    password: Yup.string().required('كلمة المرور مطلوبة'),

    confirmPassword: Yup.string()
      .required('يجب تأكيد كلمة المرور')
      .oneOf([Yup.ref('password'), null], 'كلمة المرور يجب ان تكون مطابقة'),

    material: Yup.string()
      .matches(/^[\u0600-\u06FF\s]+$/, 'اسم المادة مطلوب باللفة العربية')
      .required('اسم المادة مطلوب'),
  });

  const handleSubmit = (values, submitProps) => {
    submitProps.setSubmitting(false);
    let phones = values.phone.split(', ');
    dispatch(
      createTeacher({
        ...values,
        profile: profile ? profile : '/images/avatars/a1.png',
        phone: phones,
      })
    );
    submitProps.resetForm();
  };

  useEffect(() => {
    let timer = null;
    if (message) {
      timer = setTimeout(() => {
        navigate('/teachers');
        dispatch(resetRegister());
      }, 2500);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [message, navigate, dispatch]);

  return (
    <Container>
      <Helmet>
        <title>اضافة معلم جديد</title>
      </Helmet>
      {error && (

          <AlertMessage type="error" msg={error} />
   
      )}
      {message && (
  
          <AlertMessage type="success" msg={message} />
       
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnMount
      >
        {({ isSubmitting, isValid }) => (
          <Form className="shadow-sm p-4 mt-3">
            <h2 className="text-center mb-3 text-primary fw-bold">
              اضافة معلم جديد
            </h2>
            <Row>
              <TextField label="اسم المعلم" type="text" name="name" xs={12} />
              <TextField
                label="رقم الهاتف"
                type="tel"
                name="phone"
                xs={12}
                md={6}
              />
              <TextField
                label="كود المعلم"
                type="text"
                name="code"
                xs={12}
                md={6}
              />
              <TextField
                label="كلمة المرور"
                type="password"
                name="password"
                xs={12}
                md={6}
              />
              <TextField
                label="تأكيد كلمة المرور"
                type="password"
                name="confirmPassword"
                xs={12}
                md={6}
              />

              <TextField label="اسم المادة" name="material" xs={12} />

              <Col xs={12} className="mb-3">
                <FileBase64
                  multiple={false}
                  onDone={({ base64 }) => setProfile(base64)}
                />
              </Col>
              <Col>
                <Button type="submit" disabled={!isValid || isSubmitting}>
                  {loading ? (
                    <Fragment>
                      <Spinner animation="border" role="status" size="sm" />{' '}
                      &nbsp; جارى الارسال
                    </Fragment>
                  ) : (
                    'اضافة معلم'
                  )}
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default AddTeacher;
