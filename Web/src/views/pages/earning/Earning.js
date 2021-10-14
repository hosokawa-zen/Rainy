
import React, { lazy, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { useLocation, useHistory } from 'react-router-dom'
import {auth, database} from '../../../firebase';
import EventEmitter from 'reactjs-eventemitter'
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CLabel,
} from '@coreui/react'
import { FIREBASE_CLOUD_FUNCTION_URL } from '../../../global'

import Loader from "react-loader-spinner";

var staticTransactions = [];
var businessID = "";
var stripeUrl = "";

const Earning = () => {
  var currentUser = null;
  const [info, setInfo] = useState(false)
  const [bankShow, setBankShow] = useState(false)
  const [selected, setSelected] = useState([])
  const [refKey, setRefKey] = useState(false)
  const [transItems, setTransItems] = useState([])
  const [isLoader, setIsLoader] = useState(false);
  const [isConnectStripe, setIsConnectStripe] = useState("");
  const [totalEarned, setTotalEarned] = useState(0);
  const [isPermission, setIsPermission] = useState(true);
  const history = useHistory();
  const params = new URLSearchParams(useLocation().search);

  // http://localhost:3000/#/earnings?businessParam=1hnfGLJJcw4CMR3JTFkQ1620614435&success=1


  // {
  //   transaction_id: "",
  //   promotio_id: "",
  //   deal_status: 0,
  //   promotio_name: "",
  //   amount: "",
  //   user_id: "",
  //   name: "",
  //   date_of_purchase: "",
  //   date_used: "",
  //   reference_code: "",
  //   user_admin:""
  // }

  const refreshTransaction = () => {
    database.ref('transactions/').get().then((snapshot) => {
      if (snapshot.exists) {
        const transData = snapshot.val();
        if (transData == null) {
          setTransItems([])
          setIsLoader(false);
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
                      var total = 0
                      Object.keys(transData).map(key => {
                        var item = transData[key];
                        if (item.deal_status == 0) {
                          item.deal_status = "Available";
                        } else if (item.deal_status == 1) {
                          item.deal_status = "Active";
                        } else if (item.deal_status == 2) {
                          item.deal_status = "Claimed";
                        }
                        total += item.payBusinessPrice
                        item.transaction_key = key;
                        if (promoData[item.promotio_id]) {
                          item.promotio_name = promoData[item.promotio_id].name
                        }
                        if (userData[item.user_id]) {
                          item.name = userData[item.user_id].name
                          item.user_admin = userData[item.user_id].admin
                        }
                        items.push(item)
                      })
                      staticTransactions = [...items]
                      setTransItems(items)
                      setTotalEarned(total)
                      setIsLoader(false);
                    }
                  }
                })
              }
            }
          })
        }
      }
    });
  }

  function toTimestamp(strDate){
    var datum = Date.parse(strDate);
    return datum/1000;
  }

  function getSuccessParam() {

    const businessParam = params.get("businessParam");
    const success = params.get("success");
    if (success && success == 1) {
      var updates = {};
      updates[`business/${businessParam}/confirmBusiness`] = true;
      database.ref().update(updates);
    }
  }

  useEffect(() => {
    if(!localStorage.getItem('user')){
      history.replace("/login");
    }

    auth.onAuthStateChanged((user) => {
      if (user){
        setIsLoader(true);
        currentUser = user;
        database.ref('users/' + user.uid).get().then((snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            businessID = userData.business_id;
            setIsPermission(userData.permitEarn)
            if (userData.permitEarn) {
              refreshTransaction();
            } else {
              setIsLoader(false);
            }
            getSuccessParam();
            if (userData.role != 2) {
              //history.replace("/login/")
            }
          }
        })
      }
    })

    EventEmitter.subscribe('header-date-search', (json) => {
      const value = JSON.parse(json)
      const key = value.key;
      const dateInput = value.dateInput;
      const dateInput1 = value.dateInput1;
      var items = [];
      staticTransactions.forEach(transaction => {
        if (transaction.name.toLowerCase().includes(key.toLowerCase())) {
         if (toTimestamp(transaction.date_of_purchase) >= (toTimestamp(dateInput) - 3600 * 24 - 1) && toTimestamp(transaction.date_of_purchase) <= (toTimestamp(dateInput1) + 3600 * 24 - 1)) {
          items.push(transaction)
         }
        }
      })
      setTransItems(items)
    })

    EventEmitter.subscribe('add-bank-account', (json) => {
      setBankShow(true)
    })
  }, [])

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
      name: 'Deal Price',
      selector: 'totalPrice',
      sortable: true,
    },
    {
      name: 'Fee Price',
      selector: 'feePrice',
      sortable: true,
    },
    {
      name: 'Total Price',
      selector: 'allPrice',
      sortable: true,
    },
    {
      name: 'Business Paid',
      selector: 'payBusinessPrice',
      sortable: true,
    },
    {
      name: 'Admin Paid',
      selector: 'payAdminPrice',
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
      name: 'User Admin',
      selector: 'user_admin',
      sortable: true,
    },
  ];
  const columns2 = [
    {
      name: 'Promotion ID',
      selector: 'promotio_id',
      sortable: true,
    },
    {
      name: 'Promotion Name',
      selector: 'promotio_name',
      sortable: true,
    },
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
    },
    {
      name: 'Deal Status',
      selector: 'deal_status',
      sortable: true,
    }
  ];

  const getRandomString = (length) => {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }

  const confrimTransaction = () => {
    selected.forEach((item) => {
      if (item.transaction_key) {
        var updates = {}
        updates['transactions/'+ item.transaction_key + "/deal_status"] = 2;
        database.ref().update(updates);
      }
    })
    refreshTransaction();
    setInfo(false)
  }

  const handleChange = (state) => {
    var tselected = [];
    tselected = state.selectedRows;
    if (tselected[0]) {
      const reference_code = tselected[0].reference_code;
      setRefKey(reference_code);
    }
    setSelected(state.selectedRows);
    // You can use setState or dispatch with something like Redux so we can use the retrieved data
    console.log('Selected Rows: ', state.selectedRows);
  };

  const openClaim = () => {
    // const random = getRandomString(9)
    setRefKey('');
    setInfo(true)
    setIsConnectStripe(false)
  }

  const confirmStipe = () => {
    if (isConnectStripe) {
      setBankShow(false)
      setIsConnectStripe(false)
      window.open(stripeUrl, "_blank")
    } else {
      setIsLoader(true)
      const apiUrl = `${FIREBASE_CLOUD_FUNCTION_URL}onboard?businessID=${businessID}&redirect=${window.location.origin}/#/earnings`;
      fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.url) {
          stripeUrl = data.url;
          setIsConnectStripe(true)
          setIsLoader(false)
        }
      });
    }
  }

  const cancelAddCard = () => {
    setBankShow(false)
  }

  const customStyles = {
    headCells: {
      style: {
        fontSize: '12px',
        fontWeight: 700,
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
        fontSize: '12px',
      },
    },
    rows: {
      style: {
        fontSize: '8px',
        minHeight: '25px',
        '&:not(:last-of-type)': {
          borderBottomWidth: '0px',
        },
      }
    }
  };

  return (
    <div className="earning">

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

      {
        !isPermission && <div>
          No Permission
        </div>
      }

      {
        isPermission && <div>
          <div className="total-earnings">
            <div className="total-earnings-title">TOTAL EARNINGS: </div>
            <div className="total-earnings-price">{`$${totalEarned}`}</div>
          </div>
          <DataTable
            noHeader
            columns={columns}
            data={transItems}
            customStyles = {customStyles}
          />
        </div>
      }

      <CModal
        show={bankShow}
        onClose={() => setInfo(!bankShow)}
        color="info"
        centered
      >
        <CModalBody>
          {
            !isPermission && <div>
              No Permission
            </div>
          }
          {
            isPermission && <div>
              <CButton color="secondary" onClick={() => confirmStipe()}>{isConnectStripe ? "Confirm" : "Connect New Stripe"}</CButton>
            </div>
          }
        </CModalBody>
      </CModal>
    </div>
  )
}

export default Earning
