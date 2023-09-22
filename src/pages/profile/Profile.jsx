import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import {
  adminProfile,
  resetUpdateProfile,
  updateProfile,
} from '../../redux/slices/profile';
import AlertMessage from '../../components/AlertMessage';
import Loading from '../../components/Loading';
import styles from './style.module.css';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import FileBase64 from 'react-file-base64';
import TextField from '../../components/TextField';

const Profile = () => {
  const [update, setUpdate] = useState(false);
  const [imgProfile, setImgProfile] = useState('');
  const { admin, loading, error, message } = useSelector(
    (state) => state.profileSlice
  );
  const dispatch = useDispatch();

  const initialValues = {
    name: admin?.name || '',
    phone: admin?.phone?.join(', '),
    password: '',
    newPassword: '',
    code: admin?.code || '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[\u0600-\u06FF\s]+$/, 'الاسم مطلوب باللفة العربية')
      .required('الاسم مطلوب'),

    phone: Yup.string()
      .matches(/^01\d{9}(,\s*01\d{9})*$/, 'هذا التنسيق غير صالح')
      .required('رقم الهاتف مطلوب'),

    code: Yup.string()
      .required('كود المسئول مطلوب')
      .matches(/^Admin\./, 'يجب ان يبدأ ب Admin. ')
      .length(15, 'يجب ان يكون 15 أحرف او أرقام'),
      password: Yup.string().required("كلمة المرور مطلوبة")
  });

  useEffect(() => {
    let timer;
    if (message || error) {
      timer = setTimeout(() => {
        dispatch(resetUpdateProfile());
      }, 2500);
    }
    dispatch(adminProfile());
    return () => clearTimeout(timer);
  }, [dispatch, message, error]);

  const handleSubmit = (values, submitProps) => {
    let phones = values.phone.split(', ');
    dispatch(
      updateProfile({
        ...values,
        phone: phones,
        profile: imgProfile || admin?.profile,
      })
    );

    submitProps.resetForm();
  };

  return (
    <Container>
      <Helmet>
        <title>الصفحة الشخصية</title>
      </Helmet>
      {message && (
    
          <AlertMessage type="success" msg={message} />
      
      )}
      {loading ? (
        <Loading />
      ) : error ? (
  
          <AlertMessage type="error" msg={error} />
 
      ) : (
        <Row>
          <Col xs={12} md={6}>
            <img
              src={admin?.profile}
              alt="profile"
              className={`${styles.imgProfile} mt-5 mt-md-0`}
            />
            <p className="lead">
              <strong>الاسم : </strong>
              {admin?.name}
            </p>
            <div>
              <strong className="mb-3 d-inline-block">رقم الهاتف : </strong>
              {admin?.phone?.map((p) => (
                <p className="lead" key={p}>
                  {p}
                </p>
              ))}
            </div>

            <p className="lead">
              <strong>الكود : </strong>
              {admin?.code}
            </p>

            <Button
              onClick={() => setUpdate((prev) => !prev)}
              variant="outline-primary"
            >
              {update ? 'الغاء' : 'تحديث البيانات'}
            </Button>
          </Col>

          {update && (
            <Col xs={12} md={6} className="mt-5 mt-md-0">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isValid, isSubmitting, dirty }) => (
                  <Form>
                    <TextField name="name" label="الاسم" />
                    <TextField name="phone" label="رقم الهاتف" />
                    <TextField name="code" label="الكود" />
                    <TextField
                      name="password"
                      type="password"
                      label="كلمة المرور القديمة"
                    />
                    <TextField
                      name="newPassword"
                      type="password"
                      label="كلمة المرور الجديدة"
                    />

                    <Col xs={12} className="mb-3">
                      <FileBase64
                        multiple={false}
                        onDone={({ base64 }) => setImgProfile(base64)}
                      />
                    </Col>

                    <Button type="submit" disabled={!(dirty && isValid)}>
                      تحديث البيانات
                    </Button>
                  </Form>
                )}
              </Formik>
            </Col>
          )}
        </Row>
      )}
    </Container>
  );
};

export default Profile;
