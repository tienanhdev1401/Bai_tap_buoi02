const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Schema định nghĩa inline
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: String,
  firstName: String,
  lastName: String,
  address: String,
  phoneNumber: String,
  gender: Boolean,
  image: String,
  roleId: String,
  positionId: String,
  name: String,
  age: Number,
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

// Dữ liệu mẫu
const sampleUsers = [
  {
    email: 'user1@gmail.com',
    password: bcrypt.hashSync('password123', 10),
    firstName: 'Nguyễn',
    lastName: 'Hữu Trung',
    address: '123 Nguyễn Huệ, TP HCM',
    phoneNumber: '0123456789',
    gender: true,
    image: 'user1.jpg',
    roleId: '1',
    positionId: 'manager',
    name: 'Nguyễn Hữu Trung',
    age: 25,
  },
  {
    email: 'user2@gmail.com',
    password: bcrypt.hashSync('password456', 10),
    firstName: 'Trần',
    lastName: 'Phân Tiến Anh',
    address: '456 Lê Lợi, TP HCM',
    phoneNumber: '0987654321',
    gender: false,
    image: 'user2.jpg',
    roleId: '2',
    positionId: 'developer',
    name: 'Trần Phân Tiến Anh',
    age: 23,
  },
  {
    email: 'user3@gmail.com',
    password: bcrypt.hashSync('password789', 10),
    firstName: 'Hoàng',
    lastName: 'Văn A',
    address: '789 Đông Khởi, TP HCM',
    phoneNumber: '0912345678',
    gender: true,
    image: 'user3.jpg',
    roleId: '3',
    positionId: 'designer',
    name: 'Hoàng Văn A',
    age: 24,
  },
];

// Hàm seed dữ liệu
async function seedDatabase() {
  try {
    // Kết nối MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp', {});
    console.log('✅ Kết nối MongoDB thành công');

    // Xóa tất cả users cũ
    await User.deleteMany({});
    console.log('🗑️  Đã xóa dữ liệu cũ');

    // Thêm dữ liệu mới
    const result = await User.insertMany(sampleUsers);
    console.log(`✅ Tạo ${result.length} users mẫu thành công!`);

    // Hiển thị dữ liệu vừa tạo
    const users = await User.find({});
    console.log('\n📋 Danh sách users:');
    console.table(users);

    process.exit(0);
  } catch (error) {
    console.error('❌ Lỗi:', error.message);
    process.exit(1);
  }
}

// Chạy seed
seedDatabase();
