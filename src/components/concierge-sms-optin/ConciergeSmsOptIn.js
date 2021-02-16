import React, {useState} from 'react'
import PhoneInput from "react-phone-input-labelled";
import axios from 'axios'

function ConciergeSmsOptIn({options, configuration}) {
  const [value, setValue] = useState('')
  const [isValid, setValid] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const PHONE_COUNTRIES = ['us']
  const PHONE_NUMBER_LENGTH = 11
  const DEFAULT_PLACEHOLDER = "Enter Phone Number"
  const ENVS = {
    dev: "http://localhost:3000/sms_opt_in",
    test: "https://staging.conciergeteam.co/sms_opt_in",
    prod: "https://conciergeteam.co/sms_opt_in",
  }

  const defaultConfig = {
    header: "Don't miss your chance",
    subheader: null,
    phonePlaceholder: 'Phone number',
    buttonText: 'Subscribe',
    successText: 'Thank you !',
    smsInsiders: true,
    formContainerStyle: {textAlign: 'center', fontFamily: 'Helvetica'},
    buttonStyle: {padding: '10px', width: '60%'},
    buttonDisabledStyle: {opacity: 0.7, padding: '10px', width: '60%', cursor: 'not-allowed'},
    headerStyle: {fontSize: "2rem"},
    subheaderStyle: {fontSize: "1.2rem"},
    phoneInputStyle: {padding: '10px', width: '60%'},
    smsLegalNoticeStyle: {fontSize: "0.8rem"},
    smsLegalNotice: `By providing your phone number, you agree to receive recurring automated marketing text messages from ${configuration.orgName}. Frequency varies by account. Consent is not a condition of purchase. Carrier message and data rates may apply.`
  }
  const CONFIG = Object.assign(defaultConfig, {...configuration})
  let url = options.mode ? ENVS[options.mode] : ENVS['prod']
  const submitForm = (element) => {
    if (!isValid) {
      return false
    }
    element.preventDefault()
    options.phone_number = value;
    axios.post(url, options).then(() => {
      setSubmitted(true)
      onSuccess()
    }).catch((error) => {
        console.error(error)
        onError()
      }
    )
  }

  const onSuccess = () => {
    configuration.onSuccess && configuration.onSuccess()
  }

  const onError = () => {
    configuration.onError && configuration.onError()
  }

  const onPhoneChange = (phoneNumberValue) => {
    setValid(isPhoneValid(phoneNumberValue))
    setValue(phoneNumberValue)
  }

  const isPhoneValid = (phoneNumber) => {
    let matchNumbers = phoneNumber.match(/\d/g);
    return matchNumbers && matchNumbers.length === PHONE_NUMBER_LENGTH
  }

  const submitButton = () => {
    return submitted ?
      <p>{CONFIG.successText}</p> :
      <button className="concierge-button"
              style={isValid ? CONFIG.buttonStyle : CONFIG.buttonDisabledStyle}
              onClick={submitForm}
              disabled={!isValid}>{CONFIG.buttonText}</button>
  }

  return (
    <>
      <div className="concierge-form-container" style={CONFIG.formContainerStyle}>
        <form id="concierge-sms-opt-in-form">
          <p className="concierge-header" style={CONFIG.headerStyle}>{CONFIG.header}</p>
          <p className="concierge-subheader" style={CONFIG.subheaderStyle}>{CONFIG.subheader}</p>
          <PhoneInput
            label={null}
            value={value}
            disableDropdown={true}
            disableSearchIcon={true}
            enableSearchField={false}
            inputExtraProps={{
              name: "phone",
              required: true,
              style: CONFIG.phoneInputStyle,
            }}
            onChange={onPhoneChange}
            placeholder={DEFAULT_PLACEHOLDER}
            searchPlaceholder={DEFAULT_PLACEHOLDER}
            onlyCountries={PHONE_COUNTRIES}
          />
          {submitButton()}
          <p style={CONFIG.smsLegalNoticeStyle}>{CONFIG.smsLegalNotice}</p>
        </form>
      </div>
    </>
  )
}

export default ConciergeSmsOptIn
