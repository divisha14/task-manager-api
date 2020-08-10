//CRUD create read update Delete
//GUI Globally unique Identifiers
const mongodb=require('mongodb')
const MongoClient=mongodb.MongoClient
const ObjectID=mongodb.ObjectID

const connectionURL ='mongodb://127.0.0.1:27017'
const databaseName= 'task-manager'

// const id=new ObjectID()
// console.log(id.id.length)
// console.log(id.getTimestamp())
// console.log(id.toHexString().length)
MongoClient.connect(connectionURL,{useNewUrlParser:true},(error,client)=>
{
    if(error)
    return console.log('Unable to connect to database')
    const db=client.db(databaseName)
    // db.collection('users').insertOne(
    //     {
    //         _id:id,
    //         name:'Yash',
    //         age:14
    //     },(error,result)=>
    //     {
    //         if(error)
    //         {
    //             return console.log('Unable to insert user!')
    //         }
    //         console.log(result.ops)
    //     }
    // )
    // db.collection('users').insertMany(
    //     [{
    //         name:'Avish',
    //         age:20
    //     },
    // {
    //     name:'Cyrus',
    //     age:19
        
    // }],(error,result)=>
    // {
    //     if(error)
    //         {
    //             return console.log('Unable to insert user!')
    //         }
    //              console.log(result.ops)  
    // })
    // db.collection('tasks').insertMany(
    //     [
    //         {
    //             description:'Clean the house',
    //             completed: true
    //         },
    //         {
    //             description:'Renew inspection',
    //             completed: false
    //         },
    //         {
    //             description:'Pot Plants',
    //             completed: true
    //         }
    //     ],(error,result)=>
    //     {
    //         if(error)
    //                  {
    //                  return console.log('Unable to insert tasks!')
    //                 }
    //             console.log(result.ops)  
    //     })
   // db.collection('users').findOne({name:'Avish'},(error,result)=>
//    db.collection('users').findOne({_id:new ObjectID("5efee3a734272b2190ec05e4")},(error,result)=>
//     {
//         if(error)
//        return console.log('Unable to fetch')
//        console.log(result)
//     })
// db.collection('users').find({age:19}).toArray((error,result) =>
// {
//     console.log(result)
// })
// db.collection('users').find({age:19}).count((error,result) =>
// {
//     console.log(result)
// })
// db.collection('tasks').findOne(
//     {
//         _id:new ObjectID("5efe52a01f79e0572c08ac91")
//     },(error,result) =>
//     {
//         if(error)
//        return console.log('Unable to fetch')
//     console.log(result)
//  })
// db.collection('tasks').find({completed:true}).toArray((error,result)=>
// console.log(result))
// const updatePromise=db.collection('users').updateOne({
//     _id:new ObjectID("5efe4adab0c3bb45f4acc988")
// },{
//     $set:
// {
//     name:'Mike'
// }
// $inc:
// {
//     age:1
// }
// })
// updatePromise.then((result) =>
// {
// console.log(result)}).catch((error) =>
// {
//     console.log(error)
// })
// db.collection('tasks').updateMany({
// completed:false
// },
// {
//     $set:
//     {
//         completed:true
//     }
// }).then((result)=>
// {
//     console.log(result)
// }).catch((error)=>
// {
//     console.log(error)
// })
// db.collection('users').deleteMany({
//     age:19
// }).then((result)=>
// {
//     console.log(result)
// }).catch((error)=>
// console.log(error))
db.collection('tasks').deleteOne({
    description:'Pot Plants'
}).then((result)=>
{
    console.log(result)
}).catch((error)=>
console.log(error))
})