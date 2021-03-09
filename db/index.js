let mongoose =  require('mongoose');
mongoose.set('useCreateIndex',true);

const DB_Name = 'demo';
const PORT = 27017;
const IP = 'localhost';

function connectMongo(success,failed) {
    mongoose.connect(`mongodb://${IP}:${PORT}/${DB_Name}`,{
        useNewUrlParser: true,
        useUnifiedTopology:true
    })

    mongoose.connection.on('open',function(err){
        if(err){
            console.log('database is fails',err)
            failed('connect failed')
        }else{
            console.log('database is success')
            success()
        }
    })
}
module.exports = connectMongo