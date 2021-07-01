import React from 'react'
import CIcon from '@coreui/icons-react'
import { IoPeople } from "react-icons/io5";
import { IoStar } from "react-icons/io5";
import { IoLockClosed } from "react-icons/io5";
import { IoLogoUsd } from "react-icons/io5";
import { IoMdListBox } from "react-icons/io";

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <IoMdListBox className="mr-2"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Manage Users',
    to: '/users',
    icon: <IoPeople className="mr-2"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Deals and Promotions',
    to: '/deals',
    icon: <IoStar className="mr-2"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Earnings',
    to: '/earnings',
    icon: <IoLogoUsd className="mr-2"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Change Password',
    to: '/password',
    icon: <IoLockClosed className="mr-2"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Stripe Portal',
    to: '/stripe',
    icon: <IoLogoUsd className="mr-2"/>,
  },
]

export default _nav
