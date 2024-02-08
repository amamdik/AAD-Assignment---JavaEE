import {item_model} from "../model/item_model.js";

var row_index = null;

const quantityRegex = /^\d+$/;
const regQuantity = new RegExp(quantityRegex);

const priceRegex = /^\$?\d+(,\d{3})*(\.\d{2})?$/;
const regPrice = new RegExp(priceRegex);


const loadItemData = () => {
    $('#item-tbl-body').empty(); // make tbody empty

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
                res.map((item, index) => {
                    let record = `<tr><td class="item_id">${item.item_id}</td><td class="description">${item.descr}</td><td class="price">${item.price}</td><td class="qty">${item.qty}</td></tr>`;
                    $("#item-tbl-body").append(record);
                });
            })


        }else {
            console.log("Failed");
        }
    }

    http.open("GET","http://localhost:8080/pos/item",true);

    http.send();
}

// save
$("#save_item[type='button']").on("click", () => {
    let item_id = $("#item_id").val();
    console.log(item_id);
    let validity = -1;

    if(validity===-1) {

        let desc = $("#desc").val();
        let price = $("#price").val();
        let qty = $("#qty").val();

        if (item_id) {
            if (desc) {
                if (price) {
                    if (regPrice.test(price)) {
                        if (qty) {

                            if (regQuantity.test(qty)) {
                                const itemData = {
                                    item_id : item_id,
                                    descr: desc,
                                    price: price,
                                    qty: qty
                                }

                                console.log(itemData);

                                //send data to backend

                                //create jason object
                                const itemJSON = JSON.stringify(itemData);
                                console.log(itemJSON);
                                sendAjax(itemJSON);

                                //send data to backend using AJAX

                                function sendAjax(itemJSON) {

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

                                    http.open("POST","http://localhost:8080/pos/item",true);
                                    http.setRequestHeader("Content-Type","application/json");
                                    http.send(itemJSON);
                                }

                                // clear();
                                $("#item_reset[type='reset']").click();

                                // load student data
                                // loadItemData();
                                toastr.success("Item successfully added...✅");
                            } else {
                                toastr.error("Invalid Quantity...❌");

                            }
                        } else {
                            toastr.error("Quantity is empty...❌");

                        }
                    } else {
                        toastr.error("Invalid Price...❌");

                    }
                } else {
                    toastr.error("Price is empty...❌");

                }
            } else {
                toastr.error("Description is empty...❌");

            }
        } else {
            toastr.error("Item ID is empty...❌");

        }

    }else {
        window.alert("Item ID is Already Exist :(");
    }
});

//update
$("#update_item[type='button']").on("click", () => {

    let item_id = $("#item_id").val();
    let desc = $("#desc").val();
    let price = $("#price").val();
    let qty = $("#qty").val();

    // update item in the db
    if (item_id) {
        if (desc) {
            if (price) {
                if (regPrice.test(price)) {
                    if (qty) {

                        if (regQuantity.test(qty)) {
                            const itemData = {
                                item_id : item_id,
                                descr: desc,
                                price: price,
                                qty: qty
                            }
                            console.log(itemData);

                            //send data to backend

                            //create jason object
                            const itemJSON = JSON.stringify(itemData);
                            console.log(itemJSON);
                            sendAjax(itemJSON);

                            //send data to backend using AJAX

                            function sendAjax(itemJSON) {

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

                                http.open("PUT","http://localhost:8080/pos/item",true);
                                http.setRequestHeader("Content-Type","application/json");
                                http.send(itemJSON);
                            }

                            // clear();
                            $("#item_reset[type='reset']").click();

                            // load student data
                            // loadItemData();
                            toastr.success("Item successfully added...✅");
                        } else {
                            toastr.error("Invalid Quantity...❌");
                        }
                    } else {
                        toastr.error("Quantity is empty...❌");
                    }
                } else {
                    toastr.error("Invalid Price...❌");
                }
            } else {
                toastr.error("Price is empty...❌");
            }
        } else {
            toastr.error("Description is empty...❌");
        }
    } else {
        toastr.error("Item ID is empty...❌");
    }

    // clear();
    $("#item_reset[type='reset']").click();

    // load student data
    loadItemData();
})

// delete
$("#delete_item[type='button']").on("click", () => {
    let item_id = $("#item_id").val();

    // find item index
    let index = item_db.findIndex(item => item.item_id === item_id);

    // remove the item from the db


    $("#item_reset[type='reset']").click();

    // load student data
    loadItemData();
})

$("#item-tbl-body").on("click", "tr", function() {
    row_index = $(this).index();
    console.log(row_index);
    let item_id = $(this).find(".item_id").text();
    let description = $(this).find(".description").text();
    let price = $(this).find(".price").text();
    let qty = $(this).find(".qty").text();
    $("#item_id").val(item_id);
    $("#desc").val(description);
    $("#price").val(price);
    $("#qty").val(qty);
})
loadItemData();



