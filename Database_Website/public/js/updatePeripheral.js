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