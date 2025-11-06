import User from '../models/User.js'; //import database
import CRUDService from '../services/CRUDService.js'; //import service

//hàm getHomePage
let getHomePage = async (req, res) => {
  //return res.send('Trần Phan Tiến Anh');
  try {
    let data = await User.find({}); //lấy dữ liệu từ models/index
    console.log('................................');
    console.log(data);
    console.log('................................');
    return res.render('homepage.ejs', {
      data: JSON.stringify(data), //trả dữ liệu về view
    });
  } catch (e) {
    console.log(e);
  }
};

//hàm getAbout
let getAboutPage = (req, res) => {
  return res.render('test/about.ejs');
};

//hàm CRUD
let getCRUD = (req, res) => {
  return res.render('crud.ejs');
};

//hàm findAll CRUD
let getFindAllCrud = async (req, res) => {
  let data = await CRUDService.getAllUser();
  // console.log('---------------------------');
  // console.log(data);
  // console.log('---------------------------');
  //return res.send('FindAll crud to server');
  return res.render('users/findAllUser.ejs', {
    datalist: data,
  }); //gọi view và truyền dữ liệu ra view
};

//hàm post CRUD
let postCRUD = async (req, res) => {
  //dùng async để xử lý bất động bộ
  let message = await CRUDService.createNewUser(req.body); //gọi service
  //console.log(req.body); //lấy thông tin body của http request
  console.log(message);
  return res.send('Post crud to server');
};

//hàm lấy dữ liệu để edit
let getEditCRUD = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    //check Id
    let userData = await CRUDService.getUserInfoById(userId);

    // console.log('-------------------');
    // console.log(userData);
    // console.log('-------------------');
    return res.render('users/updateUser.ejs', {
      data: userData,
    });
  } else {
    return res.send('không lấy được id');
  }

  // console.log(req.query.id);
};

let putCRUD = async (req, res) => {
  let data = req.body;
  let data1 = await CRUDService.updateUser(data); //update rồi hiển thị danh sách user
  //let data1 = await CRUDService.getAllUser();//hiển thị danh sách user
  return res.render('users/findAllUser.ejs', {
    datalist: data1,
  });
  // return res.send('update thành công');
};

let deleteCRUD = async (req, res) => {
  let id = req.query.id; //ví trên view ?id=1
  if (id) {
    await CRUDService.deleteUserById(id);
    return res.json({ success: true, message: 'Xóa người dùng thành công!' });
  } else {
    return res.json({ success: false, message: 'Không tìm thấy người dùng' });
  }
};

// object: {
//     key: '',
//     value: ''
// }
//export ra object
module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  getFindAllCrud: getFindAllCrud,
  getEditCRUD: getEditCRUD,
  putCRUD: putCRUD,
  deleteCRUD: deleteCRUD,
};
