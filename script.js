
document.getElementById('whats-number').focus();
$(document).ready(function() {

    $("#whats-number").mask("(99) 9999-99999");
    
    $("#whats-number").bind("keyup", function() {
        const whatsNumber = $(this).val().replace(/[^0-9]/g,'');
        
        if(whatsNumber.length == 11) {
            $("#whats-section").show();
            let srcApiWhats = 'http://api.whatsapp.com/send?1=pt_BR&phone=55' + whatsNumber;
            $("#whatsApiLink").attr('href', srcApiWhats)


            // Focus to Hide Keyboard
            var field = document.createElement('input');
            field.setAttribute('type', 'text');
            document.body.appendChild(field);

            setTimeout(function() {
                field.focus();
                setTimeout(function() {
                    field.setAttribute('style', 'display:none;');
                }, 50);
            }, 50);


        } else {
            $("#whats-section").hide();
        }
    });
    
});