import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
  useContext,
} from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import Loading from '../components/Loading';
import Header from '../components/header/Header';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { fetchContent } from '../redux/slices/content';
import '../App.css';
import { AdminContext } from '../context/AdminContext';
import { adminLogout } from '../redux/slices/login';

const RootLayout = () => {
  const { adminData } = useContext(AdminContext);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const sideBarRef = useRef();
  const mainContentRef = useRef();

  const handleClick = useCallback(() => {
    sideBarRef.current.classList.toggle('active');
    mainContentRef.current.classList.toggle('active');
  }, []);

  useEffect(() => {
    const checkTokenExpiration = () => {
      if (adminData?.token) {
        const tokenData = atob(adminData?.token.split('.')[1]);
        const currentTimeInSeconds = Math.floor(Date.now() / 1000);
        if (currentTimeInSeconds >= tokenData.exp) {
          dispatch(adminLogout());
          window.location.href = "/login";
          return;
        }
      }
    };
    setLoading(false);
    checkTokenExpiration();
    dispatch(fetchContent());
  }, [dispatch, adminData?.token]);

  return (
    <div dir="auto">
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <Header handleClick={handleClick} />
          <Sidebar sideBarRef={sideBarRef} />
          <main ref={mainContentRef} className="p-3">
            <Container>
              <Outlet />
            </Container>
          </main>
        </Fragment>
      )}
    </div>
  );
};

export default RootLayout;
