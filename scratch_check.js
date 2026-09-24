const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://mehradiya513_db_user:0GgpHylOTUP7xB1F@cluster0.hm8phbq.mongodb.net";

async function check() {
  await mongoose.connect(MONGODB_URI);
  const db = mongoose.connection.db;
  const orders = await db.collection('orders').find({}).toArray();
  console.log("Orders count:", orders.length);
  if (orders.length > 0) {
    console.log(orders[0]);
  }
  process.exit(0);
}
check().catch(console.error);
