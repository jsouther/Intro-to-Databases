/***********************************************************
** Author:  Jacob Souther and Felicia Ottley
** Date: 3/9/19
************************************************************/

function updateLocation(Id){
    $.ajax({
        url: '/location/' + Id,
        type: 'PUT',
        data: $('#update-location').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};