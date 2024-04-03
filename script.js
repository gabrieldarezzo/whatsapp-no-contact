
document.getElementById('whats-number').focus();
$(document).ready(function() {
    
    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    function hideKeyboard() {
        var field = document.createElement('input');
        field.setAttribute('type', 'text');
        document.body.appendChild(field);

        setTimeout(function() {
            field.focus();
            setTimeout(function() {
                field.setAttribute('style', 'display:none;');
            }, 50);
        }, 50);
    }

    function sanitizedWhatsNumber(whatsNumber) {
        return whatsNumber.replace(/[^0-9]/g,'').replace(/^\+?55/, '');
    }

    function createWhastAppButton(whatsNumber) {
        if(whatsNumber.length == 11 || whatsNumber.length == 10) {
            $("#whats-section").show();
        } else {
            $("#whats-section").hide();
            return false;
        }
        
        let srcApiWhats = 'http://api.whatsapp.com/send?1=pt_BR&phone=55' + whatsNumber;
        $("#whatsApiLink").attr('href', srcApiWhats);

        if(whatsNumber.length == 11 && isMobileDevice()) {
            hideKeyboard();
        }
    }
    
    $("#whats-number").mask("(99) 9999-9999?9");
    $("#whats-number").on("paste", function(event) {
        $("#whats-number").unmask();
        event.preventDefault();
        var input = $(this);
        setTimeout(function() {
            navigator.clipboard.readText().then(function(textoColado) {
                input.val(textoColado);
            }).catch(function(err) {
                console.error('Erro ao ler o texto colado:', err);
            });
        }, 0);
    });

    $("#whats-number").bind("keyup", function(){
        let whatsNumber = sanitizedWhatsNumber($(this).val());
        createWhastAppButton(whatsNumber);
    });

    $("#btn-getclipboard").bind("click", function() {        
        if (!navigator.clipboard) {
            alert("Seu navegador não suporta a API Clipboard. Por favor, atualize-o.");
            return;
        }
        
        navigator.clipboard.readText()
            .then(stringNumberInClip => {
                const whatsNumber = sanitizedWhatsNumber(stringNumberInClip);
                if(whatsNumber.length != 11 && whatsNumber.length != 10) {
                    return false;
                }

                $("#whats-number").val(whatsNumber);
                $("#whats-number").mask("(99) 9999-99999");
                createWhastAppButton(whatsNumber);
            })
            .catch(err => {
                console.error('Erro ao recuperar conteúdo do clipboard:', err);
                alert("Erro ao recuperar conteúdo do clipboard. Por favor, tente novamente.");
            });
    });
});