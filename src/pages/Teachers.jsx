import React, { useEffect } from 'react';
import { Table, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTeacher, getTeachers, resetDeleteTeacherMsg } from '../redux/slices/teachers';
import { Helmet } from 'react-helmet-async';
import TeacherTableItems from '../components/TeacherTableItems';
import Loading from '../components/Loading';
import AlertMessage from '../components/AlertMessage';

const Teachers = () => {
  const dispatch = useDispatch();
  const { loading, error, teachers, message } = useSelector(
    (state) => state.teacherSlice
  );

  useEffect(() => {
    let timer;
    if (message || error) {
      timer = setTimeout(() => {
        dispatch(resetDeleteTeacherMsg())
      }, 2500)
    }
    dispatch(getTeachers());
    return () => clearTimeout(timer)
  }, [dispatch, message, error]);

  const handleDeleteTeacher = (id) => {
    dispatch(deleteTeacher(id));
  };

  return (
    <Container>
      <Helmet>
        <title>صفحة المعلمين</title>
      </Helmet>
      {message && (

          <AlertMessage type="success" msg={message} />

      )}
      {loading ? (
        <Loading />
      ) : error ? (
     
          <AlertMessage type="error" msg={error} />
       
      ) : teachers.length ? (
        <Table striped bordered hover responsive size="sm" className='my-5'>
          <thead>
            <tr className="text-center">
              <th className="text-primary py-3">العدد</th>
              <th className="text-primary py-3">البروفايل</th>
              <th className="text-primary py-3">الاسم</th>
              <th className="text-primary py-3">التخصص</th>
              <th className="text-primary py-3">الهاتف</th>
              <th className="text-primary py-3">حذف</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher, index) => (
              <TeacherTableItems
                teacher={teacher}
                key={teacher._id}
                index={index + 1}
                handleDeleteTeacher={handleDeleteTeacher}
              />
            ))}
          </tbody>
        </Table>
      ) : (
        <AlertMessage type="error" msg="لا يوجد معلمين حتى الان" />
      )}
    </Container>
  );
};

export default Teachers;
