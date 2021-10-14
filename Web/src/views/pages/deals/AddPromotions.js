import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
  CFormGroup,
  CCard,
  CCardBody,
  CTextarea,
  CSelect,
  CInput,
  CInputCheckbox,
  CLabel,
  CRow,
  CCol,
  CModal,
  CModalBody,
  CImg,
  CButton,
  CInputGroup,
  CInputGroupAppend,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import ImageUpload from 'image-upload-react'
//important for getting nice style.
import 'image-upload-react/dist/index.css'

import EventEmitter from "reactjs-eventemitter";

import {auth, database, storage} from '../../../firebase'

import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import Geocode from "react-geocode";

import Loader from "react-loader-spinner";

var firstLunch = false;
var refreshCount = 0;
var innerCount = 0;

var branchSelectedIndex = 0;
var branchSelectedLat = 0;
var branchSelectedLng = 0;

var userId = "";
var userBusinessId = "";
var googleAPIKey = "";
// AIzaSyCeKqgBKVqr1VQQbpKQfuvvNQep6eYiLxE
const GoogleMapComponent = compose(
    withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?key=" + googleAPIKey,
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `400px` }} />,
      mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
  )((props) =>
    <GoogleMap
      defaultZoom={3}
      defaultCenter={{ lat: 41.397, lng: -98.644 }}
    >
      <Marker draggable position={{ lat: 41.397, lng: -98.644 }} onDragEnd = {props.onDragEnd} />
    </GoogleMap>
  )

const AddPromotions = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [originPrice, setOriginPrice] = useState("");
    const [promotionPrice, setPromotionPrice] = useState("");
    const [imageSrc, setImageSrc] = useState()
    const [imageFile, setImageFile] = useState()
    const [companyLogo, setCompanyLogo] = useState(false);
    const [branchs, setBranchs] = useState([{
        address: "",
        selled: false,
        lat: 0,
        lng: 0,
    }]);
    const [terms, setTerms] = useState("");
    const [totalDeals, setTotalDeals] = useState(100);
    const [dealsPerUser, setDealsPerUser] = useState(1);
    const [validaty1, setValidaty1] = useState("");
    const [validaty2, setValidaty2] = useState("");
    const [companyInfo, setCompanyInfo] = useState(false);
    const [businessName, setBusinessName] = useState("");
    const [businessAddress, setBusinessAddress] = useState("")
    const [businessContact, setBusinessContact] = useState("")
    const [businessEmail, setBusinessEmail] = useState("")
    const [businessWebSite, setBusinessWebSite] = useState("")

    const [isLoader, setIsLoader] = useState(false);

    const [preview, setPreview] = useState(false)
    const [showGoogle, setShowGoogle] = useState(false)

    const [leftTitle, setLeftTitle] =  useState("")

    const history = useHistory();

    refreshCount++;
    EventEmitter.subscribe('publish-promotion', event => {
        innerCount++
        if (innerCount == refreshCount) {
            addPromotion();
        }
    })

    useEffect(() => {
      if(!localStorage.getItem('user')){
        history.replace("/login");
      }

      auth.onAuthStateChanged((user) => {
            if (user){
              setIsLoader(true);
                userId = user.uid
                database.ref('users/' + user.uid).get().then((snapshot) => {
                    if (snapshot.exists()) {
                        const userData = snapshot.val();
                        userBusinessId = userData.business_id;
                        database.ref('business/' + userData.business_id).get().then((snapshot) => {
                            if (snapshot.exists) {
                            const newArray = snapshot.val();
                            if (newArray) {
                                setBusinessName(newArray.name)
                                setBusinessAddress(newArray.address)
                                setBusinessContact(newArray.contact)
                                setBusinessEmail(newArray.email)
                                setBusinessWebSite(newArray.website)
                            }
                            }
                            setIsLoader(false);
                        })
                        if (userData.role != 2) {
                            //history.replace("/login/")
                        }
                    } else {

                    }
                })
            }
        })

        EventEmitter.subscribe('preview-promotion', event => {
            var totalCount = 0;
            var remainCount = 0;
            Object.keys(branchs).map((key, index) => {
            const branch = branchs[key];
            if (branch) {
                totalCount++
                if (!branch.selled) {
                remainCount++
                }
            }
            })
            var templeftTitle = `${totalCount} left ${remainCount} locations`
            setLeftTitle(templeftTitle)
            setPreview(true);
        })
    }, [branchs])

    const addPromotion = async (count) => {
        setIsLoader(true);
        refreshCount = 0;
        innerCount = 0;
        var imageLink = "";
        if (imageFile) {
            imageLink = await new Promise((resolve, reject) => {
                const timestamp = Math.floor(Date.now() / 1000);
                const url = "promotions/" + timestamp + "-" + imageFile.name;
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
        const id = Math.floor(Date.now()).toString() + Math.floor(Math.random()*(999-100+1)+100).toString();
        const createdAt = Date.now();
        const load = {
            id,
            name,
            description,
            originPrice,
            promotionPrice,
            imageLink,
            companyLogo,
            branchs,
            terms,
            totalDeals: totalDeals * 1,
            remainDeals: totalDeals * 1,
            dealsPerUser,
            validaty1,
            validaty2,
            companyInfo,
            createdAt,
            userId,
            userBusinessId,
        }
        var promotionListRef = database.ref('promotions/');
        var newPromotionRef = promotionListRef.push();
        newPromotionRef.set(load)
        setIsLoader(false);
        history.replace('/deals/')
    }

    const handleImageSelect = (e) => {
        setImageSrc(URL.createObjectURL(e.target.files[0]))
        setImageFile(e.target.files[0]);
    }

    const addNewBranch = () => {
        const newBranch = [...branchs];
        const createdAt = Date.now()
        const selledAt = 0
        newBranch.push({
            address: "",
            selled: false,
            createdAt,
            selledAt,
            lat: 0,
            lng: 0,
        })
        setBranchs(newBranch)
    }

    const removeBranch = (index) => {
        const newBranch = [...branchs];
        newBranch.splice(index, 1);
        setBranchs(newBranch)
    }

    const updateBranch = (value, index) => {
        const newBranch = [...branchs];
        newBranch[index].address = value;
        setBranchs(newBranch)
    }

    const openGoogleMaps = (index) => {
        branchSelectedIndex = index;
        setShowGoogle(true)
    }

    const getAddressFromMap = () => {
        // branchSelectedIndex
        //branchSelectedLat
        //branchSelectedLng
        Geocode.setApiKey(googleAPIKey);
        Geocode.fromLatLng(branchSelectedLat, branchSelectedLng).then(
            (response) => {
                const address = response.results[0].formatted_address;
                console.log(address);
                const newBranch = [...branchs];
                newBranch[branchSelectedIndex].address = address;
                newBranch[branchSelectedIndex].lat = branchSelectedLat;
                newBranch[branchSelectedIndex].lng = branchSelectedLng;
                setBranchs(newBranch)
            },
            (error) => {
                console.error(error);
                const newBranch = [...branchs];
                newBranch[branchSelectedIndex].address = "TEST ACCOUNTS";
                newBranch[branchSelectedIndex].lat = branchSelectedLat;
                newBranch[branchSelectedIndex].lng = branchSelectedLng;
                setBranchs(newBranch)
            }
        );
        setShowGoogle(false)
    }

    return (
        <div className="addpromotions">
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

            <CRow>
                <CCol md="6" sm="12">
                    <CCard>
                        <CCardBody>
                            <div className="title-input">
                                <CLabel htmlFor="promotion-name">Promotion Name</CLabel>
                                <CInput id="promotion-name" value = {name} onChange={e => { setName(e.target.value) }} name="promotion-name" placeholder="" />
                            </div>
                            <div className="title-input">
                                <CLabel className="center-label" htmlFor="description">Description</CLabel>
                                <CTextarea id="description" value = {description} onChange={e => { setDescription(e.target.value) }} name="description" placeholder="" />
                            </div>
                            <div className="title-input">
                                <CLabel className="center-label" htmlFor="original-price">Original Price</CLabel>
                                <CInput id="original-price" type="number" value = {originPrice} onChange={e => { setOriginPrice(e.target.value) }} name="original-price" placeholder="" />
                            </div>
                            <div className="title-input">
                                <CLabel htmlFor="promotional-price">Promotional Price</CLabel>
                                <CInput id="promotional-price" type="number" value = {promotionPrice} onChange={e => { setPromotionPrice(e.target.value) }} name="promotional-price" placeholder="" />
                            </div>
                            <div className="title-input">
                                <CLabel className="promotional-image-label" htmlFor="promotional-image">Promotional Image</CLabel>
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
                            <div className="title-input mt-2 mb-3">
                                <CLabel className="company-logo company-logo-empty-label" htmlFor="company-logo"></CLabel>
                                <CFormGroup variant="custom-checkbox" className="mr-0" inline>
                                    <CInputCheckbox
                                        custom
                                        id="compnay-logo-checkbox"
                                        name="compnay-logo-checkbox"
                                        checked={companyLogo}
                                        onChange={() => {setCompanyLogo(!companyLogo)}}
                                    />
                                    <CLabel variant="custom-checkbox" className="company-logo company-logo-label" htmlFor="compnay-logo-checkbox">Use company logo</CLabel>
                                </CFormGroup>
                            </div>
                            <div className="title-input">
                                <CLabel htmlFor="promotional-price">Participating Branches</CLabel>
                                <div className="promotional-list-content">
                                    {

                                        branchs.map((branch, index) => {
                                            return (<div key={index} className="promotional-content">
                                                <CLabel className="part-branches" htmlFor="promotional-price">{index + 1}</CLabel>
                                                <CInputGroup>
                                                    <CInput className="part-branches-text" disabled value = {branch.address} onChange={e => { updateBranch(e.target.value, index) }} placeholder="" />
                                                    <CInputGroupAppend>
                                                        <CButton onClick={() => {openGoogleMaps(index)}} type="button"><CIcon name="cil-location-pin" /></CButton>
                                                    </CInputGroupAppend>
                                                </CInputGroup>
                                                {
                                                   (index == branchs.length - 1) && <CButton onClick={() => { addNewBranch() }} className = "part-branch-btn part-branch-btn-plus">+</CButton>
                                                }
                                                {
                                                   (branchs.length > 1) && <CButton onClick={() => { removeBranch(index) }} className = "part-branch-btn part-branch-btn-minus">-</CButton>
                                                }
                                            </div>)
                                        })
                                    }
                                </div>
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol md="6" sm="12">
                    <CCard>
                        <CCardBody>
                            <div className="title-input">
                                <CLabel htmlFor="terms">Terms and Conditions</CLabel>
                                <CTextarea id="terms" value = {terms} onChange={e => { setTerms(e.target.value) }} name="terms" placeholder="" />
                            </div>
                            <div className="title-input mt-2">
                                <CLabel className="promotion-details-left"  htmlFor="promotion-details"></CLabel>
                                <CLabel className="promotion-details-right" htmlFor="promotion-details">Promotion details</CLabel>
                            </div>
                            <div className="title-input">
                                <CLabel className="center-label" htmlFor="total-deals">Total Deals</CLabel>
                                <CSelect value = {totalDeals} onChange={e => { setTotalDeals(e.target.value) }} custom name="total-deals" id="total-deals">
                                    <option>100</option>
                                    <option>200</option>
                                    <option>300</option>
                                    <option>400</option>
                                    <option>500</option>
                                </CSelect>
                            </div>
                            <div className="title-input">
                                <CLabel htmlFor="deals-allowed">Deals allowed per user</CLabel>
                                <CSelect value = {dealsPerUser} onChange={e => { setDealsPerUser(e.target.value) }} custom name="deals-allowed" id="deals-allowed">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                </CSelect>
                            </div>
                            <div className="title-input">
                                <CLabel htmlFor="deals-allowed">Promotion Validaty</CLabel>
                                <CRow className="date-picker-row">
                                    <CCol xl="6" md="12">
                                        <CInput value = {validaty1} onChange={e => { setValidaty1(e.target.value) }} type="date" className="date-input mb-2" id="date-input1" name="date-input1" placeholder="date" />
                                    </CCol>
                                    <CCol xl="6" md="12">
                                        <CInput value = {validaty2} onChange={e => { setValidaty2(e.target.value) }} type="date" className="date-input mb-2" id="date-input2" name="date-input2" placeholder="date" />
                                    </CCol>
                                </CRow>
                            </div>
                            <div className="title-input mt-2">
                                <CLabel className="company-logo-empty-label" htmlFor="company-logo"></CLabel>
                                <CFormGroup variant="custom-checkbox" className="mr-0" inline>
                                    <CInputCheckbox
                                        custom
                                        id="company-info-checkbox"
                                        name="company-info-checkbox"
                                        checked={companyInfo}
                                        onChange={() => {setCompanyInfo(!companyInfo)}}
                                    />
                                    <CLabel variant="custom-checkbox" className="company-logo-label" htmlFor="company-info-checkbox">Display company contact information</CLabel>
                                </CFormGroup>
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

        <CModal
          show={preview}
          onClose={() => setPreview(!preview)}
          centered
          className="mobile-preview-model"
        >
          <CModalBody className = "p-0">
            <CCard className = "m-0">
              <CCardBody className = "p-0">
                <div className="title-input mobile-preview-content">
                  <div className="mobile-header">
                  </div>
                  <div className="mobile-preview">
                      <div className="mobile-content">
                        <CImg
                          className="preview-image"
                          id = "preview-image"
                          src={imageSrc}
                          alt="preview-image"
                        />
                      </div>
                      <div className="mobile-content p-3">
                        <CRow>
                          <CCol className="mobile-content-section" md="7" sm="12">
                            <CLabel id="mobile-preview-name" className="mobile-title">{name}</CLabel>
                            <CLabel id="mobile-preview-job" className="mobile-letter ">{businessName}</CLabel>
                          </CCol>
                          <CCol className="mobile-content-section" md="5" sm="12">
                            <CLabel id="mobile-preview-price" className="mobile-title text-right ">{promotionPrice}</CLabel>
                            <CLabel id="mobile-preview-location" className="mobile-letter text-right ">{leftTitle}</CLabel>
                          </CCol>
                        </CRow>
                      </div>
                      <div className="mobile-content p-3">
                        <CRow>
                          <CCol className="mobile-content-section" md="7" sm="12">
                            <CLabel className="mobile-title category-title">Deal Description</CLabel>
                          </CCol>
                          <CCol className="mobile-content-section" md="5" sm="12">
                          </CCol>
                        </CRow>
                        <CLabel className="mobile-letter">{description}</CLabel>
                      </div>
                      <div className="mobile-content p-3">
                        <CRow>
                          <CCol className="mobile-content-section" md="8" sm="12">
                            <CLabel className="mobile-title category-title">Terms and Conditions</CLabel>
                          </CCol>
                          <CCol className="mobile-content-section" md="4" sm="12">
                          </CCol>
                        </CRow>
                        <CLabel className="mobile-letter"> {terms} </CLabel>
                      </div>
                      <div className="mobile-content p-3">
                        <CRow>
                          <CCol className="mobile-content-section" md="8" sm="12">
                            <CLabel className="mobile-title category-title">Participating Branches</CLabel>
                          </CCol>
                          <CCol className="mobile-content-section" md="4" sm="12">
                          </CCol>
                        </CRow>
                        {

                            branchs.map((branch, index) => {
                                return (
                                    <CLabel className="details-label mb-0" >{branch.address}</CLabel>
                                )
                            })
                        }
                      </div>
                      <div className="mobile-content p-3">
                        <CRow>
                          <CCol className="mobile-content-section" md="8" sm="12">
                            <CLabel className="mobile-title category-title">Contact Information</CLabel>
                          </CCol>
                          <CCol className="mobile-content-section" md="4" sm="12">
                          </CCol>
                        </CRow>
                        <CLabel className="details-label mb-0" id="parti-branch-1"><CIcon name="cil-envelope-closed" />{businessEmail}</CLabel>
                        <CLabel className="details-label mb-0" id="parti-branch-2"><CIcon name="cil-envelope-closed" />{businessContact}</CLabel>
                        <CLabel className="details-label mb-0" id="parti-branch-3"><CIcon name="cil-envelope-closed" />{businessWebSite}</CLabel>
                      </div>
                    </div>
                </div>
              </CCardBody>
            </CCard>
          </CModalBody>
        </CModal>

        <CModal
          show={showGoogle}
          onClose={() => setShowGoogle(!showGoogle)}
          centered
          className="google-preview-modal"
        >
          <CModalBody className = "p-0">
            <CCard className = "m-0">
              <CCardBody className = "p-0">
                    <GoogleMapComponent
                        onDragEnd = {(e) => {
                            branchSelectedLat = e.latLng.lat()
                            branchSelectedLng = e.latLng.lng()
                        }}
                    />
                    <div className="m-3 text-center">
                        <CButton className="get-address-btn" onClick={() => {getAddressFromMap()}} type="button">Get Address From Marker</CButton>
                    </div>
              </CCardBody>
            </CCard>
          </CModalBody>
        </CModal>

        </div>
    )
}

export default AddPromotions
