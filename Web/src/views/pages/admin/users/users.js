import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CButton,
  CInput,
  CLabel,
  CModal,
  CCardHeader,
  CModalBody,
  CFormGroup,
  CInputCheckbox,
  CCard,
  CCardBody,
} from '@coreui/react'

import {auth, database} from '../../../../firebase'

import EventEmitter from "reactjs-eventemitter";

import Loader from "react-loader-spinner";

var staticUserItems = [];

const Users = () => {
  const [userItems, setUserItems] = useState([])
  const [userItems1, setUserItems1] = useState([])
  const [addUser, setAddUser] = useState(false)

  const [userAdmin, setUserAdmin] = useState("");
  const [userName, setUserName] = useState("");
  const [userPosition, setUserPosition] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const [userPermitEarn, SetUserPermitEarn] = useState(false);
  const [userPermitDash, SetUserPermitDash] = useState(false);
  const [userPermitManage, SetUserPermitManage] = useState(false);
  const [userPermitDeals, SetUserPermitDeals] = useState(false);
  const [userPermitChangePwd, SetUserPermitChangePwd] = useState(false);
  const [isLoader, setIsLoader] = useState(false);

  const history = useHistory();

  const refreshUsers = () => {
    database.ref('users/').get().then((snapshot) => {
      if (snapshot.exists) {
        var usersData = [];
        const newArray = snapshot.val();
        if (newArray) {
          Object.keys(newArray).map((key, index) => {
            const value = newArray[key];
            usersData.push({
              id: index,
              avatar: 'images/jpg/profilePic.png',
              key,
              name: value.name,
              email: value.email,
              earn: value.permitEarn,
              dashboard: value.permitDash,
              deals: value.permitDeals,
              users: value.permitManage,
              job: value.position,
            })
          })
          setUserItems(usersData);
          staticUserItems = [...usersData]
          setIsLoader(false)
        }
      }
    });
  }

  useEffect(() => {
    if(!localStorage.getItem('user')){
      history.replace("/login");
    }

    auth.onAuthStateChanged((user) => {
      if (user){
        setIsLoader(true)
        database.ref('users/' + user.uid).get().then((snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            refreshUsers();
            if (userData.role != 1) {
              //history.replace("/login/")
            }
          }
        })
      }
    })
    EventEmitter.subscribe('add-new-user', event => {
      setAddUser(true);
    })
    EventEmitter.subscribe('admin-header-search', (key) => {
      const items = [];
      staticUserItems.forEach(item => {
        if (item.name.toLowerCase().includes(key.toLowerCase())) {
          items.push(item)
        }
      })
      setUserItems(items)
      if (key == "") {
        const iitems = [...staticUserItems]
        setUserItems(iitems)
      }
    })
  }, [])

  var changePermission = (key, tag, value) => {
    var updates = {}
    updates['users/'+ key + "/" + tag] = value;
    database.ref().update(updates);
  }

  const addNewUser = () => {
    const load = {
      admin: userAdmin,
      name: userName,
      position: userPosition,
      password: userPassword,
      permitEarn: userPermitEarn,
      permitDash: userPermitDash,
      permitManage: userPermitManage,
      permitDeals: userPermitDeals,
      permitChangePwd: userPermitChangePwd
    }
    var userListRef = database.ref('users');
    var newUserRef = userListRef.push();
    newUserRef.set(load)
    refreshUsers();
  }

  var removeUsers = (key) => {
    database.ref('users/' + key).remove();
    refreshUsers();
  }

  return (
    <div className="users">
      {
        isLoader && <div className="loader-container">
            <div className="loader-content">
                <Loader
                    type="TailSpin"
                    color="#00BFFF"
                    height={100}
                    width={100}
                />
            </div>
        </div>
      }
      <CCard>
        <CCardBody>
        <table className="table table-hover table-outline mb-0 d-none d-sm-table">
          <tbody>
          {
              userItems.map((data, index) => {
                return (
                  <tr key={index}>
                    <td className="avatar-content">
                      <img src={data.avatar} className="c-avatar-img" alt="image" />
                    </td>
                    <td className="name-content">
                      <div className="name-field">{`${data.name ?? ''} (${data.email})`}</div>
                      <div className="small text-muted">
                        <span>{data.job}</span>
                      </div>
                    </td>
                    <td className="earn-content d-none">
                      <CFormGroup variant="custom-checkbox" className="mr-0" inline>
                        <CInputCheckbox
                          custom
                          id={"inline-checkbox0" + "-checkbox-" + index}
                          name={"inline-checkbox0" + "-checkbox-" + index}
                          checked={data.earn}
                          onChange={e => {
                            var newArray = [...userItems];
                            newArray[index].earn = !newArray[index].earn;
                            setUserItems(newArray);
                            changePermission(newArray[index].key, 'permitEarn', newArray[index].earn);
                          }}
                        />
                        <CLabel variant="custom-checkbox" htmlFor={"inline-checkbox0" + "-checkbox-" + index} >Earn</CLabel>
                      </CFormGroup>
                    </td>
                    <td className="dashboard-content d-none">
                      <CFormGroup variant="custom-checkbox" className="mr-0" inline>
                        <CInputCheckbox
                          custom
                          id={"inline-checkbox1" + "-checkbox-" + index}
                          name={"inline-checkbox1" + "-checkbox-" + index}
                          checked={data.dashboard}
                          onChange={e => {
                            var newArray = [...userItems];
                            newArray[index].dashboard = !newArray[index].dashboard;
                            setUserItems(newArray);
                            changePermission(newArray[index].key, 'permitDash', newArray[index].dashboard);
                          }}
                        />
                        <CLabel variant="custom-checkbox" htmlFor={"inline-checkbox1" + "-checkbox-" + index} >Dashboard</CLabel>
                      </CFormGroup>
                    </td>
                    <td className="user-content d-none">
                      <CFormGroup variant="custom-checkbox" className="mr-0" inline>
                        <CInputCheckbox
                          custom
                          id={"inline-checkbox2" + "-checkbox-" + index}
                          name={"inline-checkbox2" + "-checkbox-" + index}
                          checked={data.users}
                          onChange={e => {
                            var newArray = [...userItems];
                            newArray[index].users = !newArray[index].users;
                            setUserItems(newArray);
                            changePermission(newArray[index].key, 'permitManage', newArray[index].users);
                          }}
                        />
                        <CLabel variant="custom-checkbox" htmlFor={"inline-checkbox2" + "-checkbox-" + index}>Manage Users</CLabel>
                      </CFormGroup>
                    </td>
                    <td className="deal-content d-none">
                      <CFormGroup variant="custom-checkbox" className="mr-0" inline>
                        <CInputCheckbox
                          custom
                          id={"inline-checkbox3" + "-checkbox-" + index}
                          name={"inline-checkbox3" + "-checkbox-" + index}
                          checked={data.deals}
                          onChange={e => {
                            var newArray = [...userItems];
                            newArray[index].deals = !newArray[index].deals;
                            setUserItems(newArray);
                            changePermission(newArray[index].key, 'permitDeals', newArray[index].deals);
                          }}
                        />
                        <CLabel variant="custom-checkbox" htmlFor={"inline-checkbox3" + "-checkbox-" + index}>Deals and Promotions</CLabel>
                      </CFormGroup>
                    </td>
                    <td className="remove-btn-content d-none">
                      <CButton onClick= {() => removeUsers(data.key)} className = "remove-btn">Remove</CButton>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        </CCardBody>
      </CCard>

      <CModal
          show={addUser}
          onClose={() => setAddUser(!addUser)}
          centered
        >
          <CModalBody>
            <CCard>
              <CCardHeader>
                NEW USER
              </CCardHeader>
              <CCardBody>
                <div className="title-input">
                  <CLabel htmlFor="user-admin">User Admin</CLabel>
                  <CInput value={userAdmin} onChange={e => { setUserAdmin(e.target.value) }}  id="user-admin" name="user-admin" placeholder="" />
                </div>
                <div className="title-input">
                  <CLabel htmlFor="user-name">Name</CLabel>
                  <CInput value={userName} onChange={e => { setUserName(e.target.value) }} id="user-name" name="user-name" placeholder="" />
                </div>
                <div className="title-input">
                  <CLabel htmlFor="user-position">Position</CLabel>
                  <CInput value={userPosition} onChange={e => { setUserPosition(e.target.value) }} id="user-position" name="user-position" placeholder="" />
                </div>
                <div className="title-input mt-5 mb-0">
                  <CLabel htmlFor="user-password">Password</CLabel>
                  <CInput value={userPassword} onChange={e => { setUserPassword(e.target.value) }} id="user-password" name="user-password" type="password" placeholder="" />
                </div>
                <CLabel  className="info-title">*** Provide initial admin account password</CLabel>
                <div className="permission-content">
                  <CLabel className="permission-title">Permissions</CLabel>
                  <div className="permission-line"></div>
                </div>

                <CFormGroup variant="custom-checkbox" className="mr-0 ml-5 mb-2" inline>
                  <CInputCheckbox
                      custom
                      id="checkbox-permit-earn"
                      name="checkbox-permit-earn"
                      checked={userPermitEarn}
                      onChange= {e => {SetUserPermitEarn(!userPermitEarn)}}
                  />
                  <CLabel variant="custom-checkbox" className="permission-check-label" htmlFor="checkbox-permit-earn">Earn</CLabel>
                </CFormGroup>

                <CFormGroup variant="custom-checkbox" className="mr-0 ml-5 mb-2" inline>
                  <CInputCheckbox
                      custom
                      id="checkbox-permit-dash"
                      name="checkbox-permit-dash"
                      checked={userPermitDash}
                      onChange= {e => {SetUserPermitDash(!userPermitDash)}}
                  />
                  <CLabel variant="custom-checkbox" className="permission-check-label" htmlFor="checkbox-permit-dash">Dashboard</CLabel>
                </CFormGroup>

                <CFormGroup variant="custom-checkbox" className="mr-0 ml-5 mb-2" inline>
                  <CInputCheckbox
                      custom
                      id="checkbox-permit-manage"
                      name="checkbox-permit-manage"
                      checked={userPermitManage}
                      onChange= {e => {SetUserPermitManage(!userPermitManage)}}
                  />
                  <CLabel variant="custom-checkbox" className="permission-check-label" htmlFor="checkbox-permit-manage">Manage Users</CLabel>
                </CFormGroup>

                <CFormGroup variant="custom-checkbox" className="mr-0 ml-5 mb-2" inline>
                  <CInputCheckbox
                      custom
                      id="checkbox-permit-deals"
                      name="checkbox-permit-deals"
                      checked={userPermitDeals}
                      onChange= {e => {SetUserPermitDeals(!userPermitDeals)}}
                  />
                  <CLabel variant="custom-checkbox" className="permission-check-label" htmlFor="checkbox-permit-deals">Deals and Promotions</CLabel>
                </CFormGroup>

                <CFormGroup variant="custom-checkbox" className="mr-0 ml-5 mb-2" inline>
                  <CInputCheckbox
                      custom
                      id="checkbox-permit-change-pwd"
                      name="checkbox-permit-change-pwd"
                      checked={userPermitChangePwd}
                      onChange= {e => {SetUserPermitChangePwd(!userPermitChangePwd)}}
                  />
                  <CLabel variant="custom-checkbox" className="permission-check-label" htmlFor="checkbox-permit-change-pwd">Change Password</CLabel>
                  <CLabel  className="ml-3 info-title">*default access for user profiles</CLabel>
                </CFormGroup>

                <div className="text-right">
                  <CButton className="add-user-btn" onClick={() =>{setAddUser(!addUser); addNewUser()} }>Add User</CButton>
                </div>
              </CCardBody>
            </CCard>
          </CModalBody>
        </CModal>
    </div>
  )
}

export default Users
