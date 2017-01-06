(function ($) {
    
    var $ajax_alert = $('#modal-price-modal .modal-body .alert').hide();
    
    Drupal.behaviors.capitation_summary = {
        attach: function (context, settings) {
//            var base_path = settings.path;
//            console.log(JSON.parse(settings.error_issues)); return;
            var data = JSON.parse(settings.dataset);
            var plan_data = JSON.parse(settings.plan_data);
            var error_entry = JSON.parse(settings.error_entry);
            var error_issues = JSON.parse(settings.error_issues);
            var file_id = settings.file_id;
            var defaultDataset = function () {
                return {
                    'search': true,
                    'striped': true,
                    'pagination': true,
                };
            };
            
            // bind actions
            var attachEdit = function() {
                $('.bootstrap-table tbody tr').has('a.show-on-hover').bind('mouseenter', function () {
                    $('a.show-on-hover:not(.show-on-hover.plus)', this).fadeIn('fast');
                }).bind('mouseleave', function () {
                    $('a.show-on-hover:not(.show-on-hover.plus)', this).fadeOut(250);
                });
            };
            // initialize 
            var dataset_upload_history = defaultDataset();
            var dataset_error_log = defaultDataset();
            var dataset_plans = defaultDataset();
            var dataset_error_issues = defaultDataset();

            // upload history
            dataset_upload_history.data = data;
            dataset_upload_history.columns = [
                {'field':"sn", 'title':"S/N", 'width':'60'},
                {'field':"period", 'title':'Period'},
                {'field':"importfile", 'title':'File Name'},
                {'field':"file_id", 'title':'File ID', 'visible':false},
                {'field':'lives', 'title':'Lives', 'align':'center'},
                {'field':'converted_yn', 'title':'Converted', 'align':'center', 'formatter':'formatConvertLink'},
                {'field':'verified_yn', 'title':'Verified', 'align':'center', 'formatter':'formatStatus'},
                {'field':'sync_yn', 'title':'Synced', 'align':'center', 'formatter':'formatStatus'},
                {'field':'file_capitation', 'title':'File Capitation', 'align':'right'},
                {'field':'total_capitation', 'title':'Total Capitation', 'align':'right'},
            ];
//            dataset_upload_history
            
            
            // error log summary
            dataset_error_log.columns = [
                {'field': "sn", 'title': "S/N", 'width':'60'},
                {'field': "importfile", 'title': 'File Name', 'formatter':'fileFormatter'},
                {'field': "period", 'title': 'Period'},
                {'field': "scheme_issues", 'title': 'Plan Issues'},
                {'field': "client_issues", 'title': 'Client Issues'},
                {'field': "price_issues", 'title': 'Price Issues'},
            ];
            // remove pagination
            if (error_issues.length) { 
                dataset_error_log.pagination = false;
                dataset_error_log.search = false;
//                dataset_error_log.columns.shift();
//                dataset_error_log.columns.pop();
                
                // error issues
                dataset_error_issues.data = error_issues;
//                dataset_error_issues.search = false;
                dataset_error_issues.formatNoMatches = function() { return 'No error found.'; };
                dataset_error_issues.columns = [
                    {'field': "sn", 'title': "S/N", 'width':'60'},
                    {'field': "health_plan_name", 'title': 'Scheme', 'formatter':'formatIssuePlan'},
                    {'field': "client_name", 'title': 'Retainer', 'formatter':'formatIssueClient'},
                ];
                // set record for error issues
                $('#table-error-issues').bootstrapTable(dataset_error_issues);
                $('#table-error-issues').data("file_id", file_id);
            }
            dataset_error_log.data = error_entry;
            
            
            // plans price configuration
            dataset_plans.data = plan_data;
            dataset_plans.columns = [
                {'field': "sn", 'title': "S/N", 'width':'60'},
                {'field': "health_plan_name", 'title': 'Plan', 'formatter':'formatEditPlan'},
                {'field': "service", 'title': 'Program', 'formatter':'formatEditProgram'},
                {'field': "client_name", 'title': 'Retainer', 'formatter':'formatEditClient'},
                {'field': "price", 'title': 'Price', 'formatter':'formatEditPrice'},
                {'field':'lives', 'title':'Lives', 'align':'center'},
                {'field':'total_capitation', 'title':'Total Capitation', 'align':'right'}
            ];
            
            
            // initialize bootstrap tables
            $('#table-upload-history').bootstrapTable(dataset_upload_history);
            $('#table-plan-price-info').bootstrapTable(dataset_plans);
            $('#table-error-log').bootstrapTable(dataset_error_log);
            
            // attach edit after bootstrap table loaded
            attachEdit();
            
            // on page change
            $('#table-plan-price-info').on('page-change.bs.table', function (e) {
                attachEdit();
            });
        }
    };


    // custom function prototype
    String.prototype.titleCase = function () {
        return this.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };

    $('#modal-price-modal').on('show.bs.modal', function (event) {
        // initialize
        var modal = $(this), act_arr, scheme, client, price, action, plan, program, program_id;
        var button = $(event.relatedTarget); // Button that triggered the modal
        // reset modal
        resetModal(modal);
        var cache = {};
        //
        act_arr = button.attr('class').split(' ');
        action = act_arr[act_arr.length-1];
        scheme = button.parents('tr').find('td').has('a.show-on-hover.scheme').children('span').text();
        client = button.parents('tr').find('td').has('a.show-on-hover.client').children('span').text();
        program = button.parents('tr').find('td').has('a.show-on-hover.program').children('span').text();
        price = button.parents('tr').find('td').has('a.show-on-hover.price').children('span').text();
        // cache variables
        cache.scheme = scheme;
        cache.client = client;
        cache.program = program;
        cache.price = price;
        
//        console.log(scheme, client, program);
        // set labels and values
        plan = client + ' :: ' + scheme;
        var lbl_name = action + ':';
        
        switch (action) {
            case 'scheme': {
                modal.find('.modal-body #plan-control').text(scheme);
                modal.find('.modal-body input.value-text').val(scheme);
                break;
            }
            case 'price' : {
                lbl_name = 'Plan:';
                modal.find('.modal-body #plan-control').text(plan);
                modal.find('.modal-body input.value-text').val('');
                break;
            }
            case 'client' : {
                // set title
                modal.find('.modal-body #plan-control').text(client);
                modal.find('.modal-body input.value-text').val(client);
                break;
            }
            case 'program' : {
                modal.find('.modal-body #plan-control').text(program);    
                break;
            }
            default: {
                
            }
        }
        // set title
        modal.find('#modal-form > .form-group.title > label').text(lbl_name.titleCase());
        // set hidden/non-hidden fields
        var _ids = button.parents('tr').find('td a.show-on-hover.'+action).first();
        modal.find('.modal-scheme').val(_ids.data('scheme'));
        modal.find('.modal-client').val(_ids.data('client'));
        modal.find('.modal-program').val(_ids.data('program'));
        modal.find('.modal-body input.modal-action').val(action);
        modal.find('.modal-body input.modal-item-string').val(cache[action]);
        // get options
        var url = 'http://localhost/hmo/fetch-plans';
        // 
        $.ajax({url:url, method:'POST', data:{'action':action, 'program':_ids.data('program')}, timeout:10000})
                .success(function(response, status, jqXHR) {
                    modal.find('.modal-body #select-control').find('option').first().text(' -Select-').val('').end().end().append(response);
                    modal.find('.modal-body #toggle-elem').removeAttr('disabled');
                }).error(function(jqXHR, error, mess) {
                    console.log(jqXHR.responseText, error);
                });
        
        // attach click behaviour
        $('#toggle-elem').on('click', function () {
            var checked = $(this).is(':checked') ? true : false;
            if (checked) {
                modal.find('#toggle-elem').val(checked);
                modal.find('.modal-body select.select-val').prop('disabled', true);
                modal.find('.modal-body input.value-text').removeAttr('disabled').focus();
                modal.find('.modal-body input.value-text').removeClass('hidden').focus();
            } else {
                modal.find('.modal-body select.select-val').removeAttr('disabled');
                modal.find('.modal-body input.value-text').prop('disabled', true);
                modal.find('.modal-body input.value-text').addClass('hidden');
            }
        });
    });
    
    // submit handler
    $("#modal-form").on("submit", function (event) {
        event.preventDefault();
        $ajax_alert.hide();
        $('label#modal-submit-form').text('Processing...').addClass('disabled');
        if (ajaxing) {
            return;
        }
        var formdata = $(this).serialize();
        var mFile = $('#table-error-issues').data("file_id");
//        console.log(formdata + "&file_id=" + mFile); 
//        return;
        // request already sent
        ajaxing = true;
            
        // send ajax request
        $.ajax({
            'url': $(this).attr('action'),
            'data': formdata + "&file_id=" + mFile,
//            'dataType': 'application/json',
            'method': 'POST',
            success: (function (response, status, jqXHR) {
                try {
                    var arr = JSON.parse(response);
                } catch(E) {
                    console.log(E, response);
                    showAlert('JSON parser error', 'warning');
                    return;
                }
                if (arr) {
                    // initialize bootstrap tables
                    $('#table-upload-history').bootstrapTable('load', JSON.parse(arr.dataset));
                    $('#table-plan-price-info').bootstrapTable('load', JSON.parse(arr.plan_data));
                    $('#table-error-log').bootstrapTable('load', JSON.parse(arr.error_entry));
                    $('#table-error-issues').bootstrapTable('load', JSON.parse(arr.error_issues));
                    
                    showAlert('Process successfully completed!');
                }
//                console.log(JSON.parse(response), status);
            }),
            error: (function (jqXHR, status, error) {
                showAlert(jqXHR.responseText, 'warning');
                console.log(jqXHR.responseText, status, error);
            }),
            complete: (function (jqXHR, status) {
                ajaxing = false;
                $('label#modal-submit-form').text('Submit').removeClass('disabled');
                console.log('complete');
            })
        });
    });

    // on hide
    $('#modal-price-modal').on('hide.bs.modal', function () {
        resetModal($(this));
    });
    
    function resetModal(modal) {
        $ajax_alert.hide();
        modal.find('#toggle-elem').prop('checked', false);
        modal.find('.modal-body #toggle-elem').prop('disabled', true);
        modal.find('.modal-body select.select-val').removeAttr('disabled');
        modal.find('.modal-body input.value-text').prop('disabled', true);
        modal.find('.modal-body input.value-text').addClass('hidden');
        modal.find('#toggle-elem').val("");
        modal.find('.modal-scheme').val("");
        modal.find('.modal-client').val("");
        modal.find('.modal-program').val("");
        modal.find('.modal-body #select-control').html('<option> Loading...</option>');
    }

    function showAlert(title, type) {
        type = type ? type : 'success';
        var glyph = type == 'success' ? 'glyphicon-ok-circle' : 'glyphicon-warning-sign';
        $ajax_alert.attr('class', 'alert alert-'+type)
                .html('<i class="glyphicon '+glyph+'" style="margin-right:15px;"></i> ' + title).show();
//        setTimeout(function () {
//            $ajax_alert.fadeOut();
//        }, 15000);
    }

}(jQuery));

function fileFormatter(value, row) {
    // check length of filename
    if (value.length) {
        var link = base_path_url + '/upload/'+row.file_id;
        if (row.scheme_issues == 0 && row.client_issues == 0) { 
            link = base_path_url + '/upload'; 
        }
        return '<a href="' + link + '">' + value + '</a>';
    }
}

function formatConvertLink(value, row, rowid) {
    if (value == 1) {
        return '<i class="glyphicon glyphicon-check"></i>';
    }
    var path = base_path_url + '/extract/' + row.file_id;
    return '<a href="' + path + '">[Convert]</a>';
}

function formatStatus(value) {
    if (value == 1) {
        return '<i class="glyphicon glyphicon-check"></i>';
    }
    return '<i class="glyphicon glyphicon-unchecked"></i>';
}

function formatEditPrice(value, row, rowid) {
    if (!value && value != '0') {
        value = 'N/A';
    }
    var data = ' data-scheme="' + row.scheme_id 
            + '" data-client="' + row.client_id 
            + '" data-price="' + row.price 
            + '" data-program="' + row.program + '" ';
    return '<span>' + value + '</span><a href="#modal-price-modal" ' + data + ' data-toggle="modal" data-target="#modal-price-modal" class="show-on-hover price"><i class="glyphicon glyphicon-edit"></i> edit</a>';
}

function formatEditPlan(value, row) {
    if (value.length > 0) {
        var data = ' data-scheme="' + row.scheme_id 
            + '" data-client="' + row.client_id 
            + '" data-price="' + row.price 
            + '" data-program="' + row.program + '" ';
        return '<span>' + value + '</span><a href="#modal-price-modal" data-toggle="modal" data-target="#modal-price-modal" class="show-on-hover scheme"' + data + '><i class="glyphicon glyphicon-edit"></i> edit</a>';
    }
    return value;
}

function formatEditProgram(value, row) {
    if (value.length > 0) {
        var data = ' data-scheme="' + row.scheme_id 
            + '" data-client="' + row.client_id 
            + '" data-price="' + row.price 
            + '" data-program="' + row.program + '" ';
        return '<span>' + value + '</span><a href="#modal-price-modal" data-toggle="modal" data-target="#modal-price-modal" class="show-on-hover program"' + data + '><i class="glyphicon glyphicon-edit"></i> edit</a>';
    }
    return value;
}

function formatEditClient(value, row) {
    if (value.length > 0) {
        var data = ' data-scheme="' + row.scheme_id 
            + '" data-client="' + row.client_id 
            + '" data-price="' + row.price 
            + '" data-program="' + row.program + '" ';
        return '<span>' + value + '</span><a href="#modal-price-modal" data-toggle="modal" data-target="#modal-price-modal" class="show-on-hover client"' + data + '><i class="glyphicon glyphicon-edit"></i> edit</a>';
    }
    return value;
}
function formatIssueClient(value, row) {
    if (value.length > 0) {
        var data = ' data-scheme="' + row.scheme_id 
            + '" data-client="' + row.client_id 
            + '" data-price="' + row.price 
            + '" data-program="' + row.program + '" ';
        if (row.client_id) {
            return '<span>' + value + '</span><i class="glyphicon glyphicon-ok show-on-hover-plus i-success"></i></a>';
        }
        return '<span>' + value + '</span><a href="#modal-price-modal" data-toggle="modal" data-target="#modal-price-modal" class="plus show-on-hover client"' + data + '><i class="glyphicon glyphicon-plus i-add"></i> add</a>';
    }
    return value;
}
function formatIssuePlan(value, row) {
    if (value.length > 0) {
        var data = ' data-scheme="' + row.scheme_id 
            + '" data-client="' + row.client_id 
            + '" data-price="' + row.price 
            + '" data-program="' + row.program + '" ';
        if (row.scheme_id) {
            return '<span>' + value + '</span><i class="glyphicon glyphicon-ok show-on-hover-plus i-success"></i></a>';
        }
        return '<span>' + value + '</span><a href="#modal-price-modal" data-toggle="modal" data-target="#modal-price-modal" class="plus show-on-hover scheme"' + data + '><i class="glyphicon glyphicon-plus i-add"></i> add</a>';
    }
    return value;
}

function submitAjax(post_data) {
    
}













var API_URL = 'http://' + location.host + ':3001/list/';
var $table = $('#table').bootstrapTable({url: API_URL}),
        $modal = $('#modal').modal({show: false}),
        $alert = $('.alert').hide();
$(function () {
    // create event
    $('.create').click(function () {
        showModal($(this).text());
    });
    $modal.find('.submit').click(function () {
        var row = {};
        $modal.find('input[name]').each(function () {
            row[$(this).attr('name')] = $(this).val();
        });
        $.ajax({
            url: API_URL + ($modal.data('id') || ''),
            type: $modal.data('id') ? 'put' : 'post',
            contentType: 'application/json',
            data: JSON.stringify(row),
            success: function () {
                $modal.modal('hide');
                $table.bootstrapTable('refresh');
                showAlert(($modal.data('id') ? 'Update' : 'Create') + ' item successful!', 'success');
            },
            error: function () {
                $modal.modal('hide');
                showAlert(($modal.data('id') ? 'Update' : 'Create') + ' item error!', 'warning');
            }
        });
    });
});
function queryParams(params) {
    return {};
}
function actionFormatter(value) {
    return [
        '<a class="update" href="javascript:" title="Update Item"><i class="glyphicon glyphicon-edit"></i></a>',
        '<a class="remove" href="javascript:" title="Delete Item"><i class="glyphicon glyphicon-remove-circle"></i></a>',
    ].join('');
}
// update and delete events
window.actionEvents = {
    'click .update': function (e, value, row) {
        showModal($(this).attr('title'), row);
    },
    'click .remove': function (e, value, row) {
        if (confirm('Are you sure to delete this item?')) {
            $.ajax({
                url: API_URL + row.id,
                type: 'delete',
                success: function () {
                    $table.bootstrapTable('refresh');
                    showAlert('Delete item successful!', 'success');
                },
                error: function () {
                    showAlert('Delete item error!', 'warning');
                }
            })
        }
    }
};
function showModal(title, row) {
    row = row || {
        id: '',
        name: '',
        stargazers_count: 0,
        forks_count: 0,
        description: ''
    }; // default row value
    $modal.data('id', row.id);
    $modal.find('.modal-title').text(title);
    for (var name in row) {
        $modal.find('input[name="' + name + '"]').val(row[name]);
    }
    $modal.modal('show');
}
