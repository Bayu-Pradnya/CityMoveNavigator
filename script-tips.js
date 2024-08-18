$(document).ready(function () {
    $('#tipsAccordion .collapse').first().addClass('show');

    $('#tipsAccordion .collapse').on('show.bs.collapse', function () {
        console.log('Accordion ' + $(this).attr('id') + ' terbuka');
    });

    $('#tipsAccordion .collapse').on('hide.bs.collapse', function () {
        console.log('Accordion ' + $(this).attr('id') + ' tertutup');
    });
});
