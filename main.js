const crypto = require("crypto");

var key = '7fbda8fefe33eec041a3cbca366fab32';
var id = 'c012543e9e';
var time = Math.floor(Date.now() / 1000);
var nonce = getNonce();
var method = 'POST';
var query = '/stores/size/carts?channel=android-app-phone';
var url = 'prod.jdgroupmesh.cloud';

const hawk = getHeader(id, key, time, nonce, method, query, url);
console.log(hawk);

function getHeader(id, key, time, nonce, method, query, url){

var data = `hawk.1.header
${time}
${nonce}
${method}
${query}
${url}
80


`;

var mac = hmacsha256(key, data);
var header = `Hawk id="${id}", mac="${mac}", ts="${time}", nonce="${nonce}"`;

return header

}

function hmacsha256(key, data) {
    return crypto.createHmac("SHA256", key).update(data, "utf8").digest("base64");
}

function getNonce(){
  lb = '0123456789abcdef'.split('');
  for (var a = '', b = 0; 6 > b; b++) a += lb[Math.round(15 * Math.random())];
  return a;
}
