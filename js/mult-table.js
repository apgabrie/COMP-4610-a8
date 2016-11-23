/*
 * Andrew Gabriel, andrew_gabriel@student.uml.edu
 * COMP 4610 - 201, Assignment 8
 * This file contains the javascript for the multiplication table.
 */

$(document).ready(function(){
    /* Create a new table every 250 milliseconds*/
    setInterval(function() {
        var $theInputs = $('input:not(.submit)');
        if ($('#myForm').valid()) {
            createMultTable(parseInt($theInputs[0].value), parseInt($theInputs[1].value), parseInt($theInputs[2].value), parseInt($theInputs[3].value));
        }
    }, 250);
    
    
    /* Set up UI sliders */
    var sliderOpts = {
        min: -35,
        max: 35,
    }
    
    $('.mySlider').slider(sliderOpts);
    
    
    /* Slider on slide listeners */
    $('#x1Slider').on('slide', function(event, ui) {
        $('#myFormInput1').val(ui.value);
    });
    
    $('#x2Slider').on('slide', function(event, ui) {
        $('#myFormInput2').val(ui.value);
    });
    
    $('#x3Slider').on('slide', function(event, ui) {
        $('#myFormInput3').val(ui.value);
    });
    
    $('#x4Slider').on('slide', function(event, ui) {
        $('#myFormInput4').val(ui.value);
    });
    
    
    /* Input boxes on change listeners */
    $('#myFormInput1').keyup(function() {
        $('#x1Slider').slider('value', $(this).val());
    });
    
    $('#myFormInput2').keyup(function() {
        $('#x2Slider').slider('value', $(this).val());
    });
    
    $('#myFormInput3').keyup(function() {
        $('#x3Slider').slider('value', $(this).val());
    });
    
    $('#myFormInput4').keyup(function() {
        $('#x4Slider').slider('value', $(this).val());
    });
    
    
    /* Set up UI tabs */
    $('#myTabs').tabs({
        active: 0,
        activate: function(event, ui) {
            if (ui.newTab.attr('id') !== 'plusTab') {
                var arr = ui.newTab.text().split(', ');
                $('#myFormInput1').val(arr[0]);
                $('#x1Slider').slider('value', arr[0]);
                
                $('#myFormInput2').val(arr[1]);
                $('#x2Slider').slider('value', arr[1]);
                
                $('#myFormInput3').val(arr[2]);
                $('#x3Slider').slider('value', arr[2]);
                
                $('#myFormInput4').val(arr[3]);
                $('#x4Slider').slider('value', arr[3]);
            }
        }
    });

    $('#plusTab').click(function() {
        if ($('#myForm').valid()) {
            var $theInputs = $('input:not(.submit)');
            var arr = [parseInt($theInputs[0].value), parseInt($theInputs[1].value), parseInt($theInputs[2].value), parseInt($theInputs[3].value)];
            
            var $newTab = $('<li></li>').html(['<a href="tab">', arr[0], ', ', arr[1], ', ', arr[2], ', ', arr[3], '</a>'].join(''));
            $(this).before($newTab);
            
            $('#myTabs').tabs("refresh");
            $('#myTabs').tabs("option", "active", -2);
            
            if ($('#tabs > li').length >= 7) {
                $(this).hide();
            }
        }
    });
    
    $('#deleteCurrent').click(function() {
        var $index = $('#myTabs').tabs('option', 'active');
        var tab = $('#tabs').children()[$index];
        
        if ($index + 1  !== $('#tabs').children().length) {
            tab.remove();
        }
        $('#plusTab').show();
    });
    
    $('#deleteAll').click(function() {
        $('#tabs > li:not(#plusTab)').each(function() {
            $(this).remove();
        });
        $('#plusTab').show();
    });
    
    
    
    /* Form Validation */
    jQuery.validator.addMethod("greaterThan", function(value, element, param) {
        return this.optional(element) || parseInt(value) > parseInt($(param).val());
    }, jQuery.validator.format("This number must be greater than the previous number."));
    
    // Validate form
    $('#myForm').validate({
        rules: {
        	x1: {
        		number: true,
        		min: -35,
        		max: 35
        	},
            x2: {
        		number: true,
        		min: -35,
        		max: 35,
                greaterThan: "#myFormInput1"
            },
            x3: {
        		number: true,
        		min: -35,
        		max: 35
            },
            x4: {
        		number: true,
        		min: -35,
        		max: 35,
                greaterThan: "#myFormInput3"
            }
        }
    });
});

/* createMultTable():
 * 
 * This function, when called, creates a multiplication table.
 * The values for the table are given as parameters.
 */
function createMultTable(x1, x2, x3, x4) {
    var i;
    var j;

    // Create multiplication table
    var multTable = document.getElementById('multTable');
    multTable.innerHTML = '';
    
    var row = multTable.insertRow();
    row.insertCell()
    
    for (i = x1; i <= x2; i++) {
        var cell = row.insertCell();
        cell.innerHTML = i;
    }
    
    for (i = x3; i <= x4; i++) {
        var row = multTable.insertRow();
        var leftMostCell = row.insertCell();
        leftMostCell.innerHTML = i;
        
        for (j = x1; j <= x2; j++) {
            var cell = row.insertCell();
            cell.innerHTML = i * j;
        }
    }
    
    // Check if the table overflows the containing div
    var theWrapper = document.getElementById('wrapper');
    var warningMessage = document.getElementById('overflowWarning');
    if (multTable.offsetWidth + 320 > theWrapper.offsetWidth) { 
        warningMessage.innerHTML = 'WARNING: Some content may have been cut off due to the width of the table.';
    } else {
        warningMessage.innerHTML = '';
    }
}
