// https://www.youtube.com/watch?v=HJGWu0cZUe8
const Sequelize = require('sequelize');
const { DataTypes, Op } = Sequelize;


const sequelize = new Sequelize('test', 'shayon', 'shayon', {
    dialect: 'mysql'
});


const Country = sequelize.define('Country', {
    countryName: {
        type: DataTypes.STRING,
        unique: true
    }
}, {
    timestamps: false
});


const Capital = sequelize.define('Capital', {
    capitalName: {
        type: DataTypes.STRING,
        unique: true
    }
}, {
    timestamps: false
});


Country.hasOne(Capital, { foreignKey: "FKCountryId" });
let country, capital;


sequelize.sync({ alter: true }).then(() => {

    // CREATE RECORD 
    /*
    Country.bulkCreate([
        { countryName: "England" },
        { countryName: "USA" },
        { countryName: "Norway" },
        { countryName: "Germany" },
    ]);

    Capital.bulkCreate([
        { capitalName: "London" },
        { capitalName: "Washington DC" },
        { capitalName: "Oslo" },
        { capitalName: "Berlin" },
    ]);
    */


    return Capital.findOne({ where: { capitalName: "London" } });
})
    .then(data => {
        capital = data;
        return Country.findOne({ where: { countryName: "England" } });
    })
    .then(data => {
        country = data;
        country.setCapital(capital);
    })
    .catch(err => {
        console.log(err);
    })