import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CButton,
} from '@coreui/react'

import {database, auth} from '../../../firebase'

import Loader from "react-loader-spinner";

var userBusinessId = ""


const DealsPromotions = () => {
  const [dealItems, setDealItems] = useState([])
  const [isLoader, setIsLoader] = useState(false);
  const [isPermission, setIsPermission] = useState(true);

  const history = useHistory();

  const refreshDeals = () => {
    database.ref('promotions/').get().then((snapshot) => {
      if (snapshot.exists) {
        var dealsData = [];
        const newArray = snapshot.val();
        if (newArray) {
          Object.keys(newArray).map((key, index) => {
            const value = newArray[key];
            if (userBusinessId == value.userBusinessId) {
              dealsData.push({
                id: index,
                avatar: value.imageLink ?? 'avatars/1.jpg',
                key,
                name: value.name,
              })
            }
          })
          setDealItems(dealsData);
        }
        setIsLoader(false);
      }
    }).catch((error) => {
      setIsLoader(false);
    });
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user){
        setIsLoader(true);
        database.ref('users/' + user.uid).get().then((snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            if (userData.role != 2) {
              //history.replace("/login/")
            }
            setIsPermission(userData.permitDeals)
            userBusinessId = userData.business_id;
            if (userData.permitDeals) {
              refreshDeals();
            } else {
              setIsLoader(false)
            }
          }
        })
      }
    })
  }, [])



  var viewPromotions = (key) => {
    history.push('/deals/preview/' + key)
  }

  var removeDeals = (key) => {
    database.ref('promotions/' + key).remove();
    refreshDeals();
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
      {
        !isPermission && <div>
          No Permission
        </div>
      }
      {
        isPermission && <CCard>
          <CCardBody>
          <table className="table table-hover table-outline mb-0 d-none d-sm-table">
            <tbody>
              {
                dealItems.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td className="avatar-content">
                      <img src={data.avatar ? data.avatar : "./images/jpg/company_logo.png"} className="c-avatar-img" alt="image" />
                      </td>
                      <td className="name-content">
                        <div className="name-field">{data.name}</div>
                      </td>
                      <td className="view-btn-content">
                        <CButton onClick= {() => viewPromotions(data.key)} className = "view-btn">View</CButton>
                      </td>
                      <td className="remove-btn-content">
                        <CButton onClick= {() => removeDeals(data.key)} className = "remove-btn">Remove</CButton>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          </CCardBody>
        </CCard>
      }
    </div>
  )
}

export default DealsPromotions
