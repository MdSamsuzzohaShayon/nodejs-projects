const checkout = document.getElementById('checkout');

checkout.addEventListener('click', async (e) => {
    try {
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items: [
                    { id: 1, quantity: 3 },
                    { id: 2, quantity: 1 }
                ]
            })
        }
        // GET AN URL FROM BACKEND BY WHICH THE USER CAN ACCESS OUR PAGE 
        const response = await fetch('/create-checkout-session', options);
        // console.log(response);
        const text = await response.text();
        const jsonRes = JSON.parse(text);
        // console.log(jsonRes);
        // console.log(response.ok);
        // // console.log(response.url);
        if (response.ok) {
            window.location = jsonRes.url;
        } else {

        }
    } catch (error) {
        throw error;
    }
});