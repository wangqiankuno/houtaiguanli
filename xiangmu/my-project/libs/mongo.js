const {
  MongoClient,
  ObjectId
} = require('mongodb');
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'cute';
// Use connect method to connect to the server

let connect = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, (err, client) => {
      if (err) {
        reject(err)
      } else {
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        resolve({
          db,
          client
        })
      }
    });
  })
}
//插入 col表名 arr需要插入的数据
//插入，col为表名，arr为数组对象，是插入内容
let insert = (col, arr) => {
  return new Promise(async (resolve, reject) => {
    //首先要拿到连接导出对象才能进行操作,由于异步,需要先等待完成
    let {
      db,
      client
    } = await connect();
    //操作的表
    const collection = db.collection(col);
    collection.insertMany(arr, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
        client.close();
      }
    });
  })
}
// let insert = (col, arr) => {
//   return new Promise(async (resolve, reject) => {
//     let {
//       db,
//       client
//     } = await connect();
//     const collection = db.collection(col);
//     collection.insertMany(arr, (err, result) => {
//       if (err) {
//         reject(err)
//       } else {
//         resolve(result);
//         client.close();
//       }
//     })
//   })
// }
//查找 没有输入名字就直接获取全部，传入的为对象
let finds = (col, obj) => {
  return new Promise(async (resolve, reject) => {
    let {
      db,
      client
    } = await connect();
    const collection = db.collection(col);
    collection.find({
      ...obj
    }).toArray(function (err, docs) {
      if (err) {
        reject(err)
      } else {
        resolve(docs);
        client.close();
      }
    });
  })
}
//查找 没有输入名字就直接获取全部，传入的为对象
// let find = (col, obj) => {
//   return new Promise(async (resolve, reject) => {
//     let {
//       db,
//       client
//     } = await connect();
//     const collection = db.collection(col);
//     collection.find({
//       ...obj
//     }).toArray(function (err, docs) {
//       if (err) {
//         reject(err)
//       } 
//       else {
//         resolve(docs);
//         client.close();
//       }
//       // else{
//       //   resolve('meiyou')
//       // }
//     });
//   })
// }
//删除 
let del = (col, obj) => {
  return new Promise(async (resolve, reject) => {
    let {
      db,
      client
    } = await connect();
    const collection = db.collection(col);
    //删除的条件描述，哪里的name为大可爱
    //obj{name："大可爱"}
    collection.deleteOne({
      ...obj
    }, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
        client.close();
      }
    });
  })
}

//改  col为表名，第一个对象为更新条件，第二个对象为更新的值
let update = (col, obj1, obj2) => {
  return new Promise(async (resolve, reject) => {
    let {
      db,
      client
    } = await connect();
    const collection = db.collection(col);
    collection.updateOne({
      ...obj1
    }, {
        $set: {
          ...obj2
        }
      }, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
          client.close();
        }
      });
  })
}


module.exports = {
  connect,
  insert,
  finds,
  ObjectId,
  del,
  update
}

// node express mongodb jquery