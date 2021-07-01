import React, { useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CHeader,
  CToggler,
  CButton,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CInput,
  CLabel,
  CModal,
  CCardHeader,
  CModalBody,
  CFormGroup,
  CInputCheckbox,
  CCard,
  CCardBody,
  CCol,
  CRow,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import EventEmitter from "reactjs-eventemitter";
import ImageUpload from 'image-upload-react'
//important for getting nice style.
import 'image-upload-react/dist/index.css'

import {database, storage, auth} from '../firebase'

var userBusinessId = ""
var businessArray = []

const TheHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector(state => state.sidebarShow)
  const location = useLocation()
  const [info, setInfo] = useState(false)
  
  const [imageSrc, setImageSrc] = useState("")
  const [imageFile, setImageFile] = useState("")

  const [businessName, setBusinessName] = useState("")
  const [businessAddress, setBusinessAddress] = useState("")
  const [businessContact, setBusinessContact] = useState("")
  const [businessEmail, setBusinessEmail] = useState("")
  const [businessWebSite, setBusinessWebSite] = useState("")

  const [dateInput, setDateInput] = useState("")
  const [dateInput1, setDateInput1] = useState("")
 
  const [adminHeaderSearch, setAdminBusinessSearch] = useState("")

  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        database.ref('users/' + user.uid).get().then((snapshot) => {
            if (snapshot.exists()) {
              const userData = snapshot.val();
              database.ref('business/' + userData.business_id).get().then((snapshot) => {
                if (snapshot.exists) {
                  const newArray = snapshot.val();
                  if (newArray) {
                    businessArray = newArray
                    setBusinessName(newArray.name)
                    setBusinessAddress(newArray.address)
                    setBusinessContact(newArray.contact)
                    setBusinessEmail(newArray.email)
                    setBusinessWebSite(newArray.website)
                    setImageSrc(newArray.image)
                  }
                }
              })
            }
          }
        )
      }
    })
    setDateInput(currentDateToFormat())
    setDateInput1(currentDateToFormat())
  }, [])

  const currentDateToFormat = () => {
    var now = new Date();

    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);

    var today = now.getFullYear()+"-"+(month)+"-"+(day) ;

    return today;
  }

  const addNewUser = () => {
    EventEmitter.dispatch('add-new-user')
  }

  const addBusiness = () => {
    EventEmitter.dispatch('add-bussiness-user')
  }

  const addBusinessAccount = () => {
    EventEmitter.dispatch('add-bussiness-account-user')
  }

  const addBankAccount = () => {
    EventEmitter.dispatch('add-bank-account')
  }

  const saveBusiness = async () => {
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
    var updates = {}
    updates[`business/${userBusinessId}/businessContact`] = businessContact;
    updates[`business/${userBusinessId}/businessEmail`] = businessEmail;
    updates[`business/${userBusinessId}/businessWebSite`] = businessWebSite;
    if (imageLink) {
      updates['business/imageLink'] = imageLink;
      setImageSrc(imageLink)
    }
    database.ref().update(updates);
    setInfo(false)
  }
 
  const handleImageSelect = (e) => {
      setImageSrc(URL.createObjectURL(e.target.files[0]))
      setImageFile(e.target.files[0]);
  }

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  const addPromotion = () => {
    history.push('/deals/add')
  }

  const onAdminHeaderSearch = (value) => {
    setAdminBusinessSearch(value);
    EventEmitter.dispatch('admin-header-search', value)
    const load = JSON.stringify({
      key: value,
      dateInput,
      dateInput1
    })
    EventEmitter.dispatch('header-date-search', load)
  }

  const onDateInputChange = (value, flag) => {
    var load = {};
    if (flag == 1) {
      setDateInput(value);
      load = JSON.stringify({
        key: adminHeaderSearch,
        dateInput: value,
        dateInput1
      })
    } else {
      setDateInput1(value);
      load = JSON.stringify({
        key: adminHeaderSearch,
        dateInput,
        dateInput1: value
      })
    }
    
    EventEmitter.dispatch('header-date-search', load)
  }

  console.log(location)

  return (
    <CHeader >
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <div className="header-content">
      {
        (location.pathname.includes("password") && !location.pathname.includes("/admin/password")) &&
        <div className="header-password">
          <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>
          <CLabel className="header-title">CHANGE PASSWORD</CLabel>
          <CButton onClick={() => EventEmitter.dispatch('change-password-save')} className = "save-btn">SAVE</CButton>
          <CButton onClick={() => setInfo(!info)} className = "logo-btn"><img src= {imageSrc ? imageSrc : "./images/jpg/company_logo.png"} /></CButton>
        </div>
      }
      {
        location.pathname.includes("dashboard") && 
        <div className="header-password">
          <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>
          <CLabel className="header-title">DASHBOARD</CLabel>
          <div className="filter-content">
            <CLabel className="header-filter-title">FILTER ROOM</CLabel>
            <CInput value = {dateInput} onChange={e => { onDateInputChange(e.target.value, 1) }} type="date" className="date-input" id="date-input1" name="date-input" placeholder="date" />
            <CLabel className="header-to-title">TO</CLabel>
            <CInput value = {dateInput1} onChange={e => { onDateInputChange(e.target.value, 2) }} type="date" className="date-input" id="date-input2" name="date-input" placeholder="date" />
            <CInputGroup className="search-bar">
              <CInputGroupPrepend>
                <CInputGroupText>
                  <CIcon name="cil-user" />
                </CInputGroupText>
              </CInputGroupPrepend>
              <CInput id="input1-group1" value = {adminHeaderSearch} onChange={e => { onAdminHeaderSearch(e.target.value) }} name="input1-group1" placeholder="Search" />
            </CInputGroup>
          </div>
          <CButton onClick={() => setInfo(!info)} className = "logo-btn"><img src= {imageSrc ? imageSrc : "./images/jpg/company_logo.png"} /></CButton>
        </div>
      }
      {
        (location.pathname.includes("users") && !location.pathname.includes("/admin/users")) &&
        <div className="header-password">
          <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>
          <CLabel className="header-title">MANAGE USERS</CLabel>
          <CButton onClick={() => addNewUser()} className = "adduser-btn">ADD USER</CButton>
          <CButton onClick={() => setInfo(!info)} className = "logo-btn"><img src= {imageSrc ? imageSrc : "./images/jpg/company_logo.png"} /></CButton>
        </div>
      }
      {
        (location.pathname == "/deals" || location.pathname == "/deals/") &&
        <div className="header-password">
          <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>
          <CLabel className="header-title">DEALS AND PROMOTIONS</CLabel>
          <CButton onClick={() => addPromotion()} className = "addpromotion-btn">ADD PROMOTIONS</CButton>
          <CButton className = "logo-btn"><img src= {imageSrc ? imageSrc : "./images/jpg/company_logo.png"} /></CButton>
        </div>
      }
      {
        location.pathname.includes("/deals/add") &&
        <div className="header-password">
          <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>
          <CLabel className="header-title">ADD PROMOTION</CLabel>
          <CButton onClick={(e) => {EventEmitter.dispatch('preview-promotion', e)}} className = "preview-btn">PREVIEW</CButton>
          <CButton onClick={(e) => {EventEmitter.emit('publish-promotion', e)}} className = "publish-btn">PUBLISH</CButton>
          <CButton onClick={() => setInfo(!info)} className = "logo-btn"><img src= {imageSrc ? imageSrc : "./images/jpg/company_logo.png"} /></CButton>
        </div>
      }
      {
        location.pathname.includes("/deals/preview") &&
        <div className="header-password">
          <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>
          <CLabel className="header-title">PREVIEW PROMOTION</CLabel>
          <CButton onClick={() => setInfo(!info)} className = "logo-btn"><img src= {imageSrc ? imageSrc : "./images/jpg/company_logo.png"} /></CButton>
        </div>
      }
      {
        location.pathname.includes("earnings") && 
        <div className="header-password">
          <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>
          <CLabel className="header-title">EARNINGS</CLabel>
          <div className="filter-content">
            <CLabel className="header-filter-title">FILTER ROOM</CLabel>
            <CInput value = {dateInput} onChange={e => { onDateInputChange(e.target.value, 1) }} type="date" className="date-input" id="date-input1" name="date-input" placeholder="date" />
            <CLabel className="header-to-title">TO</CLabel>
            <CInput value = {dateInput1} onChange={e => { onDateInputChange(e.target.value, 2) }} type="date" className="date-input" id="date-input2" name="date-input" placeholder="date" />
            <CInputGroup className="search-bar">
              <CInputGroupPrepend>
                <CInputGroupText>
                  <CIcon name="cil-user" />
                </CInputGroupText>
              </CInputGroupPrepend>
              <CInput id="input1-group1" value = {adminHeaderSearch} onChange={e => { onAdminHeaderSearch(e.target.value) }} name="input1-group1" placeholder="Search" />
            </CInputGroup>
            <CButton className="add-bank-btn"  onClick={() => addBankAccount()}>ADD BANK ACCOUNT</CButton>
          </div>
          <CButton onClick={() => setInfo(!info)} className = "logo-btn"><img src= {imageSrc ? imageSrc : "./images/jpg/company_logo.png"} /></CButton>
        </div>
      }
       {
        location.pathname.includes("/reports") &&
        <div className="header-password">
          <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>
          <CLabel className="header-title">REPORT</CLabel>
        </div>
      }
      {
        location.pathname.includes("/admin/password") &&
        <div className="header-password">
          <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>
          <CLabel className="header-title">CHANGE PASSWORD</CLabel>
        </div>
      }
      {
        location.pathname.includes("/admin/users") &&
        <div className="header-password">
          <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>
          <CLabel className="header-title">ALL USERS</CLabel>
          <div className="filter-content right-corner">
            <CButton className="add-business-btn"  onClick={() => addBusiness()}>ADD ACCOUNT</CButton>
            <CInputGroup className="search-bar">
              <CInputGroupPrepend>
                <CInputGroupText>
                  <CIcon name="cil-user" />
                </CInputGroupText>
              </CInputGroupPrepend>
              <CInput value = {adminHeaderSearch} onChange={e => { onAdminHeaderSearch(e.target.value) }} id="input1-group1" name="input1-group1" placeholder="Search" />
            </CInputGroup>
          </div>
        </div>
      }
      {
        (location.pathname.includes("/admin/business") && !location.pathname.includes("/admin/business/add") && !location.pathname.includes("/admin/business/preview")) &&
        <div className="header-password">
          <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>
          <CLabel className="header-title">BUSINESS ACCOUNT</CLabel>
          <div className="filter-content right-corner">
            <CButton className="add-business-btn"  onClick={() => addBusiness()}>ADD ACCOUNT</CButton>
            <CInputGroup className="search-bar">
              <CInputGroupPrepend>
                <CInputGroupText>
                  <CIcon name="cil-user" />
                </CInputGroupText>
              </CInputGroupPrepend>
              <CInput value = {adminHeaderSearch} onChange={e => { onAdminHeaderSearch(e.target.value) }} id="input1-group1" name="input1-group1" placeholder="Search" />
            </CInputGroup>
          </div>
        </div>
      }
      {
        location.pathname.includes("/admin/business/add") &&
        <div className="header-password">
          <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>
          <CLabel className="header-title">ADD BUSINESS ACCOUNT</CLabel>
          <div className="filter-content right-corner-2">
            <CButton className="add-business-account-btn"  onClick={() => addBusinessAccount()}>ADD ACCOUNT</CButton>
          </div>
        </div>
      }
      {
        location.pathname.includes("/admin/business/preview") &&
        <div className="header-password">
          <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>
          <CLabel className="header-title">PREVIEW BUSINESS ACCOUNT</CLabel>
        </div>
      }
      </div>

      <CModal
        show={info} 
        onClose={() => setInfo(!info)}
        color="info"
        centered
      >
        <CModalBody>
          <CCard>
            <CCardHeader>
              BUSINESS INFORMATION
            </CCardHeader>
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
                <CInput id="business-name" value = {businessName} disabled name="business-name" placeholder="" />
              </div>
              <div className="title-input">
                <CLabel htmlFor="business-address">Business Address</CLabel>
                <CInput id="business-address" value = {businessAddress}  name="business-address" disabled placeholder="" />
              </div>
              <div className="title-input">
                <CLabel htmlFor="email-address">Email Address</CLabel>
                <CInput id="email-address" value = {businessEmail} disabled onChange={e => { setBusinessEmail(e.target.value) }} name="email-address" placeholder="" />
              </div>
              <div className="title-input">
                <CLabel htmlFor="contact-number">Contact Number</CLabel>
                <CInput id="contact-number" value = {businessContact} onChange={e => { setBusinessContact(e.target.value) }}  name="contact-number" placeholder="" />
              </div>
              <div className="title-input">
                <CLabel htmlFor="website">Website</CLabel>
                <CInput id="website" value = {businessWebSite} onChange={e => { setBusinessWebSite(e.target.value)}} name="website" placeholder="" />
              </div>
              <div className="text-right">
                <CButton className="business-publish-btn"  onClick={() => saveBusiness()}>SAVE AND PUBLISH</CButton>
              </div>
            </CCardBody>
          </CCard>
        </CModalBody>
        </CModal>    
        
    </CHeader>
  )
}

export default TheHeader
