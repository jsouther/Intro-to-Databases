/***********************************************************
** Author:  Jacob Souther and Felicia Ottley
** Date: 3/9/19
************************************************************/

function updatePeripheral(Id){
    $.ajax({
        url: '/peripherals/' + Id,
        type: 'PUT',
        data: $('#update-peripheral').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};