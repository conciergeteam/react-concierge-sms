import './App.css';
import ConciergeSmsOptIn from './components/concierge-sms-optin/ConciergeSmsOptIn'

const API_KEY = process.env.REACT_APP_API_KEY

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div style={{width: '500px'}}>
        <h1>Concierge JS </h1>
        <ConciergeSmsOptIn
          options={{pk: API_KEY, mode: 'dev'}}
          configuration={{
            orgName: 'Concierge',
            header: 'Text with Us',
            subheader: 'Get updated via SMS about new products, events and more!'
          }}
        />
      </div>
    </header>
</div>
);
}

export default App;
