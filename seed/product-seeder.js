const Product = require('../models/product');
const mongoose = require('mongoose');

//SEEDING MEANS ADD DATA TO DATABASE

mongoose.connect('mongodb://localhost/shopping'); //IF TESTAROO DB IS ALREADY EXIST THEN OK. OR IF IT ISN'T IT WILL CREATE AUTOMATICLY
mongoose.connection.once('open', function () {
    console.log("Connection has been made now let's make fireaowks");
}).on('error', function (error) {
    console.log('Connection', error);
});


const products = [
    {
        imagePath: 'https://images.pexels.com/photos/821651/pexels-photo-821651.jpeg',
        title: 'Camera',
        description: ' Goths or Gothic people, the ethnonym of a group of East Germanic tribes. Gothic language, an extinct East Germanic language, spoken by the Goths. Crimean Gothic, the Gothic language spoken by the Crimean Goths.',
        price: 15
    },
    {
        imagePath: 'https://images.pexels.com/photos/341523/pexels-photo-341523.jpeg',
        title: 'IPhone',
        description: 'Clash of Clans is a freemium mobile strategy video game developed and published by Finnish game developer Supercell. ',
        price: 30
    },
    {
        imagePath: 'https://images.pexels.com/photos/3819969/pexels-photo-3819969.jpeg',
        title: 'Coca Cola',
        description: 'Temple Run is a 2011 3D endless running video game developed and published by Imangi Studios. It is produced',
        price: 25
    },
    {
        imagePath: 'https://images.pexels.com/photos/7538060/pexels-photo-7538060.jpeg',
        title: 'Choclate',
        description: 'Doodle Army 2: Mini Militia is a free-to-play 2D shooter game released for iOS and Android devices. ',
        price: 18
    },
    {
        imagePath: 'https://images.pexels.com/photos/5946081/pexels-photo-5946081.jpeg',
        title: 'Water Milon',
        description: "PlayerUnknown's Battlegrounds is a 2017 online multiplayer battle royale game developed and published by PUBG Corporation, a subsidiary of South Korean video game company Bluehole.",
        price: 26
    },
    {
        imagePath: 'https://images.pexels.com/photos/7218638/pexels-photo-7218638.jpeg',
        title: 'Coffee',
        description: 'Subway Surfers is an endless runner mobile game co-developed by Kiloo and SYBO Games, private companies based in Denmark.',
        price: 14
    }
];



Product.remove().then(result => exit()).catch(err => console.log(err));


Product.insertMany(products).then(result => exit()).catch(err => console.log(err));

function exit() {
    mongoose.disconnect();
}