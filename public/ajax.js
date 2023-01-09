/*
Author: Shuang Lin
Email: shl224@lehigh.edu
*/

//Client Program //////////////////////////////////////////////////////////

//Route load
$(document).ready( function () {
    $.ajax({
        url: '/load',
        type: 'GET',
        dataType: 'text',
        success: function(data) {
            //empty then rebuild table
            $('#targetToggle').hide(); //hide target unless selected needs
            $('#table_body').empty();
            $('#table_body').append(data);
        }
        });
});

//Route add
$(function() {
    $('#addButton').click(function() {

        //check if type has target
        let typeIn = "";
        if($('#target_input').val()){
            typeIn = $('#type_select').val() +": "+ $('#target_input').val();
        }
        else{
            typeIn = $('#type_select').val();
        }
        $.ajax({
            type: 'GET',
            url: '/add',
            dataType: 'text',
            data: {
                desc: $('#desc_input').val(),
                type: typeIn,
                date: $('#date_input').val(),
            },
            success: function(data) {
                $('#table_body').empty();
                $('#table_body').append(data);
            }
        });
        $("#taskForm")[0].reset(); //reset form for next use
    });
});

//Route delete
$(function() {
    $('#delButton').click(function() {
        //store indices of check boxes
        var indices = [];
        $("input:checkbox:checked").each(function(){
            indices.push($(this).attr("id"));
        });

        //confirm delete
        let confirmDel = confirm("Really delete??");
        if(confirmDel){
            $.ajax({
                type: 'GET',
                url: '/delete',
                dataType: 'text',
                data: {
                    indices
                },
                success: function(data) {
                    $('#table_body').empty();
                    $('#table_body').append(data);
                }
            });
        }
    });
});

function checkTarget(option){
    for(i in option){
        if(option == "Waiting" || option == "Talk"){
            $("#targetToggle").show();
        }
        else{
            $("#targetToggle").hide();
        }
    }
}