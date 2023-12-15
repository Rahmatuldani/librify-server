import mongoose from 'mongoose';
require('dotenv').config();

let url = 'mongodb+srv://rahmatul:rahmatul@online-project.ukbeily.mongodb.net/librify'

mongoose.connect(url);

const database = mongoose.connection;

database.on(
  'error',
  console.error.bind(console, '❌ mongodb connection error')
);
database.once('open', async () => {
  const collection = database.collection('users');

  const defaultDataExist = await collection.findOne({ email: 'admin@gmail.com' });
  if (!defaultDataExist) {
    await collection.insertMany([
        {
          name: 'Administrator',
          role: 'admin',
          email: 'admin@gmail.com',
          password: 'apB0ZF415Z+/IVEeElWKs91oOGAXQrAnPrzPjq5h9P7KI1OqX7TnzXsEj2Df1eEQkGz3V3p99a4mboFDpBIrnA==',
          avatar: null,
          ktp: '',
          verified: true,
          adminVerified: true,
          verificationToken: '',
          createdAt: '2023-12-02T03:43:38.363Z',
          updatedAt: '2023-12-02T03:44:15.150Z'
        },
        {
          name: 'Testing',
          role: 'user',
          email: 'testing@gmail.com',
          password: 'apB0ZF415Z+/IVEeElWKs91oOGAXQrAnPrzPjq5h9P7KI1OqX7TnzXsEj2Df1eEQkGz3V3p99a4mboFDpBIrnA==',
          avatar: null,
          ktp: '',
          verified: true,
          adminVerified: true,
          verificationToken: '',
          createdAt: '2023-12-02T03:43:38.363Z',
          updatedAt: '2023-12-02T03:44:15.150Z'
        }
      ]
    )
  }
  console.log('✅ mongodb connected successfully')
});

mongoose.Promise = Promise;
