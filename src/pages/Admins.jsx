import React from 'react';
import { Container, Table } from 'react-bootstrap';
import Loading from '../components/Loading';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import AlertMessage from '../components/AlertMessage';
import AdminsTableItems from '../components/AdminsTableItems';
import { useEffect } from 'react';
import { deleteAdmin, getAdmins, resetAdminMsg } from '../redux/slices/admins';

const Admins = () => {
  const { loading, error, admins, message } = useSelector((state) => state.adminsSlice);
  const dispatch = useDispatch();
  useEffect(() => {
    let timer;
    if (message || error) {
      timer = setTimeout(() => {
        dispatch(resetAdminMsg())
      }, 2500)
    }
    dispatch(getAdmins());
    return () => clearTimeout(timer)
  }, [dispatch, message, error]);

  const handleDeleteAdmin = (id) => {
    dispatch(deleteAdmin(id));
  };


  return (
    <Container>
      <Helmet>
        <title>صفحة المسئولين</title>
      </Helmet>
      {message && (

          <AlertMessage type="success" msg={message} />
  
      )}
      {loading ? (
        <Loading />
      ) : error ? (
   
          <AlertMessage type="error" msg={error} />

      ) : admins.length ? (
        <Table striped bordered hover responsive size="sm" className='my-5'>
          <thead>
            <tr className="text-center">
              <th className="text-primary py-3">العدد</th>
              <th className="text-primary py-3">البروفايل</th>
              <th className="text-primary py-3">الاسم</th>
              <th className="text-primary py-3">الهاتف</th>
              <th className="text-primary py-3">المسئول الرئيسى</th>
              <th className="text-primary py-3">اخرى</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin, index) => (
              <AdminsTableItems
                admin={admin}
                key={admin._id}
                index={index + 1}
                handleDeleteAdmin={handleDeleteAdmin}
              />
            ))}
          </tbody>
        </Table>
      ) : null}
    </Container>
  );
};

export default Admins;
