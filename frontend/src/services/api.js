import React from 'react';
import axios from 'axios';
const backendUrl = 'http://localhost:8088/api/'
export function post(endPoint, data, headers) {
    let config = {
        headers: headers
    }
    config.headers.Accept = "application/json"
    return axios.post(backendUrl + endPoint, data, config)
        ;
}
export function postJson(endPoint, data) {
    let headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
    return post(endPoint, data, headers)
}
export function postMultiPart(endPoint, data, token) {
    let headers = {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        "Authorization": "bearer " + token
    }
    return post(endPoint, data, headers)
}

