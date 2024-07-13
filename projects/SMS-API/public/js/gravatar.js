const gravatar = async (emailAdress) => {
    const GRAVATAR_API = '331:gk-zv4IzacXxAvwLdoI3BQjuNN8atPmj2eCL5vPW-Qv4lWFmeyq6cnyLQArLOfay';
    const baseURL = 'https://api.gravatar.com/v3';
    const email = emailAdress;
    const hashedEmail = await hash(email);
    const profileURL = `/profiles/${hashedEmail}`;

    const config = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${GRAVATAR_API}`,
        },
    }

    await fetch(`${baseURL}${profileURL}`, config)
        .then(response => response.json())
        .then(data => {
            console.log('Response from backend:', data);

            gen(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });



    async function hash(string) {
        const utf8 = new TextEncoder().encode(string);
        const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray
            .map((bytes) => bytes.toString(16).padStart(2, '0'))
            .join('');
        return hashHex;
    }


    function gen (data) {
        const img = document.createElement('img');
        img.src = data.avatar_url;
        img.classList.add('profile-picture');
    
        const h2 = document.createElement('h2');
        h2.innerText = data.display_name;

        const p = document.createElement('p');
        p.innerText = data.location
    
        const a = document.createElement('a');
        a.href = data.profile_url;
        a.innerText = 'Profile URL';
    
        const wrapper = document.createElement('div');
        wrapper.classList.add('profile-wrapper');
        wrapper.append(img);
        wrapper.append(h2);
        // wrapper.append(p);
        wrapper.append(a);
    
        // document.body.append(wrapper);
        document.querySelector('.profile-container').append(wrapper);
    }
}





gravatar('mrez321@gmail.com');
// gravatar('hossainnaqhavi9@gmail.com');

// gravatar('s.hosseinnaqvi@gmail.com');
// gravatar('MDK.Mr.KaBaL@gmail.com');
