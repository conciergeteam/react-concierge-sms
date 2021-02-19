import React, {useState} from 'react'
import axios from 'axios'
import PhoneInput from "react-phone-input-labelled";
import {
  PHONE_COUNTRIES,
  BIS_FORM_DEFAULT_CONFIG,
  PHONE_DEFAULT_PLACEHOLDER,
  PHONE_NUMBER_LENGTH,
  BIS_URLS
} from "../../CONSTANTS";

function ConciergeBackinStockForm({options, configuration}) {
  const [value, setValue] = useState('')
  const [isValid, setIsValid] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [acceptMarketing, setAcceptMarketing] = useState(false)
  const CONFIG = Object.assign(BIS_FORM_DEFAULT_CONFIG, {...configuration})
  let url = options.mode ? BIS_URLS[options.mode] : BIS_URLS['prod']

  const submitForm = (e) => {
    if (!isValid) {
      return false
    }
    e.preventDefault()
    options.phone_number = value;
    options.accepts_sms_marketing = acceptMarketing
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
    setIsValid(isPhoneValid(phoneNumberValue))
    setValue(phoneNumberValue)
  }

  const isPhoneValid = (phoneNumber) => {
    let matchNumbers = phoneNumber.match(/\d/g);
    return matchNumbers && matchNumbers.length === PHONE_NUMBER_LENGTH
  }

  const onAcceptMarketingChange = () => {
    setAcceptMarketing((v) => !v)
  }

  const replaceTag = (text) => {
    return text.replace("{{org_name}}", CONFIG.orgName)
  }

  const smsInsiders = () => {
    return (
      <div>
        <input type="checkbox" value={acceptMarketing} name="accept_sms_marketing" onClick={onAcceptMarketingChange}/>
        <label style={CONFIG.smsInsidersLabelStyle}>{replaceTag(CONFIG.smsInsidersLabel)}</label>
        <p className="concierge-sms-insiders-text" style={CONFIG.smsInsidersStyle}> {replaceTag(CONFIG.smsInsidersText)} </p>
        <p style={CONFIG.smsLegalNoticeStyle}>{CONFIG.smsLegalNotice}</p>
      </div>
    )
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
    <div className="concierge-form-container" style={CONFIG.formContainerStyle}>
      <form id="concierge-bis-form">
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
          placeholder={PHONE_DEFAULT_PLACEHOLDER}
          searchPlaceholder={PHONE_DEFAULT_PLACEHOLDER}
          onlyCountries={PHONE_COUNTRIES}
        />
        {submitButton()}
        {CONFIG.smsInsiders && smsInsiders()}
      </form>
    </div>
  )
}

export default ConciergeBackinStockForm
