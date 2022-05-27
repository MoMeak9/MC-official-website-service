const COS = require('cos-nodejs-sdk-v5');
const fs = require('fs');
const cos = new COS({
  SecretId: '',
  SecretKey: '',
});

module.exports = async function(file) {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate();
  const dir = year + month + day;

  return new Promise((resolve, reject) => {
    cos.putObject(
      {
        Bucket: '' /* 必须 */,
        Region: '' /* 必须 */,
        Key: dir + file.originalname /* 必须 */,
        StorageClass: '',
        Body: file.buffer, // 上传文件对象
        onProgress: function(progressData) {
          console.log(JSON.stringify(progressData));
        },
      },
      (err, data) => {
        resolve(data);
      },
    );
  });
};
