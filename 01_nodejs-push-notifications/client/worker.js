console.log('Service worker loaded');

self.addEventListener('push', e =>{
    const data = e.data.json();
    console.log('Push receved');
    self.registration.showNotification(data.title, {
        body: 'Notification by Md Shayon',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Logo-Free.jpg'
    });
})