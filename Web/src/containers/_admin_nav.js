import React from 'react'
import CIcon from '@coreui/icons-react'
import { IoLayers } from "react-icons/io5";
import { IoIosCard } from "react-icons/io";
import { IoLockClosed } from "react-icons/io5";
import { IoPeople } from "react-icons/io5";

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Reports',
    to: '/admin/reports',
    icon: <IoLayers className="mr-2"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'All users',
    to: '/admin/users',
    icon: <IoPeople className="mr-2"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Business accounts',
    to: '/admin/business',
    icon: <IoIosCard className="mr-2"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Change Password',
    to: '/admin/password',
    icon: <IoLockClosed className="mr-2"/>,
  },
]

export default _nav
