const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

dotenv.config();
MONGO_URL='mongodb://subhamkvgms112:Ya2taQuiUIRH1hVa@ac-i3obiud-shard-00-00.znqtsac.mongodb.net:27017,ac-i3obiud-shard-00-01.znqtsac.mongodb.net:27017,ac-i3obiud-shard-00-02.znqtsac.mongodb.net:27017/?replicaSet=atlas-14hq4v-shard-0&ssl=true&authSource=admin'
const connectedDb = async () => {
    try {
        await mongoose.connect(MONGO_URL);

        console.log("MongoDB connected".bgGreen.white);
    } catch (error) {
        console.log("DB ERROR".bgRed.white, error);
    }
};

module.exports = { connectedDb };
