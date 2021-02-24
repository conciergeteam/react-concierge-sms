//GENERAL
const SMS_OPT_IN_URLS = {
  dev: "http://localhost:3000/sms_opt_in",
  test: "https://staging.conciergeteam.co/sms_opt_in",
  prod: "https://conciergeteam.co/sms_opt_in",
}

const BIS_URLS = {
  dev: "http://localhost:3000/sms_backinstock",
  test: "https://staging.conciergeteam.co/sms_backinstock",
  prod: "https://conciergeteam.co/sms_backinstock",
}

const DEFAULT_ORG_NAME = "{{WARNING: add your org name via config.orgName}}"

//PHONE INPUT
const PHONE_COUNTRIES = ['us']
const PHONE_NUMBER_LENGTH = 10
const PHONE_DEFAULT_PLACEHOLDER = "Enter Phone Number"

const SMS_OPT_IN_DEFAULT_CONFIG = {
  orgName: DEFAULT_ORG_NAME,
  header: "Don't miss your chance",
  subheader: "Get updated via SMS about new products, events and more!",
  phonePlaceholder: 'Phone number',
  buttonText: 'Subscribe',
  successText: 'Thank you. We have sent you a message to confirm your subscription.',
  formContainerStyle: {textAlign: 'center', fontFamily: 'Helvetica'},
  buttonStyle: {padding: '10px', width: '60%'},
  buttonDisabledStyle: {opacity: 0.7, padding: '10px', width: '60%', cursor: 'not-allowed'},
  headerStyle: {fontSize: "2rem"},
  subheaderStyle: {fontSize: "1.2rem"},
  phoneInputStyle: {padding: '10px', width: '60%'},
  smsLegalNoticeStyle: {fontSize: "0.8rem"},
  smsLegalNotice: `By providing your phone number, you agree to receive recurring automated marketing text messages from {{org_name}}. Frequency varies by account. Consent is not a condition of purchase. Carrier message and data rates may apply.`,
  onSuccess: () => {},
  onError: (error) => {console.error(error)},
}

const BIS_FORM_DEFAULT_CONFIG = {
  orgName: DEFAULT_ORG_NAME,
  header: "Don't miss your chance",
  successText: "Thank you. We'll send you a message when this item is back in stock.",
  subheader: "These items are extremely limited and tend to go fast.",
  phonePlaceholder: 'Enter your phone number',
  buttonText: 'Get text notification',
  formContainerStyle: {textAlign: 'center', fontFamily: 'Helvetica'},
  buttonStyle: {padding: '10px', width: '60%'},
  buttonDisabledStyle: {opacity: 0.7, padding: '10px', width: '60%', cursor: 'not-allowed'},
  headerStyle: {fontSize: "2rem"},
  subheaderStyle: {fontSize: "1.2rem"},
  phoneInputStyle: {padding: '10px', width: '60%'},
  showSmsMarketingInvitation: true,
  smsMarketingInvitationLabel: 'Also add me to the {{org_name}} SMS List',
  smsLegalNoticeStyle: {fontSize: "0.8rem"},
  smsLegalNotice: `By providing your phone number, you agree to receive recurring automated marketing text messages from {{org_name}}. Frequency varies by account. Consent is not a condition of purchase. Carrier message and data rates may apply.`,
  onSuccess: () => {},
  onError: (error) => {console.error(error)},
}

export {
  BIS_URLS,
  SMS_OPT_IN_URLS,
  PHONE_COUNTRIES,
  PHONE_NUMBER_LENGTH,
  BIS_FORM_DEFAULT_CONFIG,
  SMS_OPT_IN_DEFAULT_CONFIG,
  PHONE_DEFAULT_PLACEHOLDER
}
