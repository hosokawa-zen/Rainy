import React, { useState, useEffect } from 'react'
import { useHistory , Link} from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CButton,
} from '@coreui/react'

import {database, auth} from '../../../../firebase'

import Loader from "react-loader-spinner";

const Reports = () => {
  const [reportItems, setReportItems] = useState([])
  const [isLoader, setIsLoader] = useState(false);

  const history = useHistory();

  const refreshReports = () => {
    setReportItems([])
    database.ref('reports/').get().then((snapshot) => {
      if (snapshot.exists) {
        database.ref('users/').get().then((snapshot2) => {
          if (snapshot2.exists) {
            const items = [];
            const reportArray = snapshot.val();
            const userArray = snapshot2.val();
            if (reportArray && userArray) {
              Object.keys(reportArray).map((key) => {
                const report = reportArray[key];
                const user = userArray[report.user_id]
                const reporter = userArray[report.reporter_id]
                if (user && reporter) {
                  const data = {
                    user_id : report.user_id,
                    user_name: user.name,
                    reporter_id: report.reporter_id,
                    reporter_name: reporter.name,
                    avatar: user.avatar
                  };
                  items.push(data)
                }
              })
              setReportItems(items)
            }
            setIsLoader(false)
          }
        })
        .catch(error => {
          alert(error)
          setIsLoader(false)
        })
      }
    }).catch(error => {
      alert(error)
    })
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
            refreshReports();
            if (userData.role != 1) {
              // history.replace("/login/")
            }
          }
        })
      }
    })
  }, [])

  return (
    <div className="reports">
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
        <div className="today-show-content">
          <div className="today-show"><div className="line"></div><div className="today">TODAY</div><div className="line"></div></div>
        </div>
        <table className="table table-hover table-outline mb-0 d-none d-sm-table">
          <tbody>
            {
              reportItems.map((data, index) => {
                return (
                  <tr key={index}>
                    <td className="avatar-content">
                    <img src={data.avatar ? data.avatar : "./images/jpg/company_logo.png"} className="c-avatar-img" alt="image" />
                    </td>
                    <td className="name-content">
                      <Link
                        // to={"/admin/users/" + data.user_id}
                        to={"#"}
                      >{data.user_name}</Link> reported the user profile
                      <Link
                      // to={"/admin/users/" + data.reporter_id}
                        to={"#"}
                      >{data.reporter_name}</Link>
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

export default Reports
