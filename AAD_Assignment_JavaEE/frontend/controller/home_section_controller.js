$('.customer').css('display', 'none');
$('#item').css('display', 'none');
$('#order').css('display', 'none');
$('.order_details').css('display', 'none');

$('#nav_list>a').eq(0).on("click", () => {
    event.preventDefault();
    $('.home_main').css('display', 'block');
    $('#customer').css('display', 'none');
    $('#order').css('display', 'none');
    $('#item').css('display', 'none');
});

$('#nav_list>a').eq(1).on("click", () => {
    event.preventDefault();
    $('#customer').css('display', 'block');
    $('.home_main').css('display', 'none');
    $('#order').css('display', 'none');
    $('#item').css('display', 'none');

});

$('#nav_list>a').eq(2).on("click", () => {
    event.preventDefault();
    $('#item').css('display', 'block');
    $('.home_main').css('display', 'none');
    $('#customer').css('display', 'none');
    $('#order').css('display', 'none');
});

$('#nav_list>a').eq(3).on("click", () => {
    event.preventDefault();
    $('#order').css('display', 'block');
    $('.home_main').css('display', 'none');
    $('#customer').css('display', 'none');
    $('#item').css('display', 'none');
});

$('#home>section>div>button[type="button"]').eq(0).on("click", () => {
    event.preventDefault();
    $('#customer').css('display', 'block');
    $('.home_main').css('display', 'none');
    $('#item').css('display', 'none');
    $('#order').css('display', 'none');
});

$('#home>section>div>button[type="button"]').eq(1).on("click", () => {
    event.preventDefault();
    $('#item').css('display', 'block');
    $('.home_main').css('display', 'none');
    $('#customer').css('display', 'none');
    $('#order').css('display', 'none');
});

$('#home>section>div>button[type="button"]').eq(2).on("click", () => {
    event.preventDefault();
    $('#order').css('display', 'block');
    $('.home_main').css('display', 'none');
    $('#customer').css('display', 'none');
    $('#item').css('display', 'none');
});

