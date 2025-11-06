import User from '../models/User.js';

/**
 * Hàm khởi tạo dữ liệu user mẫu cho MongoDB
 * Thay vì migration như SQL, MongoDB dùng seed để tạo dữ liệu ban đầu
 * Chạy: node src/migrations/migration_create_user.js
 */

const seedUsers = async () => {
  try {
    // Kiểm tra nếu đã có user thì bỏ qua
    const existingUsers = await User.countDocuments();
    if (existingUsers > 0) {
      console.log(' Users already exist in database');
      process.exit(0);
    }

    // Tạo dữ liệu mẫu
    const sampleUsers = [
      {
        email: 'user1@gmail.com',
        password: 'password123',
        firstName: 'Nguyễn',
        lastName: 'Văn T',
        address: '123 Nguyễn Huệ, TP HCM',
        phoneNumber: '0123456789',
        gender: true,
        image: 'user1.jpg',
        roleId: 'admin',
        positionId: 'manager',
        name: 'Nguyễn Hữu Trung',
        age: 25,
      },
      {
        email: 'user2@gmail.com',
        password: 'password456',
        firstName: 'Trần',
        lastName: 'Phân Tiến Anh',
        address: '456 Lê Lợi, TP HCM',
        phoneNumber: '0987654321',
        gender: true,
        image: 'user2.jpg',
        roleId: 'user',
        positionId: 'developer',
        name: 'Trần Phân Tiến Anh',
        age: 23,
      },
      {
        email: 'user3@gmail.com',
        password: 'password789',
        firstName: 'Hoàng',
        lastName: 'Văn A',
        address: '789 Đông Khởi, TP HCM',
        phoneNumber: '0912345678',
        gender: false,
        image: 'user3.jpg',
        roleId: 'user',
        positionId: 'designer',
        name: 'Hoàng Văn A',
        age: 24,
      },
    ];

    // Thêm dữ liệu vào MongoDB
    const result = await User.insertMany(sampleUsers);
    console.log(' Migration completed! Created ' + result.length + ' users');
    process.exit(0);
  } catch (error) {
    console.error(' Migration error:', error.message);
    process.exit(1);
  }
};

// Chạy seed function
seedUsers();
