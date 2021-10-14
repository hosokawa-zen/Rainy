import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { CCard, CCardBody, CForm, CFormGroup, CCol, CLabel, CInput, CButton } from '@coreui/react'
import {auth, database} from '../../../../firebase'
import EventEmitter from "reactjs-eventemitter";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const history = useHistory();

  auth.onAuthStateChanged((user) => {
    if (user){
      database.ref('users/' + user.uid).get().then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          if (userData.role != 1) {
            //history.replace("/login/")
          }
        }
      })
    }
  })

  const savePassword = () => {
    var user = auth.currentUser;
    auth.signInWithEmailAndPassword(user.email, currentPassword).then((value) => {
      if (confirmPassword == newPassword) {
        user.updatePassword(newPassword).then(function() {
          alert("password updated");
          // Update successful.
        }).catch(function(error) {
          alert(error.message);
          // An error happened.
        });
      }
    }).catch((error) => {
      alert(error.message);
    })
  }

  return (
    <CCard className="password">
        <CCardBody>
          <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
            <CFormGroup className="mt-3" row>
              <CCol md="3"></CCol>
              <CCol md="6" className="password-input">
                <CLabel htmlFor="current-password">Current Password</CLabel>
                <CInput type="password" id="current-password" value={currentPassword} onChange={e => { setCurrentPassword(e.target.value) }} name="current-password" placeholder="" autoComplete="password"/>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3"></CCol>
              <CCol md="6" className="password-input">
                <CLabel htmlFor="new-password">New Password</CLabel>
                <CInput type="password" id="new-password" value={newPassword} onChange={e => { setNewPassword(e.target.value) }} name="new-password" placeholder="" autoComplete="password"/>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3"></CCol>
              <CCol md="6" className="password-input">
                <CLabel htmlFor="confirm-password">Confirm Password</CLabel>
                <CInput type="password" id="confirm-password" value={confirmPassword} onChange={e => { setConfirmPassword(e.target.value) }}  name="confirm-password" placeholder="" autoComplete="password"/>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3"></CCol>
              <CCol md="6" className="text-center">
                <CButton className="save-password-btn"  onClick={() => savePassword()}>SAVE PASSWORD</CButton>
              </CCol>
            </CFormGroup>
          </CForm>
        </CCardBody>
      </CCard>
  )
}

export default ChangePassword
