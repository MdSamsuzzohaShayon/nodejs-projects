 # Stripe - 
 
 - [tutorial](https://www.youtube.com/watch?v=1r-F3FIONl8), [Important](https://www.youtube.com/watch?v=YTc0Zi70AjM&t=18451s)
 
 - There are multiple ways to intregrate stripe
 - Method 1: All client code and server code at the same url 
 MAKE REQUEST TO SERVER -> ASK SERVER TO REPOND WITH A URL TO CHECKOUT -> IT'S GOING TO USE ALL THAT INFORMATION TO GIVE A UNIQUE URL TO REDIRECT USER FOR THEM
 - Method 2: Client and server is seperate from one another 
 - Go to stripe developer dashboard __https://dashboard.stripe.com/login?redirect=https://stripe.com/docs/development__
 - For real payment turn off test mode from __https://dashboard.stripe.com/test/developers__
 - Either use payment intent or session payment
 - Wehther we could use stripe hosted checkout page for payment integration or we can build our own user interface for that
### Stripe checkout process
 1. Customer select item that they want to purchase and click on checkout button
 2. Initiates a request to the backend to create checkout session
 3. On the backend, a checkout session is created via Stripe
 4. The Stripe API responds with a session object
 5. The session ID property is sent to the front end app
 
### Nodejs stripe
 1. API keys can be set globally or per request
 2. Request in from endoced data but get response as json

### Stripe CLI
 - We can get builer plate code by stripe cli
 - [Install stripe cli](https://stripe.com/docs/stripe-cli) -> [List all samples](https://stripe.com/docs/cli/samples/list) -> [copy samples locally](https://stripe.com/docs/cli/samples/list)
 - 


Check code sandbox, github and tutorial by stripe developer
https://github.com/orgs/stripe-samples/repositories
