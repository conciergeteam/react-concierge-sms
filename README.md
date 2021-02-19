# react-concierge-sms

React ready components for the great concierge SMS tools.

## Installation

The easiest way to use our React tools is to install it via NPM.

`npm install react-concierge-sms`

### Provided React components

The packaged components are:

- `conciergeSmsOptIn`
- `conciergeBackinStockForm`

Usage:

```react
import React, { useRef } from 'react';
import {ConciergeBackinStockForm, ConciergeSmsOptIn} from 'react-concierge-sms'
... 

<ConciergeBackinStockForm
        options={{
          pk: PK,
          mode: 'dev',
          product_no: "999999",
          variant_no: "899988",
          link: 'https://yourstore.com/the-product',
          product_title: 'The Product',
          platform: 'klaviyo',
          shopify_domain: 'succulentcity.myshopify.com',
          variant_title: 'Blue'
        }}
        configuration={{
          orgName: 'Great Company',
          smsInsiders: true,
          formContainerStyle: {textAlign: 'center'},
        }}
      />

<ConciergeSmsOptIn
options={{ pk: PK, mode: 'dev'}}
configuration={{ orgName: 'Great Company' }}
/>

```

### Documentation

**Find the full documentation at**

https://concierge-js-bundle.web.app/

