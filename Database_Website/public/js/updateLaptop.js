function updateLaptop(Id){
    $.ajax({
        url: '/laptops/' + Id,
        type: 'PUT',
        data: $('#update-laptop').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};