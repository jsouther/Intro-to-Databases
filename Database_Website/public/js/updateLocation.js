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