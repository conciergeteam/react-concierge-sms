import React, {useState} from 'react'
import PhoneInput from "react-phone-input-labelled";
import axios from 'axios'
import {
  PHONE_COUNTRIES,
  SMS_OPT_IN_URLS,
  PHONE_DEFAULT_PLACEHOLDER,
  SMS_OPT_IN_DEFAULT_CONFIG,
  PHONE_NUMBER_LENGTH
} from "../../CONSTANTS";

function ConciergeSmsOptIn({options, configuration}) {
  const [value, setValue] = useState('')
  const [isValid, setValid] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const CONFIG = Object.assign(SMS_OPT_IN_DEFAULT_CONFIG, {...configuration})
  let url = options.mode ? SMS_OPT_IN_URLS[options.mode] : SMS_OPT_IN_URLS['prod']

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

  const replaceTag = (text) => {
    return text.replace("{{org_name}}", CONFIG.orgName)
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
    <div className="concierge-form-container" style={CONFIG.formContainerStyle}>
      <form id="concierge-sms-opt-in-form">
        <p className="concierge-header" style={CONFIG.headerStyle}>{CONFIG.header}</p>
        <p className="concierge-subheader" style={CONFIG.subheaderStyle}>{CONFIG.subheader}</p>
        <PhoneInput
          label={null}
          value={value}
          disableDropdown={true}
          disableCountryCode={true}
          defaultCountry='us'
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
        <p style={CONFIG.smsLegalNoticeStyle}>{replaceTag(CONFIG.smsLegalNotice)}</p>
      </form>
    </div>
  )
}

export default ConciergeSmsOptIn
