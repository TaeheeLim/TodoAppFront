import { API_BASE_URL } from "../app-config";
const ACCESS_TOKEN = 'ACCESS_TOKEN';

export function call(api, method, request){
    let headers = new Headers({
        "Content-Type" : "application/json"
    });

    const accessToken = localStorage.getItem("ACCESS_TOKEN");

    if(accessToken && accessToken !== null){
        headers.append('Authorization', "Bearer " + accessToken);
    }

    let options = {
        headers : headers,
        url : API_BASE_URL + api,
        method : method
    };

    if(request) {
        // GET method
        options.body = JSON.stringify(request)
    }

    return fetch(options.url, options)
                .then( response => {
                    if(response.ok){
                        return response.json();
                    }
                    throw new Error(response.status);
                }
            )
        .catch((error) => {
            if(error.message === '403'){
                window.location.href = '/login'; //redirect
            }
            return Promise.reject(error);
        })
}
//call end

export function signin(userDTO){
    return call("/auth/signin", "POST", userDTO)
            .then( response => {
                if(response.token){
                    localStorage.setItem('ACCESS_TOKEN', response.token);
                    //token이 있으면 Todo로 리다이렉트
                    console.log("response : ", response)
                    window.location.href = '/';
                }
                
            });
}

export function signout(){
    localStorage.setItem('ACCESS_TOKEN', null);
    window.location.href = '/login';
}

export function signup(userDTO){
    return call('/auth/signup', 'POST', userDTO);
}