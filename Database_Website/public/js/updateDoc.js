/***********************************************************
** Author:  Jacob Souther and Felicia Ottley
** Date: 3/9/19
************************************************************/

function updateDocument(Id){
    $.ajax({
        url: '/laptop_docs/' + Id,
        type: 'PUT',
        data: $('#update-document').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};