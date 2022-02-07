
// NO PROBLEM IF ANYONE SEE PUBLIC KEY
const publicVapidKey = 'BCiKcp5g2womLcvmkihsoXcw9QhEW3P31HrxcbePogD8yv_Z0_UNReOcWiUbDilf93oh8KGcbJGQELRSkkVOQkY';


// CHECK OF SERVICE WORKER
if('serviceWorker' in navigator){
    // navigator is tne api of browser itself
    send().catch(err => console.error(err));
}


//THREE THINGS WE NEED TO DO  REGISTER SERVICE WORKER, REGISTER PUSH, SEND PUSH
async function send(){
    //REGISTER SERVICE WORKER
    console.log('Registering service workers ...');
    const register = await navigator.serviceWorker.register('/worker.js', {
        scope: '/'
    });
    console.log('Register service worker');



    //REGISTER PUSH
    console.log("Registering push...");
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });
    console.log('Push registration done');


    // send push notifications
    console.log("sending push...");
    await fetch('/subscribe', {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    });

    //push sent...
    


}




function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }