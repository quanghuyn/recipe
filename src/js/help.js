import { async } from "regenerator-runtime";
import {TIME_OUT} from './config.js'
const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };
  
export const AJAX =  async function(url, uploaddata = undefined){
  try {
  const fetchPro = uploaddata ?  fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(uploaddata)
  }) : fetch(url)

  const rest = await Promise.race([fetchPro,timeout(`${TIME_OUT}`)])  
        const data = await rest.json()
        if (!rest.ok) {throw new Error(`${data.message} (${rest.status})`)}
        return data
    } catch (error) {
        throw error
    }
}

/*
export const getJson = async function(url){
    try {
        const rest = await Promise.race([fetch(`${url}`),timeout(`${TIME_OUT}`)])  
        const data = await rest.json()
        if (!rest.ok) {throw new Error(`${data.message} (${rest.status})`)}
        return data
    } catch (error) {
        throw error
    }
}


export const sendJson = async function(url,newdata){
    try {
      const senfetch = fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newdata)
      })

      // const rest = await Promise.race([senfetch,timeout(`${TIME_OUT}`)])  
      const rest = await senfetch
      const data = await rest.json()
        if (!rest.ok) {throw new Error(`${data.message} (${rest.status})`)}
        return data
    } catch (error) {
        throw error
    }
}


export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIME_OUT)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
*/
