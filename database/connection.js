const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI || "mongodb://test:test1234@cluster0-shard-00-00.2aidv.mongodb.net:27017,cluster0-shard-00-01.2aidv.mongodb.net:27017,cluster0-shard-00-02.2aidv.mongodb.net:27017/devops3_4?ssl=true&replicaSet=atlas-f9tung-shard-0&authSource=admin&appName=Cluster0")
    .then(() => console.log('MongoDB connected'))
    .catch(error => console.log(error))