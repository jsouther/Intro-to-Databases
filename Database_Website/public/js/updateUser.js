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
