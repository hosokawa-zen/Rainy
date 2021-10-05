import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CButton,
  CImg
} from '@coreui/react'
import {database, auth} from '../../../../firebase'
import { useHistory, useParams } from 'react-router-dom'

const PreviewBusinessAccounts = () => {
  const history = useHistory();

  const [previewItem, setPreviewItem] = useState({
    user_name: "",
    user_id: "",
    image: "",
  })

  const { id } = useParams();

  const refreshPreivew = () => {
    database.ref('business/' + id).get().then((snapshot) => {
      if (snapshot.exists) {
        var previewData = [];
        const value = snapshot.val();
        if (value) {
          previewData = {
            image: value.image ?? 'avatars/1.jpg',
            user_id: value.userId,
            user_name: value.name,
            locked: value.locked,
          }
          setPreviewItem(previewData);
        }
      }
    }).catch((error) => {
    });
  }

  const lockAccount = () => {
    var updates = {}
    updates[`business/${id}/locked`] = previewItem.locked;
    database.ref().update(updates);
    refreshPreivew();
  }

  useEffect(() => {
    refreshPreivew();
    auth.onAuthStateChanged((user) => {
      if (!user) {
        // history.replace("/login/")
      } else {
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

  return (
    <div className="preview-business">
      <CCard>
        <CCardBody>
          <div className="user-section mb-3">
            <div className="avatar-content">
            <img src={previewItem.image ? previewItem.image : "./images/jpg/company_logo.png"} className="c-avatar-img" alt="image" />
            </div>
            <div className="name-content">
              <div className="name-field">{previewItem.user_name}</div>
            </div>
            <div className="view-btn-content">
              <CButton onClick={() => lockAccount()}  className = "view-btn">LOCK BUSINESS ACCOUNT</CButton>
            </div>
          </div>
          <div className="image-content">
            <CImg
              src={previewItem.image ? previewItem.image : "./images/jpg/company_logo.png"}
            />
          </div>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default PreviewBusinessAccounts
