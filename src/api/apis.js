import axios from "axios"
axios.defaults.baseURL="http://127.0.0.1:5000/"

//登录接口
export  const api_login = (account,password) => axios.post("/users/checkLogin",{account,password})
//添加账号
export  const api_accAdd = (account,password,userGroup) => axios.post("/users/add",{account,password,userGroup})
//获取账号列表
export const  api_usersList = (currentPage,pageSize) => axios.get("/users/list",{params:{currentPage,pageSize}})
//删除
export const  api_usersdel = (id) => axios.get("/users/del",{params:{id}})
//批量删除
export const  api_usersbatchde = (ids) => axios.get("/users/batchdel",{params:{ids}})
//账户修改
export  const api_edit = (id,account,userGroup) => axios.post("/users/edit",{id,account,userGroup})
//检查旧密码是否正确密码
export  const api_checkoldpwd = (id,oldPwd) => axios.get("/users/checkoldpwd",{params:{id,oldPwd}})
//修改旧密码
export  const api_editpwd = (newPwd,id) => axios.post("/users/editpwd",{newPwd,id})

// 验证token是否过期/users/checktoken
export  const api_checktoken = (token) => axios.get("/users/checktoken",{params:{token}})
export  const api_accountinfo = (id) => axios.get("/users/accountinfo",{params:{id}})
export  const api_catelist = (currentPage,pageSize) => axios.get("/goods/catelist",{params:{currentPage,pageSize}})

// 添加分类/goods/addcate
export  const api_addcate = (cateName,state) => axios.post("/goods/addcate",{cateName,state})
export  const api_delcate = (id) => axios.get("/goods/delcate",{params:{id}})
//修改分类
export  const api_editcate = (id,cateName,state) => axios.post("/goods/editcate",{id,cateName,state})
//查询分类/goods/categories
export  const api_categories = () => axios.get("/goods/categories",{params:{}})
//商品图片上传接口/goods/goods_img_upload
export  const api_img_upload = () => axios.post("/goods/goods_img_upload",{})
//添加商品/goods/add
export  const api_goods_add = (name,category,price,imgUrl,goodsDesc) => axios.post("/goods/add",{name,category,price,imgUrl,goodsDesc})
//获取商品列表/goods/list
export  const api_goods_list = (currentPage,pageSize) => axios.get("/goods/list",{params:{currentPage,pageSize}})
//删除商品/goods/de
export  const api_goods_del=  (id) => axios.get("/goods/del",{params:{id}},)
//修改商品/goods/edit
export  const api_goods_edit=  (name,category,price,imgUrl,goodsDesc,id) => axios.post("/goods/edit",{name,category,price,imgUrl,goodsDesc,id},)
//获取订单/order/list
export  const api_order_list=  (currentPage,pageSize) => axios.get("/order/list",{params:{currentPage,pageSize}})
//获取订单/order/search
export  const api_order_search  =  (currentPage,pageSize,orderNo,consignee,phone,orderState,date) => axios.get("/order/search",{params:{currentPage,pageSize,orderNo,consignee,phone,orderState,date}})
//获取订单详情/order/detail
export  const api_order_detail  =  (id) => axios.get("/order/detail",{params:{id}})
//修改订单详情/order/edit
export  const api_order_edit  =  (id,orderNo,orderTime,phone,consignee,deliverAddress,deliveryTime,remarks,orderAmount,orderState,) => axios.post("/order/edit",{id,orderNo,orderTime,phone,consignee,deliverAddress,deliveryTime,remarks,orderAmount,orderState})
//获取店铺详情shop/info
export  const api_shop_info  =  () => axios.get("/shop/info",{params:{}})
//获取店铺详情/shop/edit
export  const api_shop_edit  =  ({id,name,bulletin,avatar,deliveryPrice,deliveryTime,description,score,sellCount,},supports,date,pics) => axios.post("/shop/edit",{id,name,bulletin,avatar,deliveryPrice,deliveryTime,description,score,sellCount,supports,date,pics})
//首页表单接口/order/totaldata
export  const api_shop_totaldata=  () => axios.get("/order/totaldata",{params:{}})
//订单接口
export  const api_shop_ordertotal=  (date) => axios.get("/order/ordertotal",{params:{date}})
