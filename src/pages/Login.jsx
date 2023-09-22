import React, { Fragment, useContext, useEffect } from 'react';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import TextField from '../components/TextField';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AlertMessage from '../components/AlertMessage';
import { adminLogin, resetLoginError } from '../redux/slices/login';
import { Helmet } from 'react-helmet-async';
import { AdminContext } from '../context/AdminContext';

const Login = () => {
  const { adminData } = useContext(AdminContext);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state) => state.loginSlice);
  const initialValues = {
    code: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    code: Yup.string()
      .required('كود المسئول مطلوب')
      .matches(/^Admin\./, 'يجب ان يبدأ ب Admin. ')
      .length(15, 'يجب ان يكون 15 أحرف او أرقام'),
    password: Yup.string().required('كلمة المرور مطلوبة'),
  });

  const handleSubmit = (values, submitProps) => {
    submitProps.setSubmitting(false);
    dispatch(adminLogin(values));
  };

  useEffect(() => {
    if (adminData?.token) {
      return navigate('/');
    }

    let timer = null;
    if (message) {
      timer = setTimeout(() => {
        window.location.href = '/';
      }, 2500);
    }
    if (error) {
      timer = setTimeout(() => {
        dispatch(resetLoginError());
      }, 2500);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [message, navigate, error, dispatch, adminData]);

  return (
    <Container>
      <Helmet>
        <title>تسجيل الدخول</title>
      </Helmet>

      <h2 className="text-center mb-5 mt-5 text-primary fw-bold">
        تسجيل الدخول
      </h2>

      {error && <AlertMessage type="error" msg={error} />}
      {message && <AlertMessage type="success" msg={message} />}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnMount
      >
        {({ isSubmitting, isValid }) => (
          <Form className="shadow-sm p-4 mt-3">
            <Row>
              <TextField label="كود المسئول" type="text" name="code" xs={12} />
              <TextField
                label="كلمة المرور"
                type="password"
                name="password"
                xs={12}
              />

              <Col>
                <Button type="submit" disabled={!isValid || isSubmitting}>
                  {loading ? (
                    <Fragment>
                      <Spinner animation="border" role="status" size="sm" />{' '}
                      &nbsp; جارى الارسال
                    </Fragment>
                  ) : (
                    'تسجيل الدخول'
                  )}
                </Button>
              </Col>

              <Col className="mt-1" xs={12}>
                <Link to="/reset-password">نسيت كلمة المرور</Link>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Login;
