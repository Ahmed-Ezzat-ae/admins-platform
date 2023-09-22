import React, { Fragment, useContext, useEffect, useMemo } from 'react';
import { AdminContext } from '../context/AdminContext';
import jwt_decode from 'jwt-decode';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import AlertMessage from '../components/AlertMessage';
import RadioBtn from '../components/RadioBtn';
import { resetAdminMsg, updateMainAdmin } from '../redux/slices/admins';

const UpdateAdmin = () => {
  const { adminData } = useContext(AdminContext);
  const decodedData = adminData ? jwt_decode(adminData?.token) : null;
  const navigate = useNavigate();
  const { admins, error, loading, message } = useSelector(
    (state) => state.adminsSlice
  );
  const { id } = useParams();
  const dispatch = useDispatch();
  const admin = useMemo(() => admins.find((a) => a._id === id), [admins, id]);

  const initialValues = {
    mainAdmin: Number(admin?.mainAdmin) || 0,
  };

  const validationSchema = Yup.object().shape({
    mainAdmin: Yup.number().required('هذا الحقل مطلوب'),
  });

  const mainAdminOptions = useMemo(
    () => [
      { label: 'نعم', value: 1 },
      { label: 'لا', value: 0 },
    ],
    []
  );

  useEffect(() => {
    let timer;
    if (!decodedData?.mainAdmin || !admin) {
      navigate('/admins');
    }
    if (message) {
      timer = setTimeout(() => {
        dispatch(resetAdminMsg());
        navigate('/admins');
      }, 2500);
    }

    return () => clearTimeout(timer);
  }, [navigate, decodedData, admin, message, dispatch]);

  const handleSubmit = (values, props) => {
    props.setSubmitting(false);
    dispatch(
      updateMainAdmin({
        id,
        mainAdmin: Boolean(Number(values.mainAdmin)),
      })
    );
  };

  return (
    <Container>
      <Helmet>
        <title> تعيين كمسئول رئيسى</title>
      </Helmet>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnMount
      >
        {({ isSubmitting, isValid, values }) => (
          <Form className="shadow-sm p-4 mt-5">
            <h2 className="text-center mb-5 text-primary fw-bold">
              تعيين كمسئول رئيسى
            </h2>

            {error && (
           
                <AlertMessage type="error" msg={error} />
    
            )}
            {message && (
         
                <AlertMessage type="success" msg={message} />
    
            )}

            <Row>
              <Col xs={12} className="mb-3">
                <label>المسئول الرئيسى</label>
                <RadioBtn name="mainAdmin" options={mainAdminOptions} />
              </Col>

              <Col>
                <Button type="submit" disabled={!isValid || isSubmitting}>
                  {loading ? (
                    <Fragment>
                      <Spinner animation="border" role="status" size="sm" />{' '}
                      &nbsp; جارى الارسال
                    </Fragment>
                  ) : (
                    'ارسال'
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

export default UpdateAdmin;
