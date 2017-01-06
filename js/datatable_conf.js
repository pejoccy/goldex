(function ($) {
    Drupal.behaviors.capitation_extract = {
        attach: function (context, settings) {

            var base_path = settings.path;
            var dataset = JSON.parse(settings.dataset);
//            console.log(dataset);
            var fileId = settings.fileId;
//            console.log(fileId);
            // add more options
            dataset.search = true;
            dataset.striped = true;
            //dataset.showToggle = false;
            //dataset.showRefresh = true;
//            dataset.showFooter = true;
            dataset.showPaginationSwitch = true;
            dataset.pagination = true;


            $('#table').bootstrapTable(dataset);

            // Data chunks loader
            $('#edit-pattern-id').on('change', function (evt) {
                var pattern = $(evt.target).val();
                window.location = base_path + '/extract/' + fileId + '/' + pattern;
            });

        }
    };
}(jQuery));

var reset = false, run_template = false;

function resetProcessor() {
    // set reset value to true
    reset = true;
    return true;
}

function runTemplate() {
    run_template = true;
    return true;
}

function switch_command() {
//    alert('switch_command'); return false;
    // add second command
    var form = $("form#render-extractor-options"), data_cmd;
    // is it a 
    if (reset) {
        data_cmd = 'Reset';
    }
    else if (run_template) {
        data_cmd = 'RunProcedure';
    }
    else {
        data_cmd = $("form#render-extractor-options input[name=cmds]:checked").val();
        // avoid data submit if cmd is not set;
        if (data_cmd == undefined) {
            return false;
        }
    }
//    console.log(data_cmd);
    // add an input if this button is clicked and submit
    var token = $('<input id="data_cmd" type="hidden" name="data_cmd" />').attr('value', data_cmd);
//    console.log(token);
//    return false;
    form.append(token);
    // just in-case, the page reload should set it back to false
    reset = false;
    run_template = false;
    
    return true;
}
