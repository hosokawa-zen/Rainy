const functions = require("firebase-functions");
const admin = require("firebase-admin")
admin.initializeApp();
const database = admin.database()

const http = require('http');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.pay = functions.https.onRequest(async (request, response) => {
  const amount = request.query.amount
  const fee = request.query.fee
  const accountID = request.query.accountID
  try {
    const paymentIntent = 
    await stripe.paymentIntents.create({
      payment_method_types: ['card'],
      amount: amount * 100,
      currency: 'usd',
      application_fee_amount: fee * 100,
      transfer_data: {
        destination: accountID,
      },
    });
    return response.send(JSON.stringify(paymentIntent));
  } catch (error) {
    return response.status(500).send(error.message);
  }
});

function generateAccountLink(accountID, origin) {
  return stripe.accountLinks.create({
    type: "account_onboarding",
    account: accountID,
    refresh_url: `${origin}&refresh=1`,
    return_url: `${origin}&success=1`,
  }).then((link) => link.url);
}

exports.onboard = functions.https.onRequest(async (request, response) => {
  try {
    const account = await stripe.accounts.create({type: "express"});
    const redirect = request.query.redirect
    const businessID = request.query.businessID
    var origin = redirect ? `${redirect}?businessParam=${businessID}` : `${request.headers.host}?businessParam=${businessID}`;
    const accountLinkURL = await generateAccountLink(account.id, origin);
    
    var updates = {}
    updates[`/business/` + businessID + `/accountID`] = account.id;
    updates[`/business/` + businessID + `/confirmBusiness`] = false;
    database.ref().update(updates);

    return response.send({url: accountLinkURL, accountID: account.id, businessID});
  } catch (error) {
    return response.status(500).send(error.message);
  }
})

exports.onboardRefresh = functions.https.onRequest(async (request, response) => {
  try {
    const accountID = request.query.accountID
    const redirect = request.query.redirect
    const businessID = request.query.businessID
    var origin = redirect ? `${redirect}?businessParam=${businessID}` : `${request.headers.host}?businessParam=${businessID}`;
    const accountLinkURL = await generateAccountLink(accountID, origin);

    var updates = {}
    updates[`/business/${businessID}/accountID`] = account.id;
    updates[`/business/${businessID}/confirmBusiness`] = false;
    database.ref().update(updates);

    return response.send({url: accountLinkURL});
  } catch (error) {
    return response.status(500).send(error.message);
  }
})