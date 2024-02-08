import {item_model} from "../model/item_model.js";
import {order_model} from "../model/order_model.js";

var row_index = null;

let  response =null;

let highestOrderNumber = 0;


$('#cmbCustomers').on('click', () => {

    const http = new XMLHttpRequest();

    //Step 02 -
    http.onreadystatechange = () =>
    {
        //validate readyState and status
        if (http.readyState === 4 && http.status === 200) {
            console.log("Success");
            http.addEventListener('load',function(){
                const res =   JSON.parse(http.responseText);
                console.log(res);
                res.forEach(customer => {
                    // Check if an option with the same customer_id already exists
                    const isCustomerAdded = Array.from(document.getElementById('cmbCustomers').options).some(option => {
                        const existingCustomer = JSON.parse(option.value);
                        return existingCustomer.customer_id === customer.customer_id;
                    });

                    if (!isCustomerAdded) {
                        // If the customer with the same customer_id doesn't exist, add a new option
                        const option = document.createElement("option");
                        option.value = JSON.stringify(customer);
                        option.text = customer.customer_id;
                        document.getElementById('cmbCustomers').appendChild(option);
                    }

                });

            })

        }else {
            console.log("Failed");
        }
    }

    http.open("GET","http://localhost:8080/pos/customer",true);

    http.send();
});

$('#cmbCustomers').on('change', () => {
    const selectedOption = $('#cmbCustomers option:selected');

    if (selectedOption.length > 0) {
        const selectedCustomer = JSON.parse(selectedOption.val());
        let name = selectedCustomer.name;
        let contact = selectedCustomer.contact;

        $('#customer_name').val(name);
        $('#customer_contact').val(contact);

    } else {
        console.log('No option selected');
    }
});

$('#cmbItemId').on('click', () => {

    const http = new XMLHttpRequest();

    //Step 02 -
    http.onreadystatechange = () =>
    {
        //validate readyState and status
        if (http.readyState === 4 && http.status === 200) {
            console.log("Success");
            http.addEventListener('load',function(){
                response =   JSON.parse(http.responseText);
                //console.log(res);
                response.forEach(item => {
                    // Check if an option with the same customer_id already exists
                    const isItemAdded = Array.from(document.getElementById('cmbItemId').options).some(option => {
                        const existingCustomer = JSON.parse(option.value);
                        return existingCustomer.item_id === item.item_id;
                    });

                    if (!isItemAdded) {
                        // If the customer with the same customer_id doesn't exist, add a new option
                        const option = document.createElement("option");
                        option.value = JSON.stringify(item);
                        option.text = item.item_id;
                        document.getElementById('cmbItemId').appendChild(option);
                    }
                });
            })

        }else {
            console.log("Failed");
        }
    }

    http.open("GET","http://localhost:8080/pos/item",true);

    http.send();
});

$('#cmbItemId').on('change', () => {
    let item_id = $('#cmbItemId option:selected').text();

    if (item_id) {

        let foundItem = null;
        let description = null;
        let price = 0;
        let qty = 0;

        for (let i = 0; i < response.length; i++) {
            if (response[i].item_id === item_id) {
                foundItem = response[i];
                console.log(foundItem)
                description = foundItem.descr;
                price = foundItem.price;
                qty = foundItem.qty;
                break; // Exit the loop when the item is found
            }
        }

        $('#item_desc').val(description);
        $('#item_price').val(price);
        $('#item_qty').val(qty);

    } else {
        console.log('No option selected');
    }
});

$('#buy_qty').on('input', () => {

    let val = $('#buy_qty').val();
    let price = $('#item_price').val();

    let total = val * price;

    $('#total').val(total);

})


$('#add_cart').on('click', () => {

    // Get the item_id you want to check
    let item_id = $('#cmbItemId option:selected').text();

// Check if the item_id already exists in the table body
    let itemExists = false;

    $('#order_table_body .item_id').each(function () {
        if ($(this).text() === item_id) {
            itemExists = true;
            // Update the quantity for the existing item
            let existingQty = parseInt($(this).closest('tr').find('.qty').text());
            let qty = parseInt($('#buy_qty').val());
            let newQty = existingQty + qty;

            let existingTotal = parseInt($(this).closest('tr').find('.total').text());
            let add_total = parseInt($('#total').val());
            let newTotal = existingTotal + add_total;


            let selectedItem = response.find(item => item.item_id === item_id);

            if (selectedItem) {

                if (selectedItem.qty < qty) {
                    toastr.error('Error: Not enough items in stock.');
                    return;
                } else {
                    // Update the item_db to reduce the quantity
                    selectedItem.qty -= qty;
                    let index = response.findIndex(item => item.item_id === item_id);

                    // update item in the db
                    let item_object = response  [index]
                    item_object.price -= qty;

                    $(this).closest('tr').find('.qty').text(newQty);
                    $(this).closest('tr').find('.total').text(newTotal);
                    //loadItemData();
                }
                // Check if quantity is non-negative

            }

            return false; // Break the loop if a match is found
        }
    });

    if (!itemExists) {
        console.log('Item with ID ' + item_id + ' is not in the table.');

        let desc = $('#item_desc').val();
        let total = $('#total').val();
        let qty = $('#buy_qty').val();

        // Find the item in item_db by its item_id
        let selectedItem = response.find(item => item.item_id === item_id);

        if (selectedItem) {

            if (selectedItem.qty < qty) {
                toastr.error('Error: Not enough items in stock.');
                return;
            } else {
                // Update the item_db to reduce the quantity
                selectedItem.qty -= parseInt(qty);
                let index = response.findIndex(item => item.item_id === item_id);

                // update item in the db
                let item_object = response[index]
                item_object.item_price -= parseInt(qty);

                // other_js_file.js

// Now you can call the loadItem function
                // loadItemData();

            }
            // Check if quantity is non-negative

        }

        // Add the item to the table
        let record = `<tr><td class="item_id">${item_id}</td><td class="desc">${desc}</td><td class="total">${total}</td><td class="qty">${qty}</td></tr>`;
        $("#order_table_body").append(record);

        toastr.success("Add to cart...🛒");

    } else {
        console.log('Item not found in item_db.');

    }


    let final_total = 0;
    for (let i = 0; i < $('#order_table_body tr').length; i++) {
        // Get the current row
        let row = $('#order_table_body tr').eq(i);
        let total = parseFloat(row.find('.total').text());
        final_total += total;
    }

    $('#final_total').val(final_total);

    const cmbItemId = document.getElementById('cmbItemId');

    cmbItemId.innerHTML = '';
    $('#item_desc').val('');
    $('#item_price').val('');
    $('#item_qty').val('');
    $('#buy_qty').val('');
    $('#total').val('');

})


$("#order_table_body").on("click", "tr", function () {
    row_index = $(this).index();

    $("#order_table_body tr").removeClass("table-danger")
    $("#order_table_body tr").eq(row_index).addClass("table-danger");

});

$('#remove').on("click", () => {
    var $row = $("#order_table_body tr").eq(row_index);

    // Iterate through the cells in the row and get their values

    Swal.fire({
        title: 'Remove Item from Cart',
        text: 'Are you sure you want to remove this item from your cart?',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#3085d6',
        confirmButtonColor: '#d33',
        confirmButtonText: 'Yes, remove it'
    }).then((result) => {
        if (result.isConfirmed) {

            $("#order_table_body tr").eq(row_index).remove();
            $row.find(".total").each(function () {
                var cell_value = parseFloat($(this).text()); // Assuming the value is a number
                let final_total = $('#final_total').val();
                console.log(cell_value)
                final_total -= cell_value;
                $('#final_total').val(final_total);

            });

            Swal.fire(
                'Removed from Cart',
                'The item has been successfully removed from your cart.',
                'success'
            );
        }
    });

})

$('#place_ord').on('click', () => {

    let order_id = $('#order_id').text();
    let customer_id = $('#cmbCustomers option:selected').text();
    let total = $('#final_total').val();

    let items = [];
    let item_model=null;
    var now = new Date();

// Get the local date in various formats
    var date = now.toLocaleDateString(); // R

    for (let i = 0; i < $('#order_table_body tr').length; i++) {

        let row = $('#order_table_body tr').eq(i);
        let item_id = row.find('.item_id').text();
        let desc = row.find('.desc').text();
        let qty = row.find('.qty').text();
        let price = row.find('.total').text();

        item_model = new item_model(item_id, desc, price,qty);

        items.push(item_model);
    }



    let order_model = new order_model(order_id, customer_id, total, items,date);
    // order_db.push(orderModel);

    const orderJSON = JSON.stringify(order_model);
    console.log(orderJSON);
    sendAjax(orderJSON);

    //send data to backend using AJAX

    function sendAjax(orderJSON) {

        //AJAX
        //Step 01 - create an XMLHttpRequest object
        const http = new XMLHttpRequest();

        //Step 02 -
        http.onreadystatechange = () =>
        {
            //validate readyState and status
            if (http.readyState === 4 && http.status === 200) {
                console.log("Success");
            }else {
                console.log("Failed");
            }
        }

        http.open("POST","http://localhost:8080/pos/order",true);
        http.setRequestHeader("Content-Type","application/json");
        http.send(orderJSON);
    }


    toastr.success('Order placed successfully...🎁')
    //  loadOrderCards()

    $('#order_table_body').empty();
    $('#final_total').val('')

    const newOrderID = generateOrderID();

});

function findHighestOrderNumber() {

    const http = new XMLHttpRequest();

    //Step 02 -
    http.onreadystatechange = () =>
    {
        //validate readyState and status
        if (http.readyState === 4 && http.status === 200) {
            console.log("Success");
            http.addEventListener('load',function(){
                const res =   JSON.parse(http.responseText);
                console.log(res);

                for (const order of res) {
                    const orderNumber = parseInt(order.order_id.slice(1), 10);

                    if (!isNaN(orderNumber) && orderNumber > highestOrderNumber) {
                        highestOrderNumber = orderNumber;
                        console.log(highestOrderNumber);
                        const nextOrderNumber = highestOrderNumber + 1;

                        // Format the order number with leading zeros and "O" prefix
                        const orderID = 'O' + nextOrderNumber.toString().padStart(3, '0');
                        console.log(orderID);
                        $('#order_id').text(orderID);

                    }
                }
            })

        }else {
            console.log("Failed");
        }
    }

    http.open("GET","http://localhost:8080/pos/order",true);

    http.send();
}

// Function to generate the next order ID
function generateOrderID() {
    findHighestOrderNumber();

}

$('#btn_recent_orders').on('click', () => {

    event.preventDefault();
    $('.order_details').css('display', 'block');
    $('.home_main').css('display', 'none');
    $('#customer').css('display', 'none');
    $('#order').css('display', 'none');
    $('#item').css('display', 'none');
})

generateOrderID();


