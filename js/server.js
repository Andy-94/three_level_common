let express = require('express');
let db = require('../db');
const citiesModel = require('../model/citiesModel');
let citiesMode = require('../model/citiesModel');

let app = express();

db(()=>{
    app.get('/get_all_province',function(require,response){
        citiesMode.find({level:1},{province:1,name:1,_id:0},function(err,data){
            response.setHeader('Access-Control-Allow-Origin','*')
            if(!err && data){
                response.send({status:1,data})
            }else{
                response.send({status:0,err})
            }
        })
    })

    app.get('/get_cities_by_province',function(require,response){
        response.setHeader('Access-Control-Allow-Origin','*')
        const {province} =require.query
        citiesModel.find({level:2,province},{city:1,name:1,_id:0},function(err,data){
            if(!err && data){
                response.send({status:1,data})
            }else{
                response.send({status:0,err})
            }
        })
    })

    app.get('/get_counties_by_province_and_city',function(require,response){
        response.setHeader('Access-Control-Allow-Origin','*')
        const {province,city} = require.query;
        citiesModel.find({level:3,province,city},{county:1,name:1,_id:0},function(err,data){
            if(!err && data){
                response.send({status:1,data})
            }else{
                response.send({status:0,err})
            }
        })   
    })
    app.listen(3000,function(err){
        if(!err) console.log('the dataset is success');
        else console.log(err)
    })
},(err)=>{
    console.log(err)
})
