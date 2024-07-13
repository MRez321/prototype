function transitionDuration(timeInSeconds) {
    const element = document.querySelector('.otp-cooldown-bar');
    let width = 0;
    const fps = 60;
    const totalFrames = timeInSeconds * fps;
    const stepSize = 100 / totalFrames;
    const intervalTime = 1000 / fps;

    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
        } else {
            width += stepSize;
            element.style.width = width + '%';
        }
    }, intervalTime);
}

//  CSS

// .otp-cooldown {
//     position: relative;
//     overflow: hidden;
//     border: solid 1px black;
//     border-radius: .3rem;
//     width: 100%;
//     height: .75rem;
// }
// .otp-cooldown-bar {
//     /* position: absolute; */
//     /* left: 0; */
//     /* top: 0; */
//     /* transition: 1s width; */
//     height: 100%;
//     width: 0%;

//     background: crimson;
// }



function transitionDuration2(timeInSeconds) {
    const element = document.querySelector('.otp-cooldown-bar');
    const countdownElement = document.getElementById('countdown');
    let width = 0;
    const fps = 60;
    const totalFrames = timeInSeconds * fps;
    const stepSize = 100 / totalFrames;
    const intervalTime = 1000 / fps;

    let remainingTime = timeInSeconds;

    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            countdownElement.textContent = '0 ثانیه';
        } else {
            width += stepSize;
            element.style.width = width + '%';

            // Update countdown every second
            if (Math.floor((width / 100) * timeInSeconds) !== remainingTime) {
                remainingTime = Math.floor((width / 100) * timeInSeconds);
                countdownElement.textContent = `${timeInSeconds - remainingTime} ثانیه`;
            }
        }
    }, intervalTime);
}

// Start the transition with a countdown of 20 seconds

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