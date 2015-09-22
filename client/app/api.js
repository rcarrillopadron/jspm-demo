/**
 * Created by Roberto on 9/22/2015.
 */
var reposForUser = function(username){
    let url = `http://localhost:8080/api/users/${username}`;
    return fetch(url).then(response => response.json());
};

export {reposForUser};