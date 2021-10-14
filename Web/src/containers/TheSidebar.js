import React, {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CToggler,
  CImg,
} from '@coreui/react'

import {auth, database} from '../firebase'

// sidebar nav config
import navigation from './_nav'
import admin_nav from './_admin_nav'
import { IoExitOutline } from "react-icons/io5";

const TheSidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.sidebarShow)
  const sidebarShow = useSelector(state => state.sidebarShow)

  const [navState, setNavState] = useState(0);

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  const handleLogOut = () => {
    localStorage.removeItem('user');
    auth.signOut();
  }

  const location = useLocation()
  console.log(location)

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({type: 'set', sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none " to="/">
        <CToggler
          inHeader
          className="ml-3 d-md-down-none hide"
          onClick={toggleSidebar}
        />
        <div className="c-avatar">
          <CImg
            src={'avatars/6.jpg'}
            className="c-avatar-img hide"
            alt="image"
          />
        </div>
        <div className="ml-3 pr-4">
          <div className="welcome">
            Welcome Admin!
          </div>
          <div className="version">
            Version 1.0
          </div>
        </div>
      </CSidebarBrand>
      <CSidebarNav>
        {
          !location.pathname.includes("admin") && <CCreateElement
            items={navigation}
            components={{
              CSidebarNavDivider,
              CSidebarNavDropdown,
              CSidebarNavItem,
              CSidebarNavTitle
            }}
          />
        }
        {
          location.pathname.includes("admin") && <CCreateElement
            items={admin_nav}
            components={{
              CSidebarNavDivider,
              CSidebarNavDropdown,
              CSidebarNavItem,
              CSidebarNavTitle
            }}
          />
        }

      </CSidebarNav>
      <div className="c-d-md-down-none side-footer">
       <div className="c-sidebar-nav-item">
         <a onClick={() => handleLogOut()} className="c-sidebar-nav-link" tabIndex="0" href="#/login">
           <IoExitOutline className="mr-2"/>
           Log out
          </a>
        </div>
      </div>
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
