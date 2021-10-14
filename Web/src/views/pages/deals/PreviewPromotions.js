import React, { useEffect, useState } from 'react'
import {
  CFormGroup,
  CCard,
  CCardBody,
  CTextarea,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CInput,
  CInputCheckbox,
  CLabel,
  CRow,
  CCol,
  CImg,
} from '@coreui/react'
import { useHistory, useParams } from 'react-router-dom'

import DataTable from 'react-data-table-component';

import CIcon from '@coreui/icons-react'

import {database, auth} from '../../../firebase'
//important for getting nice style.
import 'image-upload-react/dist/index.css'

import Loader from "react-loader-spinner";

var staticTransactions = [];
var userBusinessId = "";
const PreviewPromotions = () => {

    const history = useHistory();

    const [dealItems, setDealItems] = useState({
      name: "",
      description: "",
      originPrice: "",
      promotionPrice: "",
      imageLink: "",
      companyLogo: "",
      branchs: [],
      terms: "",
      totalDeals: "",
      dealsPerUser: "",
      validaty1: "",
      validaty2: "",
      companyInfo: "",
    })

    const [transItems, setTransItems] = useState([])
    const [leftTitle, setLeftTitle] =  useState("")
    const [dateInput, setDateInput] = useState("")
    const [dateInput1, setDateInput1] = useState("")
    const [headerSearch, setHeaderSearch] = useState("")

    const [businessName, setBusinessName] = useState("");
    const [businessAddress, setBusinessAddress] = useState("")
    const [businessContact, setBusinessContact] = useState("")
    const [businessEmail, setBusinessEmail] = useState("")
    const [businessWebSite, setBusinessWebSite] = useState("")

    const [isLoader, setIsLoader] = useState(false);

    const { id } = useParams();

    useEffect(() => {
      if(!localStorage.getItem('user')){
        history.replace("/login");
      }

      auth.onAuthStateChanged((user) => {
        try {
          if (user){
            setIsLoader(true);
            database.ref('users/' + user.uid).get().then((snapshot) => {
              if (snapshot.exists()) {
                const userData = snapshot.val();
                refreshBusiness(userData)
                if (userData.role != 2) {
                  //history.replace("/login/")
                }
              } else {
                setIsLoader(false);
              }
            })
          }
        } catch (error) {
          setIsLoader(false);
        }
      })
    }, [])

    const onHeaderSearch = (value) => {
      setHeaderSearch(value);
      searchTransaction(value, dateInput, dateInput1)
    }

    const onDateInputChange = (value, flag) => {
      var load = {};
      if (flag == 1) {
        setDateInput(value);
        load = {
          key: headerSearch,
          dateInput: value,
          dateInput1
        }
      } else {
        setDateInput1(value);
        load = {
          key: headerSearch,
          dateInput,
          dateInput1: value
        }
      }
      searchTransaction(load.key, load.dateInput, load.dateInput1)
    }

    function toTimestamp(strDate){
      var datum = Date.parse(strDate);
      return datum/1000;
    }

    const searchTransaction = (key, data, data1) => {
      var items = [];
      staticTransactions.forEach(transaction => {
        if (transaction.name.toLowerCase().includes(key.toLowerCase())) {
         if (toTimestamp(transaction.date_of_purchase) >= (toTimestamp(data) - 3600 * 24 - 1) && toTimestamp(transaction.date_of_purchase) <= (toTimestamp(data1) + 3600 * 24 - 1)) {
          items.push(transaction)
         }
        }
      })
      setTransItems(items)
    }

    const refreshBusiness = (userData) => {
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

                refreshTransaction();
                refreshPromotions();
            }
          } else {
            setIsLoader(false);
          }
      })
    }

    const refreshPromotions = () => {
      database.ref('promotions/' + id).get().then((snapshot) => {
        if (snapshot.exists) {
          const dealsData = snapshot.val();
          var totalCount = 0;
          var remainCount = 0;
          Object.keys(dealsData.branchs).map((key, index) => {
            const branch = dealsData.branchs[key];
            totalCount++
            if (!branch.selled) {
              remainCount++
            }
          })
          var templeftTitle = `${totalCount} left ${remainCount} locations`
          setLeftTitle(templeftTitle)
          setDealItems(dealsData);
          setIsLoader(false);
        }
      });
    }

    const refreshTransaction = () => {
      database.ref('transactions/').get().then((snapshot) => {
        if (snapshot.exists) {
          const transData = snapshot.val();
          if (transData == null) {
            setTransItems([])
          } else {
            database.ref('users/').get().then((snapshot2) => {
              if (snapshot2.exists) {
                const userData = snapshot2.val();
                if (userData) {
                  database.ref('promotions/').get().then((snapshot3) => {
                    if (snapshot3.exists) {
                      const promoData = snapshot3.val();
                      if (promoData) {
                        const items = [];
                        Object.keys(transData).map(key => {
                          var item = transData[key];
                          if (item.deal_status == 0) {
                            item.deal_status = "Available";
                          } else if (item.deal_status == 1) {
                            item.deal_status = "Active";
                          } else if (item.deal_status == 2) {
                            item.deal_status = "Claimed";
                          }
                          item.transaction_key = key;
                          if (promoData[item.promotio_id]) {
                            item.promotio_name = promoData[item.promotio_id].name
                          }
                          if (userData[item.user_id]) {
                            item.name = userData[item.user_id].name
                            item.user_admin = userData[item.user_id].admin
                          }
                          if (item.promotio_id == id) {
                            items.push(item)
                          }
                        })
                        staticTransactions = [...items]
                        setTransItems(items)
                      }
                    } else {
                      setIsLoader(false);
                    }
                  })
                }
              } else {
                setIsLoader(false);
              }
            })
          }
        } else {
          setIsLoader(false);
        }
      });
    }

    const columns = [
      {
        name: 'Transaction ID',
        selector: 'transaction_id',
        sortable: true,
      },
      {
        name: 'Promotio ID',
        selector: 'promotio_id',
        sortable: true,
      },
      {
        name: 'Deal Status',
        selector: 'deal_status',
        sortable: true,
      },
      {
        name: 'Promotio Name',
        selector: 'promotio_name',
        sortable: true,
      },
      {
        name: 'Amount',
        selector: 'amount',
        sortable: true,
      },
      {
        name: 'User ID',
        selector: 'user_id',
        sortable: true,
      },
      {
        name: 'User ID',
        selector: 'user_id',
        sortable: true,
      },
      {
        name: 'Name',
        selector: 'name',
        sortable: true,
      },
      {
        name: 'Date Of Purchase',
        selector: 'date_of_purchase',
        sortable: true,
      },
      {
        name: 'Date Used',
        selector: 'date_used',
        sortable: true,
      },
      {
        name: 'Reference Code',
        selector: 'reference_code',
        sortable: true,
      },
      {
        name: 'Reference Code',
        selector: 'reference_code',
        sortable: true,
      },
      {
        name: 'User Admin',
        selector: 'user_admin',
        sortable: true,
      },
    ];

    const customStyles = {
      headCells: {
        style: {
          fontSize: '12px',
          fontWeight: 500,
          paddingLeft: '8px',
          paddingRight: '8px',
        },
      },
      headRow: {
        style: {
          minHeight: '40px',
        }
      },
      cells: {
        style: {
          fontSize: '15px',
        },
      },
      rows: {
        style: {
          fontSize: '13px',
          minHeight: '30px',
          '&:not(:last-of-type)': {
            borderBottomWidth: '0px',
          },
        }
      }
    };

    return (
        <div className="previewpromotions">
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
                                <CLabel className="details-label" id="promotion-name"> {dealItems.name} </CLabel>
                            </div>
                            <div className="title-input">
                                <CLabel htmlFor="description">Description</CLabel>
                                <CLabel className="details-label" id="description"> {dealItems.description} </CLabel>
                            </div>
                            <div className="title-input">
                                <CLabel htmlFor="original-price">Original Price</CLabel>
                                <CLabel className="details-label" id="original-price"> {dealItems.originPrice} </CLabel>
                            </div>
                            <div className="title-input">
                                <CLabel htmlFor="promotional-price">Promotional Price</CLabel>
                                <CLabel className="details-label" id="promotional-price"> {dealItems.promotionPrice} </CLabel>
                            </div>
                            <div className="title-input">
                                <CLabel className="promotional-image-label" htmlFor="promotional-image">Promotional Image</CLabel>
                                <CImg
                                  className="promotional-image"
                                  id = "promotional-image"
                                  src={dealItems.imageLink ? dealItems.imageLink : "./images/jpg/company_logo.png"}
                                  alt="promotional-image"
                                />
                            </div>
                            <div className="title-input">
                                <CLabel htmlFor="promotional-price">Participating Branches</CLabel>
                                <div>
                                {
                                  dealItems.branchs && dealItems.branchs.map((branch, index) => {
                                    return (
                                        <CLabel className="details-label mb-0" >{branch.address}</CLabel>
                                    )
                                  })
                                }
                                </div>
                            </div>
                            <div className="title-input">
                                <CLabel htmlFor="terms">Terms and Conditions</CLabel>
                                <CLabel className="details-label" id="terms"> {dealItems.terms} </CLabel>
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol md="6" sm="12">
                    <CCard>
                        <CCardBody>
                            <div className="title-input row">
                              <CCol sm="0" md="0" xl="1">
                              </CCol>
                              <CCol sm="12" md="12" xl="2">
                                <CLabel className="text-center" htmlFor="terms">Preview</CLabel>
                              </CCol>
                              <CCol sm="12" md="12" xl="8">
                              <div className="mobile-preview">
                                  <div className="mobile-content">
                                    <CImg
                                      className="preview-image"
                                      id = "preview-image"
                                      src={dealItems.imageLink ? dealItems.imageLink : "./images/jpg/company_logo.png"}
                                      alt="preview-image"
                                    />
                                  </div>
                                  <div className="mobile-content p-3">
                                    <CRow>
                                      <CCol className="mobile-content-section" md="7" sm="12">
                                        <CLabel id="mobile-preview-name" className="mobile-title">{dealItems.name}</CLabel>
                                        <CLabel id="mobile-preview-job" className="mobile-letter">{businessName}</CLabel>
                                      </CCol>
                                      <CCol className="mobile-content-section" md="5" sm="12">
                                        <CLabel id="mobile-preview-price" className="mobile-title text-right">{dealItems.promotionPrice}</CLabel>
                                        <CLabel id="mobile-preview-location" className="mobile-letter text-right">{leftTitle}</CLabel>
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
                                    <CLabel className="mobile-letter">{dealItems.description}</CLabel>
                                  </div>
                                  <div className="mobile-content p-3">
                                    <CRow>
                                      <CCol className="mobile-content-section" md="8" sm="12">
                                        <CLabel className="mobile-title category-title">Terms and Conditions</CLabel>
                                      </CCol>
                                      <CCol className="mobile-content-section" md="4" sm="12">
                                      </CCol>
                                    </CRow>
                                    <CLabel className="mobile-letter"> {dealItems.terms}</CLabel>
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
                                      dealItems.branchs && dealItems.branchs.map((branch, index) => {
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
                              </CCol>

                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <div className="filter-content">
              <CLabel className="header-filter-title">FILTER ROOM</CLabel>
              <CInput type="date" value = {dateInput} onChange={e => { onDateInputChange(e.target.value, 1) }} className="date-input" id="date-input1" name="date-input" placeholder="date" />
              <CLabel className="header-to-title">TO</CLabel>
              <CInput type="date" value = {dateInput1} onChange={e => { onDateInputChange(e.target.value, 2) }} className="date-input" id="date-input2" name="date-input" placeholder="date" />
              <CInputGroup className="search-bar">
                <CInputGroupPrepend>
                  <CInputGroupText>
                    <CIcon name="cil-user" />
                  </CInputGroupText>
                </CInputGroupPrepend>
                <CInput id="input1-group1"  value = {headerSearch} onChange={e => { onHeaderSearch(e.target.value) }} name="input1-group1" placeholder="Search" />
              </CInputGroup>
            </div>
            <DataTable
              noHeader
              columns={columns}
              data={transItems}
              customStyles = {customStyles}
            />
        </div>
    )
}

export default PreviewPromotions
