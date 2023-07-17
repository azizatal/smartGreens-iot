const mongoose=require('mongoose')

const plantSchema=mongoose.Schema(
    {
        humidity:Number,
        pressure:Number,
        temperature:Number,
        moisture:Number,
        light:Number,
        dateTime:String
})

const Plant_env=mongoose.model('plant_env',plantSchema)

module.exports=Plant_env;