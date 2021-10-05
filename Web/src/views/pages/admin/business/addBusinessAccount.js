import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CButton,
  CInput,
  CLabel,

} from '@coreui/react'
import { useHistory } from 'react-router-dom'
import ImageUpload from 'image-upload-react'
import EventEmitter from 'reactjs-eventemitter'
import {auth , authWork,database, storage} from '../../../../firebase'

import Loader from "react-loader-spinner";

var refreshCount = 0;
var innerCount = 0;

const AddBusinessAccounts = () => {

  var admin_id = "";
  const [businessName, setBusinessName] = useState()
  const [businessAddress, setBusinessAddress] = useState()
  const [businessContact, setBusinessContact] = useState()
  const [businessEmail, setBusinessEmail] = useState()
  const [businessWebSite, setBusinessWebSite] = useState()
  const [userName, setUserName] = useState()
  const [tempPassword, setTempPassword] = useState()

  const [imageSrc, setImageSrc] = useState()
  const [imageFile, setImageFile] = useState()
  const [isLoader, setIsLoader] = useState(false);

  const history = useHistory();

  const handleImageSelect = (e) => {
    setImageSrc(URL.createObjectURL(e.target.files[0]))
    setImageFile(e.target.files[0]);
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        // history.replace("/login/")
      } else {
        admin_id = user.uid;
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
  }, [])

  refreshCount++;
  EventEmitter.subscribe('add-bussiness-account-user', () => {
    innerCount++
    if (innerCount == refreshCount) {
      saveBusiness();
    }
  })

  const makeBusinessId = (length) => {
    var result           = [];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
        result.push(characters.charAt(Math.floor(Math.random() *
        charactersLength)));
      }
    return result.join('') + Math.floor(Date.now() / 1000);
  }

  const saveBusiness = () => {
    setIsLoader(true)
    authWork.createUserWithEmailAndPassword(businessEmail, tempPassword).then( async (credential) => {
      console.log(credential)

      if(!credential.user) {
        alert("no user")
        return
      }
      const user_id = credential.user.uid;

      var imageLink = "";
      if (imageFile) {
          imageLink = await new Promise((resolve, reject) => {
              let extension = imageFile.name.split('.').pop()
              const url = "business/logo." + extension;
              storage.ref(url).put(imageFile).then(function(snapshot) {
                  storage.ref(url).getDownloadURL().then((link) => {
                      resolve(link)
                  }).catch((error) => {
                      reject('')
                  })
              }).catch((error) => {
                  reject('')
              })
          })
      }
      const business_id = makeBusinessId(20);
      var updates = {}
      updates[`business/${business_id}/name`] = businessName;
      updates[`business/${business_id}/address`] = businessAddress;
      updates[`business/${business_id}/contact`] = businessContact;
      updates[`business/${business_id}/email`] = businessEmail;
      updates[`business/${business_id}/website`] = businessWebSite;
      updates[`business/${business_id}/active`] = true;
      updates[`business/${business_id}/locked`] = false;
      updates[`business/${business_id}/created_at`] = Math.floor(Date.now() / 1000);

      if (imageLink) {
        updates[`business/${business_id}/image`] = imageLink;
        setImageSrc(imageLink)
      }
      updates[`business/${business_id}/userId`] = user_id;

      updates[`users/${user_id}/admin`] = admin_id;
      updates[`users/${user_id}/avatar`] = "";
      updates[`users/${user_id}/email`] = businessEmail;
      updates[`users/${user_id}/password`] = tempPassword;
      updates[`users/${user_id}/name`] = userName;
      updates[`users/${user_id}/permitChangePwd`] = true;
      updates[`users/${user_id}/permitDash`] = true;
      updates[`users/${user_id}/permitDeals`] = true;
      updates[`users/${user_id}/permitManage`] = true;
      updates[`users/${user_id}/position`] = "";
      updates[`users/${user_id}/role`] = 2;
      updates[`users/${user_id}/business_id`] = business_id;

      database.ref().update(updates);
      setIsLoader(false)
      history.replace('/admin/business/')
    }).catch(error => {
      setIsLoader(false)
      alert(error)
    })

  }


  return (
    <div className="add-business-account">
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
          <div className="title-input">
            <CLabel className="business-image-label" htmlFor="business-image">Business Logo</CLabel>
            <ImageUpload
              handleImageSelect={handleImageSelect}
              imageSrc={imageSrc}
              setImageSrc={setImageSrc}
              style={{
                  width: 100,
                  height: 100,
                  background: '#f2f2f2'
              }}
            />
          </div>
          <div className="title-input">
            <CLabel htmlFor="business-name">Business Name</CLabel>
            <CInput id="business-name" value = {businessName} onChange={e => { setBusinessName(e.target.value) }}  name="business-name" placeholder="" />
          </div>
          <div className="title-input">
            <CLabel htmlFor="business-address">Address</CLabel>
            <CInput id="business-address" value = {businessAddress} onChange={e => { setBusinessAddress(e.target.value) }} name="business-address" placeholder="" />
          </div>
          <div className="title-input">
            <CLabel htmlFor="contact-number">Contact Number</CLabel>
            <CInput id="contact-number" value = {businessContact} onChange={e => { setBusinessContact(e.target.value) }}  name="contact-number" placeholder="" />
          </div>
          <div className="title-input">
            <CLabel htmlFor="email-address">Email Address</CLabel>
            <CInput id="email-address" value = {businessEmail} onChange={e => { setBusinessEmail(e.target.value) }} name="email-address" placeholder="" />
          </div>
          <div className="title-input">
            <CLabel htmlFor="website">Website</CLabel>
            <CInput id="website" value = {businessWebSite} onChange={e => { setBusinessWebSite(e.target.value)}} name="website" placeholder="" />
          </div>
          <div className="title-input">
            <CLabel htmlFor="user-name">User Name</CLabel>
            <CInput id="user-name" value = {userName} onChange={e => { setUserName(e.target.value)}}   name="user-name" placeholder="" />
          </div>
          <div className="title-input">
            <CLabel htmlFor="temporary-password">Temporary Password</CLabel>
            <CInput id="temporary-password" value = {tempPassword} onChange={e => { setTempPassword(e.target.value)}} name="temporary-password" placeholder="" />
          </div>
          <CLabel  className="info-title mb-4">*Credentials will be sent to the business email address</CLabel>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default AddBusinessAccounts
