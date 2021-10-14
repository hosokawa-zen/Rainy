import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CButton,
} from '@coreui/react'

import {database, auth} from '../../../../firebase'
import EventEmitter from 'reactjs-eventemitter'

import Loader from "react-loader-spinner";

var refreshCount = 0;
var innerCount = 0;
var staticBusinessItems

const BusinessAccounts = () => {
  const [businessItem, setBusinessItem] = useState([])
  const [searchKey, setSearchKey] = useState("")
  const [isLoader, setIsLoader] = useState(false);

  const history = useHistory();

  const refreshBusiness = () => {
    database.ref('business/').get().then((snapshot) => {
      if (snapshot.exists()) {
        database.ref('users/').get().then((snapshot2) => {
          if (snapshot2.exists()) {
            var items = [];
            const business = snapshot.val();
            const users = snapshot2.val();
            Object.keys(business).map(key => {
              const buss = business[key];
              const user_id = buss.userId;
              if(users[user_id]){
                const user_name = users[user_id].name
                const avatar = buss.image
                const active = buss.active
                const item = {
                  business_id: key,
                  user_id,
                  user_name,
                  avatar,
                  active
                }
                items.push(item)
              }
            })
            setBusinessItem(items)
            staticBusinessItems = [...items]
            setIsLoader(false)
          }
        }).catch((error) => {
          console.log('err', error);
          setIsLoader(false)
        });
      } else {
        setIsLoader(false)
      }
    }).catch((error) => {
      setIsLoader(false)
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
            refreshBusiness();
            if (userData.role != 1) {
              history.replace("/login")
            }
          }
        })
      }
    })
    EventEmitter.subscribe('add-bussiness-user', () => {
      history.push('/admin/business/add')
    })

    EventEmitter.subscribe('admin-header-search', (key) => {
      const items = [];
      staticBusinessItems.forEach(item => {
        if (item.user_name.toLowerCase().includes(key.toLowerCase())) {
          items.push(item)
        }
      })
      setBusinessItem(items)
      if (key = "") {
        const iitems = [...staticBusinessItems]
        setBusinessItem(iitems)
      }
    })
  }, [])




  var viewBusiness = (key) => {
    history.push('/admin/business/preview/' + key)
  }

  var deactiveBusiness = (key, index) => {
    var updates = {};
    updates[`business/${key}/active`] = !businessItem[index].active;
    database.ref().update(updates);
    refreshBusiness();
  }

  return (
    <div className="deals">
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
              businessItem.map((data, index) => {
                return (
                  <tr key={index}>
                    <td className="avatar-content">
                    <img src={data.avatar ? data.avatar : "./images/jpg/company_logo.png"} className="c-avatar-img" alt="image" />
                    </td>
                    <td className="name-content">
                      <div className="name-field">{data.user_name}</div>
                    </td>
                    <td className="view-btn-content">
                      <CButton onClick= {() => viewBusiness(data.user_id)} className = "view-btn">View</CButton>
                    </td>
                    <td className="remove-btn-content">
                      <CButton onClick= {() => deactiveBusiness(data.business_id, index)} className = "deactive-btn">{data.active ? 'Deactive' : 'Active'}</CButton>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default BusinessAccounts
