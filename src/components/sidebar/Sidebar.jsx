import React, { useMemo } from 'react';
import { ListGroup } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { adminLogout } from '../../redux/slices/login';

const Sidebar = ({ sideBarRef }) => {
  const dispatch = useDispatch();
  const listItems = useMemo(
    () => [
      {
        title: 'الصفحة الرئيسية',
        url: '/',
      },
      {
        title: 'المعلمين',
        url: '/teachers',
      },
      {
        title: 'اضافة معلم',
        url: '/add-teacher',
      },
      {
        title: 'المسئولين',
        url: '/admins',
      },
      {
        title: 'اضافة مسئول',
        url: '/add-admin',
      },
      {
        title: 'الاعدادات',
        url: '/settings',
      },
    ],
    []
  );

  return (
    <aside className="sidebar p-3" ref={sideBarRef}>
      <ListGroup as="ul">
        {listItems.map((list) => (
          <ListGroup.Item as="li" className="border-0 mb-2" key={list.url}>
            <NavLink to={list.url}>{list.title}</NavLink>
          </ListGroup.Item>
        ))}

        <ListGroup.Item
          as="li"
          className="border-0 mb-2 logout"
          onClick={() => {
            dispatch(adminLogout());
            window.location.href = '/login';
          }}
        >
          <NavLink to="/login">تسجيل الخروج</NavLink>
        </ListGroup.Item>
      </ListGroup>
    </aside>
  );
};

export default Sidebar;
