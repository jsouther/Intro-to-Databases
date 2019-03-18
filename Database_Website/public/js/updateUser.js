/***********************************************************
** Author:  Jacob Souther and Felicia Ottley
** Date: 3/9/19
************************************************************/

function updateUser(Id){
    $.ajax({
        url: '/users/' + Id,
        type: 'PUT',
        data: $('#update-user').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};