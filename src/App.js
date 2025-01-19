// import logo from './logo.svg';
// import './App.css';
// import mobileathentic from ""

// function App() {
//   return (
//     <div className="App">
//      Mobile Athentic
//     </div>
//   );
// }

// export default App;


// import React, { useState } from 'react';
// import { Form, Input, Button, message, Row, Col, Typography } from 'antd';
// import { initializeApp } from 'firebase/app'; // Fix: Correct import
// import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider } from 'firebase/auth';

// const { Title } = Typography;

// // Initialize Firebase (replace with your Firebase config)
// const firebaseConfig = {
//   apiKey: "AIzaSyCe4rmZMZ3VGV16XOCTo8yHceZBQhxRxXA",
//   authDomain: "mobile-athentic.firebaseapp.com",
//   projectId: "mobile-athentic",
//   storageBucket: "mobile-athentic.firebasestorage.app",
//   messagingSenderId: "182305826227",
//   appId: "1:182305826227:web:3b435da135b1be51f517c6"
// };

// const app = initializeApp(firebaseConfig); // Fix: Correct usage
// const auth = getAuth(app);

// const MobileAuth = () => {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [otp, setOtp] = useState('');
//   const [isOtpSent, setIsOtpSent] = useState(false);
//   const [verificationId, setVerificationId] = useState(null);

//   const handleSendOtp = async () => {

//     console.log('handleSendOtp called'); // Log function entry
//     console.log(`Phone number: ${phoneNumber}`);
//     if (!phoneNumber) {
//       message.error('Please enter a valid phone number.');
//       return;
//     }

//     try {
//       if (!window.recaptchaVerifier) {
//         window.recaptchaVerifier = new RecaptchaVerifier(
//           'recaptcha-container',
//           {
//             size: 'invisible',
//             callback: () => {
//               console.log('Recaptcha verified');
//             },
//           },
//           auth
//         );
//       }

//       const appVerifier = window.recaptchaVerifier;
//       const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
//       setVerificationId(confirmationResult.verificationId);
//       setIsOtpSent(true);
//       console.log('OTP sent successfully:', confirmationResult);
//       message.success('OTP sent successfully!');
//     } catch (error) {
//       message.error(error.message);
//       console.error('Error in handleSendOtp:', error);
//     }
//   };

//   const handleVerifyOtp = async () => {
//     if (!otp || !verificationId) {
//       message.error('Please enter the OTP.');
//       console.warn('OTP is missing!');
//       return;
//     }

//     const credential = PhoneAuthProvider.credential(verificationId, otp);

//     try {
//       await auth.signInWithCredential(credential);
//       message.success('Phone number verified successfully!');
//     } catch (error) {
//       message.error(error.message);
//     }
//   };

//   return (
//     <Row justify="center" style={{ marginTop: '50px' }}>
//       <Col span={8}>
//         <Title level={3} style={{ textAlign: 'center' }}>Mobile Authentication</Title>
//         <Form layout="vertical">
//           <Form.Item label="Phone Number">
//             <Input
//               placeholder="Enter your phone number"
//               value={phoneNumber}
//               onChange={(e) => setPhoneNumber(e.target.value)}
//               disabled={isOtpSent}
//             />
//           </Form.Item>

//           {isOtpSent && (
//             <Form.Item label="OTP">
//               <Input
//                 placeholder="Enter the OTP"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//               />
//             </Form.Item>
//           )}

//           <div id="recaptcha-container"></div>

//           {!isOtpSent ? (
//             <Button type="primary" onClick={handleSendOtp} block>
//               Send OTP
//             </Button>
//           ) : (
//             <Button type="primary" onClick={handleVerifyOtp} block>
//               Verify OTP
//             </Button>
//           )}
//         </Form>
//       </Col>
//     </Row>
//   );
// };

// export default MobileAuth;

import React, { useState } from 'react';
import { Form, Input, Button, message, Row, Col, Typography } from 'antd';
import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider } from 'firebase/auth';

const { Title } = Typography;

const firebaseConfig = {
  apiKey: "AIzaSyCe4rmZMZ3VGV16XOCTo8yHceZBQhxRxXA",
  authDomain: "mobile-athentic.firebaseapp.com",
  projectId: "mobile-athentic",
  storageBucket: "mobile-athentic.firebasestorage.app",
  messagingSenderId: "182305826227",
  appId: "1:182305826227:web:3b435da135b1be51f517c6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const MobileAuth = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [verificationId, setVerificationId] = useState(null);

  const handleSendOtp = async () => {
    console.log('handleSendOtp called');
    console.log(`Phone number: ${phoneNumber}`);

    if (!phoneNumber) {
      message.error('Please enter a valid phone number.');
      return;
    }
    
    try {
      if (!window.recaptchaVerifier ) {
        console.log('Recreating recaptcha verifier');
    
        // Removing appVerificationDisabledForTesting if it was previously included
        window.recaptchaVerifier = new RecaptchaVerifier(
          'recaptcha-container',
          {
            size: 'invisible',
            callback: () => {
              console.log('Recaptcha verified');
            },
            'expired-callback': () => {
              console.log('Recaptcha expired');
            },
          },
          auth // Ensure you pass the auth object if required
        );
      }
    
      // Ensure recaptchaVerifier is properly initialized before accessing appVerificationDisabledForTesting
      // if (window.recaptchaVerifier) {
      //   window.recaptchaVerifier.appVerificationDisabledForTesting = false;
      // }
      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setVerificationId(confirmationResult.verificationId);
      setIsOtpSent(true);
      message.success('OTP sent successfully!');
    
      // Your existing code to handle OTP sending
    } catch (error) {
      console.error('Error in handleSendOtp:', error);
      message.error('Failed to send OTP. Please try again.');
    }
  };

  const handleVerifyOtp = async () => {
    console.log('handleVerifyOtp called');

    if (!otp || !verificationId) {
      console.log('OTP or verificationId is missing');
      message.error('Please enter the OTP.');
      console.warn('OTP is missing or verificationId is missing!');
      return;
    }

    const credential = PhoneAuthProvider.credential(verificationId, otp);
    console.log('Verifying OTP...');
    try {
      await auth.signInWithCredential(credential);
      console.log('Phone number verified successfully!');
      message.success('Phone number verified successfully!');
    } catch (error) {
      console.error('Error in handleVerifyOtp:', error);
      message.error(error.message);
    }
  };

  return (
    <Row justify="center" style={{ marginTop: '50px' }}>
      <Col span={8}>
        <Title level={3} style={{ textAlign: 'center' }}>Mobile Authentication</Title>
        <Form layout="vertical">
          <Form.Item label="Phone Number">
            <Input
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => {
                console.log(`Phone number input changed: ${e.target.value}`);
                setPhoneNumber(e.target.value);
              }}
              disabled={isOtpSent}
            />
          </Form.Item>

          {isOtpSent && (
            <Form.Item label="OTP">
              <Input
                placeholder="Enter the OTP"
                value={otp}
                onChange={(e) => {
                  console.log(`OTP input changed: ${e.target.value}`);
                  setOtp(e.target.value);
                }}
              />
            </Form.Item>
          )}

          <div id="recaptcha-container"></div>

          {!isOtpSent ? (
            <Button type="primary" onClick={handleSendOtp} block>
              Send OTP
            </Button>
          ) : (
            <Button type="primary" onClick={handleVerifyOtp} block>
              Verify OTP
            </Button>
          )}
        </Form>
      </Col>
    </Row>
  );
};

export default MobileAuth;
