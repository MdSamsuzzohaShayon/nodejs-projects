const submit = document.getElementById('submit');
const email = document.getElementById('email');
const error = document.getElementById('error');
const success = document.getElementById('success');
const signup = document.getElementById('signup');







submit.addEventListener('click', (event) => {
    event.preventDefault();
    if (email.value == null || email.value == "") {
        console.log("Email: ", email.value);
        console.log("no email value");
        error.style.display = "block";
    } else {
        // has email 
        console.log("Email has value: ", email.value);
        let fetchData = {
            method: "POST",
            body: JSON.stringify({ email: email.value, js: true }),
            headers: { "Content-Type": "application/json" }
        }
        console.log(fetchData);
        fetch("/subscribe", fetchData)
            .then(res => {
                if (res.ok) {
                    console.log("subscribe to mailchimp is working");
                } else {
                    error.style.display = "block";
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
});


