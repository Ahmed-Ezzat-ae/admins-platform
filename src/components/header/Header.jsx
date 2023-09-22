import React, { useContext } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { AdminContext } from '../../context/AdminContext';
import { useSelector } from 'react-redux';
import {domain} from "../../utils/domain"


const Header = ({ handleClick }) => {
  const { adminData } = useContext(AdminContext);
  const { content } = useSelector((state) => state.contentSlice);
  return (
    <Navbar expand="lg" className="bg-body-tertiary" dir="rtl" fixed="top">
      <div className="px-sm-5 px-2 d-flex flex-wrap justify-content-between align-items-center w-100">
        <Navbar.Brand as={Link} to="/" className="fs-4 fs-sm-3">
        {content?.logoImg ? <img src={`${domain}/images/logo/${content?.logoImg}`} alt="logo" className='logo-img'/> : 'المتألق'}
        </Navbar.Brand>

        <Nav className="me-auto flex-grow-1 d-flex flex-row">
          {adminData?.token ? (
            <div className="ms-4 d-flex flex-row-reverse align-items-center gap-3 flex-grow-1">
              <Link to="/profile">
                <img
                  src={adminData?.profile || '/images/avatars/a1.png'}
                  alt="profile"
                  className="header-img"
                />
              </Link>
              <p className="mb-0 fs-5 fs-sm-4">{adminData?.name}</p>
            </div>
          ) : null}
          <div
            className="bars-icon d-flex align-items-center"
            onClick={handleClick}
          >
            <FaBars size={25} />
          </div>
        </Nav>
      </div>
    </Navbar>
  );
};

export default Header;
