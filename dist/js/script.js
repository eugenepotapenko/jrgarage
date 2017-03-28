$( document ).ready(function() {

    var $formGroup = $('.form-group'),
        $formControl = $('.form-control');

    $formControl.on({
        focus: function () {
            $formGroup.addClass('focused');
        },

        blur: function () {
            $formGroup.removeClass('focused');
        }
    });
});