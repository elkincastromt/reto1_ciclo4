function guardarUsuario(){ 
var datos ={ 
        email: $("#email").val(),
        password: $("#password").val(),
        name: $("#name").val()
     }

    var validar = [$("#email").val(), $("#password").val(), $("#name").val(), $("#con_password").val()] 

    if(!validarCampos(validar))
        Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Todos los campos son requeridos',
                    showConfirmButton: true,
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#0D6EFD'
                })
    else{ 

        if(validar[1]==validar[3]){
            $.ajax({    
                url : 'http://129.151.123.56:8080/api/user/'+$("#email").val(),
                dataType : 'JSON',
                type : 'GET',
                success : function(resultado) {
    
                    if(!resultado){
                        $.ajax({    
                            url : 'http://129.151.123.56:8080/api/user/new',
                            data : JSON.stringify(datos),
                            type : 'POST',
                            contentType: 'application/json',
                            dataType: 'JSON',
                            success : function(json, textStatus, xhr) {
                        
                            
                            },
                            error : function(xhr, status) {
                               
                                
                            },
                            complete : function(xhr, status) {
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'success',
                                        title: 'Usuario registrado correctamente',
                                        showConfirmButton: true,
                                        confirmButtonText: 'Iniciar Sesión',
                                        confirmButtonColor: '#157347'
                                    }).then((result) => {
                                        limpiarFormulario();
                                        window.location.href="index.html";
                                      })
                                
                            }
                        });
                    }else{
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: 'El Email ingresado ya existe, por favor intente con otro',
                            showConfirmButton: true,
                            confirmButtonText: 'Aceptar',
                            confirmButtonColor: '#0D6EFD'
                        })
                    }
                    
                },
                error : function(xhr, status) {
                    alert('ha sucedido un problema'+ xhr.status);
                },
                complete : function(xhr, status) {
                    //alert('Petición realizada '+xhr.status);
                }
            });
                

        }else{
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Las contraseñas no coinciden',
                showConfirmButton: true,
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0D6EFD'
            })
        }

    

    }
}

function verificarUsuario(){

    var validar = [$("#email").val(), $("#password").val()] 

    if(!validarCampos(validar))
        Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Todos los campos son requeridos',
                    showConfirmButton: true,
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#0D6EFD'
                })
    else{ 

        $.ajax({    
            url : 'http://129.151.123.56:8080/api/user/'+validar[0]+'/'+validar[1],
            type : 'GET',
            dataType : 'JSON',
            
            error : function(xhr, status) {
                alert('ha sucedido un problema, '+xhr.status);
            },
            success : function(resultado) {
                console.log(resultado.id)
                if(resultado.id==null){
                    console.log("no existe")
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Usuario o contraseña incorrecto',
                        showConfirmButton: true,
                        confirmButtonText: 'Aceptar',
                        confirmButtonColor: '#0D6EFD'
                    })
                }else{
                    limpiarFormulario();
                    window.location.href="inicio.html";
                }
            }
        });
    }
}

function validarCampos(campo){
    if(campo[0]!= "" && campo[1]!= "" && campo[2]!= "" && campo[3]!= "")
        return true
    else
        return false;
}

function limpiarFormulario(){
    $("#name").val("");
    $("#email").val("");
    $("#password").val("");
    $("#con_password").val("");
}