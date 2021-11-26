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
    new Product({
        imagePath: 'https://images-na.ssl-images-amazon.com/images/I/41IrhiLorOL.jpg',
        title: 'Gothic',
        description: ' Goths or Gothic people, the ethnonym of a group of East Germanic tribes. Gothic language, an extinct East Germanic language, spoken by the Goths. Crimean Gothic, the Gothic language spoken by the Crimean Goths.',
        price: 15
    }),
    new Product({
        imagePath: 'http://www.androidguys.com/wp-content/uploads/2015/07/clash-of-clans.png',
        title: 'Clash Of Clans',
        description: 'Clash of Clans is a freemium mobile strategy video game developed and published by Finnish game developer Supercell. ',
        price: 30
    }),
    new Product({
        imagePath: 'https://i.ytimg.com/vi/u1NnIs88xjc/maxresdefault.jpg',
        title: 'Temple Run',
        description: 'Temple Run is a 2011 3D endless running video game developed and published by Imangi Studios. It is produced',
        price: 25
    }),
    new Product({
        imagePath: 'https://4.bp.blogspot.com/-g_LaJdJkC-w/VyTwKDxjvuI/AAAAAAAAAAs/m694rM_xrjYdltjTDBqXl89OVjzAtlfEACLcB/w1200-h630-p-k-no-nu/mini%2Bmilitia%2Bgame%2Bdoodle%2Barmy%2B2.png',
        title: 'Mini Militia',
        description: 'Doodle Army 2: Mini Militia is a free-to-play 2D shooter game released for iOS and Android devices. ',
        price: 18
    }),
    new Product({
        imagePath: 'https://ksassets.timeincuk.net/wp/uploads/sites/54/2018/02/Pubg-920x518.jpg',
        title: 'PlayerUnknown Battlegrounds',
        description: "PlayerUnknown's Battlegrounds is a 2017 online multiplayer battle royale game developed and published by PUBG Corporation, a subsidiary of South Korean video game company Bluehole.",
        price: 26
    }),
    new Product({
        imagePath: 'https://images.sftcdn.net/images/t_app-cover-l,f_auto/p/c4eaf094-96d3-11e6-9f6e-00163ec9f5fa/1958104643/subway-surfers-Capture.jpg',
        title: 'Subway Surfers',
        description: 'Subway Surfers is an endless runner mobile game co-developed by Kiloo and SYBO Games, private companies based in Denmark.',
        price: 14
    })
];

let done = 0;
for (let i = 0; i < products.length; i++) {
    products[i].save((err, result) => {
        done++;
        if (done == products.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}