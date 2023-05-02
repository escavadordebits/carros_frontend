
function oninit() {
    this.getcarro();
}

function getcarro() {
    var that = this;
    var userinput = document.getElementById("modelo").value;
    var oDatset = {
        item: []

    };
    getData(function (data) {
        let corpoTabela = document.getElementById('tbody');
        if (!userinput) {
            var list = data.Carros;
            var dados;

            for (var i = 0; i < list.length; i++) {

                dados = list[i];
                oDatset.item.push(dados);

                var tr = document.createElement('tr');

                var tdModelo = document.createElement('td');
                var tdAno = document.createElement('td');
                var tdValor = document.createElement('td');

                tdAno.textContent = oDatset.item[i].ano;
                tdModelo.textContent = oDatset.item[i].modelo;
                tdValor.textContent = oDatset.item[i].valor;

                tr.appendChild(tdAno);
                tr.appendChild(tdModelo);
                tr.appendChild(tdValor);
                corpoTabela.appendChild(tr);

            }
        } else {

            document.getElementById("ano").value = data.ano;
            document.getElementById("valor").value = data.valor;
            document.getElementById("carro_id").value = data.id;

        }


    });

    function getData(callback) {
        if (!userinput || userinput.length == 0) {
            $.ajax({
                method: "Get",
                url: "http://127.0.0.1:5000/carros",
                async: true,
                crossDomain: true,
                jsonpCallback: "getJSON",
                dataType: 'json',
                contentType: "application/json",
            }).done(function (data) {
                callback(data);
            });

        } else {
            $.ajax({
                method: "Get",
                url: "http://127.0.0.1:5000/carro?modelo=" + userinput,
                async: true,
                crossDomain: true,
                jsonpCallback: "getJSON",
                dataType: 'json',
                contentType: "application/json",

            }).done(function (data) {
                callback(data);
            });
        }


    }

};
function salvarcarrocoment() {

    var userinputcomment = document.getElementById("comentario").value;
    var formData = {
        carro_id: parseInt($("#carro_id").val()),
        texto: $("#comentario").val()
    };
    debugger
    if (userinputcomment || userinputcomment.length > 0) {
        $.ajax({
            url: "http://127.0.0.1:5000/comentario",
            method: "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": formData,
            success: function () {
                alert('Cadastrado com Sucesso');
            },
            error: function () {
                alert('Falha ao cadasdtrar');
            }
        });

    } else {
        alert("Prencha comentario");

    }

};
$(document).ready(function () {
    $("form").submit(function (event) {
        var formData = {
            ano: $("#ano").val(),
            modelo: $("#modelo").val(),
            valor: $("#valor").val(),
        };
        debugger
        $.ajax({
            type: "POST",
            url: "http://127.0.0.1:5000/carro",
            data: formData,
            dataType: "json",
            encode: true,
            error: function () {
                alert('Erro de cadastro');
            },
        }).done(function () {
            alert('Cadastrado com Sucesso');
            window.location.reload();
        });

        event.preventDefault();
    });
});


function deletecarro() {
    debugger
    var userinput = document.getElementById("modelo").value;
    if (userinput || userinput.length > 0) {
        $.ajax({
            url: "http://127.0.0.1:5000/carro?modelo=" + userinput,
            method: "DELETE",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "modelo": userinput
            }),
            success: function () {
                alert('Removido com Sucesso');
                window.location.reload();
            },
            error: function () {
                alert('Falha ao remover');
            }
        });

    } else {
        alert("Prencha comentario");

    }
}





