import React, {
  useState,
  Fragment,
  useMemo,
  useEffect,
  useContext,
} from 'react';
import TextField from '../components/TextField';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FileBase64 from 'react-file-base64';
import { Row, Col, Button, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import RadioBtn from '../components/RadioBtn';
import { createAdmin, resetCreateAdmin } from '../redux/slices/createAdmin';
import AlertMessage from '../components/AlertMessage';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';
import { Helmet } from 'react-helmet-async';

const AddAdmin = () => {
  const [profile, setProfile] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isMainAdmin } = useContext(AdminContext);
  const { loading, error, message } = useSelector(
    (state) => state.createAdminSlice
  );

  const initialValues = {
    name: '',
    code: '',
    password: '',
    confirmPassword: '',
    profile: '',
    phone: '',
    mainAdmin: 0,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[\u0600-\u06FF\s]+$/, 'الاسم مطلوب باللفة العربية')
      .required('الاسم مطلوب'),

    code: Yup.string()
      .required('كود المسئول مطلوب')
      .matches(/^Admin\./, 'يجب ان يبدأ ب Admin. ')
      .length(15, 'يجب ان يكون 15 أحرف او أرقام'),

    password: Yup.string().required('كلمة المرور مطلوبة'),

    phone: Yup.string()
      .matches(/^01\d{9}(,\s*01\d{9})*$/, 'هذا التنسيق غير صالح')
      .required('رقم الهاتف مطلوب'),

    confirmPassword: Yup.string()
      .required('يجب تأكيد كلمة المرور')
      .oneOf([Yup.ref('password'), null], 'كلمة المرور يجب ان تكون مطابقة'),
    mainAdmin: Yup.number().required('هذا الحقل مطلوب'),
  });

  const handleSubmit = (values, props) => {
    props.setSubmitting(false);
    let phones = values.phone.split(', ');
    dispatch(
      createAdmin({
        ...values,
        phone: phones,
        profile: profile || '/images/avatars/a1.png',
        mainAdmin: Boolean(Number(values.mainAdmin)),
      })
    );
    props.resetForm();
  };

  const mainAdminOptions = useMemo(
    () => [
      { label: 'نعم', value: 1 },
      { label: 'لا', value: 0 },
    ],
    []
  );

  useEffect(() => {
    let timer;
    if (message) {
      timer = setTimeout(() => {
        navigate('/admins');
        dispatch(resetCreateAdmin());
      }, 2500);
    }

    if (!isMainAdmin) {
      navigate('/admins');
    }

    return () => clearTimeout(timer);
  }, [message, navigate, dispatch, isMainAdmin]);

  return (
    <Fragment>
      <Helmet>
        <title>اضافة مسئول جديد</title>
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
              اضافة مسئول جديد
            </h2>

            {error && (
     
                <AlertMessage type="error" msg={error} />
       
            )}
            {message && (
      
                <AlertMessage type="success" msg={message} />

            )}

            <Row>
              <TextField
                label="اسم المسئول"
                type="text"
                name="name"
                xs={12}
                md={6}
              />

              <TextField
                label="كود المسئول"
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

              <TextField label="رقم الهاتف" type="text" name="phone" xs={12} />

              <Col xs={12} className="mb-3">
                <FileBase64
                  multiple={false}
                  onDone={({ base64 }) => setProfile(base64)}
                />
              </Col>

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
                    'اضافة مسئول جديد'
                  )}
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </Fragment>
  );
};

export default AddAdmin;
