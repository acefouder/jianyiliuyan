
const cloud = require('wx-server-sdk')
const {
  WXMINIUser,
  WXMINIQR
} = require('wx-js-utils');

cloud.init()

const appId = 'wx3df7843052d84021'; // 小程序 appId
const secret = 'bf0b5e56a3272e870fa3761dc97013cc'; // 小程序 secret


exports.main = async (event, context) => {

  // 获取小程序码，A接口
  let wXMINIUser = new WXMINIUser({
    appId,
    secret
  });

  // 一般需要先获取 access_token
  let access_token = await wXMINIUser.getAccessToken();
  let wXMINIQR = new WXMINIQR();

  let qrResult = await wXMINIQR.getMiniQRLimit({
    access_token,
    path:event.path
  });

  return await cloud.uploadFile({
    cloudPath:`${event.id}.jpg`,
    fileContent: qrResult
  })
}