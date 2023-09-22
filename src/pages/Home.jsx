import React from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  return (
    <Container>
      <Helmet>
        <title>منصة المتألق الصفحة الرئيسية</title>
      </Helmet>
      <h2 className="my-4 text-primary fw-semibold fs-3">
        ارشادات للتعامل مع المنصة
      </h2>

      <div>
        <ListGroup as="ol" numbered>
          <ListGroup.Item as="li" className="border-0">
            الكود الخاص بالمسئول يجب ان يبدا ب Admin.
          </ListGroup.Item>
          <ListGroup.Item as="li" className="border-0">
            المسئول الرئيسى لا يستطيع حذف حسابة
          </ListGroup.Item>
          <ListGroup.Item as="li" className="border-0">
            المسئول الرئيسى يستطيع ان يحذف حساب اى مسؤل اخر
          </ListGroup.Item>
          <ListGroup.Item as="li" className="border-0">
            المسئول الرئيسى يستطيع ان يحذف او يعدل حساب اى معلم
          </ListGroup.Item>
          <ListGroup.Item as="li" className="border-0">
            المسؤل الرئيسى يستطيع اضافة مسؤل اخر او معلم جديد
          </ListGroup.Item>
          <ListGroup.Item as="li" className="border-0">
            المسؤل العادى يستطيع اضافة مسؤل اخر او معلم جديد
          </ListGroup.Item>
          <ListGroup.Item as="li" className="border-0">
            المسؤل العادى لا يستطيع ان يحذف او يعدل حساب اى معلم
          </ListGroup.Item>
          <ListGroup.Item as="li" className="border-0">
            المسؤل العادى لا يستطيع ان يحذف او يعدل حساب اى مسؤل اخر
          </ListGroup.Item>
        </ListGroup>
      </div>
    </Container>
  );
};

export default Home;
