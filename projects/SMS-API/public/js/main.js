async function postReqToAPI(url, bodyObj) {
    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyObj),
    };

    try {
        const response = await fetch(url, config);
        const data = await response.json();
        console.log('Response from backend:', data);
        return data;
    } catch (error) {
        console.error('Request Error:', error);
    }
}

const loginForm = document.querySelector('#login-form');
const otpForm = document.querySelector('#otp-form');
const otpInputs = document.querySelectorAll('.otp-input');
let reqId;

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const tel = document.querySelector('#tel').value;

    postReqToAPI('/payamak', { tel: tel })
        .then(data => {
            console.log('d => ', data);
            reqId = data.reqId;
        })
        .catch(err => {
            console.log('error => ', err);
        });
});

otpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const otp = [];
    otpInputs.forEach((input, index) => {
        otp.push(input.value);
    });
    const otpCode = otp.join('');
    console.log(`Verifying OTP Code => ${otpCode}`);

    postReqToAPI('/verifyCode', { reqId: reqId, code: otpCode })
        .then(data => {
            console.log('vd => ', data);

            if (data.redirect) {
                window.location.href = data.redirect;
            } else {
                // handle other responses
                console.log('dont have redirect');
            }
        })
        .catch(err => {
            console.log('error => ', err);
        });


});


postReqToAPI('/userProfile', {})
    .then(response => {
        const div = document.createElement('div');
        div.style.textAlign = 'center';
        div.style.backgroundColor = '#D5FFD0';
        div.style.padding = '1rem'
        div.innerText = response.message;
        document.body.prepend(div);
    })
    .catch(err => console.log('uP err =>', err));

// =============================

document.addEventListener('DOMContentLoaded', () => {
    const otpInputs = document.querySelectorAll('.otp-input');

    if ('OTPCredential' in window) {
        window.addEventListener('DOMContentLoaded', async () => {
            try {
                const content = await navigator.credentials.get({
                    otp: { transport: ['sms'] }
                });

                if (content) {
                    const otpCode = content.code;
                    console.log('otpCode =>', otpCode);
                    fillOtpInputs(otpCode);
                }
            } catch (error) {
                console.error('Error receiving OTP:', error);
            }
        });
    } else {
        console.warn('WebOTP API is not supported in this browser.');
    }

    function fillOtpInputs(otpCode) {
        if (otpCode.length === 4) {
            otpInputs.forEach((input, index) => {
                input.value = otpCode[index];
            });
        } else {
            console.error('Invalid OTP code length:', otpCode.length);
        }
    }
});

// =============================

const customOTP = () => {
    const form = document.querySelector("#otp-form");
    const inputs = document.querySelectorAll('.otp-input');
    const button = document.querySelector(".submit-btn");

    window.addEventListener("load", () => inputs[0].focus());
    button.setAttribute("disabled", "disabled");

    inputs[0].addEventListener("paste", function (event) {
        event.preventDefault();

        const pastedValue = (event.clipboardData || window.clipboardData).getData("text");
        const otpLength = inputs.length;

        for (let i = 0; i < otpLength; i++) {
            if (i < pastedValue.length) {
                inputs[i].value = pastedValue[i];
                inputs[i].removeAttribute("disabled");
                inputs[i].focus;
            } else {
                inputs[i].value = ""; // Clear any remaining inputs
                inputs[i].focus;
            }
        }
    });

    inputs.forEach((input, index1) => {
        input.addEventListener('change', e => {
            if (input.value !== '') {
                input.removeAttribute("disabled");
            }
        })

        input.addEventListener("keyup", (e) => {
            const currentInput = input;
            const nextInput = input.nextElementSibling;
            const prevInput = input.previousElementSibling;

            if (currentInput.value.length > 1) {
                currentInput.value = "";
                return;
            }

            if (
                nextInput &&
                nextInput.hasAttribute("disabled") &&
                currentInput.value !== ""
            ) {
                nextInput.removeAttribute("disabled");
                nextInput.focus();
            }

            if (e.key === "Backspace") {
                inputs.forEach((input, index2) => {
                    if (index1 <= index2 && prevInput) {
                        input.setAttribute("disabled", true);
                        input.value = "";
                        prevInput.focus();
                    }
                });
            }

            button.classList.remove("active");
            button.setAttribute("disabled", "disabled");

            const inputsNo = inputs.length;
            if (!inputs[inputsNo - 1].disabled && inputs[inputsNo - 1].value !== "") {
                button.classList.add("active");
                button.removeAttribute("disabled");

                return;
            }
        });
    });



    // Simulate the OTP received from SMS
    function simulateOTPReceive() {
        const otp = '5942'; // Example OTP for simulation
        fillOTP(otp);
    }

    // Request OTP (Simulate API call)
    function requestOTP() {
        console.log('Requesting OTP... 2');
        setTimeout(simulateOTPReceive, 2000);
    }

    // Fill the OTP form with the received code
    function fillOTP(otp) {
        const otpArray = otp.split('');

        inputs.forEach((input, index) => {
            input.value = otpArray[index];
            input.disabled = false;
        });
        button.removeAttribute("disabled");


        let allFilled = true;
        inputs.forEach(input => {
            if (input.value.length !== 1) {
                allFilled = false;
            }
        });
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // alert('Submitted');
            console.log('submitted');
        })
        if (allFilled) {
            // form.submit();
            form.dispatchEvent(new Event("submit"));

        }

    }

    // Verify OTP
    function verifyOTP() {
        const otp = [];

        inputs.forEach((input, index) => {
            otp.push(input.value);
        });

        const otpCode = otp.join('');
        console.log(`Verifying OTP: ${otpCode}`);
        // Here you can add the verification logic (e.g., API call)
    }

    // Request OTP when the page loads

    // window.onload = requestOTP;


    // setTimeout(verifyOTP, 3000);

}

customOTP();




function otpCountdown(timeInSeconds) {
    const countdownElement = document.querySelector('#countdown');
    const intervalTime = 1000;
    let remainingTime = timeInSeconds;

    if (countdownElement) {
        const interval = setInterval(() => {
            remainingTime -= 1;
            countdownElement.innerText = `تا درخواست مجدد: ${remainingTime} ثانیه`

            if (remainingTime <= 0) {
                clearInterval(interval);
            }
        }, intervalTime);
    } else {
        console.error('countdownElement is undefined!')
    }
}


otpCountdown(120);





function googleAuth() {

    const a = document.createElement('a');
    a.href = '/auth/google';
    a.style.display = 'block';
    a.style.textAlign = 'center';

    const button = document.createElement('button');
    button.innerText = 'Login with Google';

    a.append(button);
    document.body.prepend(a);
}

googleAuth();