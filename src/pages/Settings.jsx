import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetContentMsg,
  uploadDescContent,
  uploadLogoImg,
} from '../redux/slices/logo';
import AlertMessage from '../components/AlertMessage';
import { useEffect } from 'react';
import Loading from "../components/Loading"

const Settings = () => {
  const { loading, error, message } = useSelector((state) => state.logoSlice);
  const [logoImg, setLogoImg] = useState('');
  const dispatch = useDispatch();
  const [descData, setDescData] = useState({
    imgSrc: '',
    title: '',
    desc: '',
  });

  const handleSubmitLogo = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('logo', logoImg);
    dispatch(uploadLogoImg(formData));
  };

  const handleSubmitDesc = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('descImg', descData.imgSrc);
    formData.append('title', descData.title);
    formData.append('desc', descData.desc);
    dispatch(uploadDescContent(formData));
  };

  useEffect(() => {
    let timer;
    if (message || error) {
      timer = setTimeout(() => {
        dispatch(resetContentMsg());
      }, 2500);
    }

    return clearTimeout(timer);
  }, [dispatch, message, error]);

  return (
    <Container>
      <Helmet>
        <title>الاعدادات</title>
      </Helmet>

      <div className="mb-5 mt-4">
        <h2 className="text-primary fs-3">تغيير الشعار</h2>
        {loading && <Loading />}
        {error && <AlertMessage type="error" msg={error} />}
        {message && <AlertMessage type="success" msg={message} />}
        <Form onSubmit={handleSubmitLogo}>
          <Form.Group controlId="formFile" className="my-4">
            <Form.Label>اختر صوره</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => setLogoImg(e.target.files[0])}
            />
          </Form.Group>
          <Button type="submit" disabled={!logoImg}>
            ارسال
          </Button>
        </Form>
      </div>

      <div className="mb-5">
        <h2 className="mb-3 fs-3 text-primary">تغيير المحتوى</h2>
        <Form onSubmit={handleSubmitDesc}>
          <Form.Group controlId="formFile" className="my-4">
            <Form.Label>العنوان</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) =>
                setDescData((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="my-4">
            <Form.Label>الوصف</Form.Label>
            <Form.Control
              type="text"
              as="textarea"
              rows={3}
              onChange={(e) =>
                setDescData((prev) => ({ ...prev, desc: e.target.value }))
              }
            />
          </Form.Group>

          <Form.Group controlId="formFile" className="my-4">
            <Form.Label>اختر صوره</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) =>
                setDescData((prev) => ({ ...prev, imgSrc: e.target.files[0] }))
              }
            />
          </Form.Group>
          <Button type="submit">ارسال</Button>
        </Form>
      </div>
    </Container>
  );
};

export default Settings;
