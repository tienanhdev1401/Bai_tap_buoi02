import bcrypt from 'bcryptjs'; //import thu viện bcryptjs
import User from '../models/User.js'; //import database

const salt = bcrypt.genSaltSync(10); //thuật toán hash password

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    //dùng Promise đảm bảo luôn trả kết quả, trong xử lý bất động bộ
    try {
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender === '1' ? true : false,
        roleId: data.roleId,
      });
      resolve('OK create a new user successfully');
    } catch (e) {
      reject(e);
    }
  });
};

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    //dùng Promise đảm bảo luôn trả kết quả, trong xử lý bất động bộ
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

//lấy tất cả findAll CRUD
let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    //dùng Promise đảm bảo luôn trả kết quả, trong xử lý bất động bộ
    try {
      let users = await User.find({});
      resolve(users); //hàm trả về kết quả
    } catch (e) {
      reject(e);
    }
  });
};

//lấy findOne CRUD
let getUserInfoById = (userId) => {
  return new Promise(async (resolve, reject) => {
    //dùng Promise đảm bảo luôn trả kết quả, trong xử lý bất động bộ
    try {
      let user = await User.findById(userId);
      if (user) {
        resolve(user); //hàm trả về kết quả
      } else {
        resolve([]); //hàm trả về kết quả rỗng
      }
    } catch (e) {
      reject(e);
    }
  });
};

//hàm put CRUD
let updateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    //dùng Promise đảm bảo luôn trả kết quả, trong xử lý bất động bộ
    try {
      let user = await User.findByIdAndUpdate(
        data.id,
        {
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
        },
        { new: true }
      );
      if (user) {
        //lấy danh sách user
        let allUsers = await User.find({});
        resolve(allUsers);
      } else {
        resolve(); //hàm trả về kết quả rỗng
      }
    } catch (e) {
      reject(e);
    }
  });
};

//hàm xóa user
let deleteUserById = (userId) => {
  return new Promise(async (resolve, reject) => {
    //dùng Promise đảm bảo luôn trả kết quả, trong xử lý bất động bộ
    try {
      await User.findByIdAndDelete(userId);
      resolve(); //là return
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  //xuất hàm ra bên ngoài
  createNewUser: createNewUser,
  getAllUser: getAllUser,
  getUserInfoById: getUserInfoById,
  updateUser: updateUser,
  deleteUserById: deleteUserById,
};
