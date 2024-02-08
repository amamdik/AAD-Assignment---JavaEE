import {customer_model} from "../model/customer_model";

var row_index = null;

const customerIdPattern = /^C\d+$/;
const regexCustID = new RegExp(customerIdPattern);

const sriLankanMobileNumberRegex = /^(\+94|0)[1-9][0-9]{8}$/;
const regMobile = new RegExp(sriLankanMobileNumberRegex);

const loadCustomerData = () => {
    $('#customer-tbl-body').empty(); // make tbody empty


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
                    let record = `<tr><td class="customer_id">${item.customer_id}</td><td class="name">${item.name}</td><td class="address">${item.address}
                    </td><td class="contact">${item.contact}</td></tr>`;
                    $("#customer-tbl-body").append(record);
                });

            })


        }else {
            console.log("Failed");
        }
    }

    http.open("GET","http://localhost:8080/pos/customer",true);

    http.send();
};

// save
$("#save_customer[type='button']").on("click", () => {
    let cust_id = $("#cust_id").val();
    let validity = -1;


    if (validity === -1) {
        let name = $("#name").val();
        let address = $("#address").val();
        let contact = $("#contact").val();

        if (cust_id) {
            if (regexCustID.test(cust_id)) {
                if (name) {
                    if (address) {
                        if (contact) {
                            if (regMobile.test(contact)) {

                                // save in the db
                                //get data from form fields

                                console.log(cust_id);
                                console.log(name);
                                console.log(address);
                                console.log(contact);

                                //create an object for accumulate data
                                const customerData = {
                                    customer_id : cust_id,
                                    name: name,
                                    address: address,
                                    contact: contact
                                }

                                console.log(customerData);

                                //send data to backend

                                //create jason object
                                const customerJSON = JSON.stringify(customerData);
                                console.log(customerJSON);
                                sendAjax(customerJSON);

                                //send data to backend using AJAX

                                function sendAjax(customerJSON) {

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

                                    http.open("POST","http://localhost:8080/pos/customer",true);
                                    http.setRequestHeader("Content-Type","application/json");
                                    http.send(customerJSON);
                                }

                                // clear();
                                $("#customer_reset[type='reset']").click();

                                // load student data
                                loadCustomerData();
                                toastr.success("Customer successfully added...✅");

                            } else {
                                toastr.error("Invalid Contact Number...❌");
                                return;
                            }
                        } else {
                            toastr.error("Contact Number is empty...❌");
                            return;
                        }
                    } else {
                        toastr.error("Address is empty...❌");
                        return;
                    }
                } else {
                    toastr.error("Name is empty...❌");
                    return;
                }
            } else {
                toastr.error("Invalid Customer ID...❌");
                return;
            }


        } else {
            toastr.error("Customer ID is empty...❌");
            return;
        }


    } else {
        toastr.error("Customer ID already exists...❌");

    }
});

//update
$("#update_customer[type='button']").on("click", () => {

    let cust_id = $("#cust_id").val();
    let name = $("#name").val();
    let address = $("#address").val();
    let contact = $("#contact").val();

    if (cust_id) {
        if (regexCustID.test(cust_id)) {
            if (name) {
                if (address) {
                    if (contact) {
                        if (regMobile.test(contact)) {

                            // update the db

                            // save in the db
                            //get data from form fields

                            console.log(cust_id);
                            console.log(name);
                            console.log(address);
                            console.log(contact);

//create an object for accumulate data
                            const customerData = {
                                customer_id : cust_id,
                                name: name,
                                address: address,
                                contact: contact
                            }

                            console.log(customerData);

//send data to backend

//create jason object
                            const customerJSON = JSON.stringify(customerData);
                            console.log(customerJSON);
                            sendAjax(customerJSON);

//send data to backend using AJAX

                            function sendAjax(customerJSON) {

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

                                http.open("PUT","http://localhost:8080/pos/customer",true);
                                http.setRequestHeader("Content-Type","application/json");
                                http.send(customerJSON);
                            }

                            // clear();
                            $("#customer_reset[type='reset']").click();

                            // load student data
                            loadCustomerData();
                            toastr.success("Customer successfully updated...✅");

                        } else {
                            toastr.error("Invalid Contact Number...❌");
                            return;
                        }
                    } else {
                        toastr.error("Contact Number is empty...❌");
                        return;
                    }
                } else {
                    toastr.error("Address is empty...❌");
                    return;
                }
            } else {
                toastr.error("Name is empty...❌");
                return;
            }
        } else {
            toastr.error("Invalid Customer ID...❌");
            return;
        }
    }
})

// delete
$("#delete_customer[type='button']").on("click", () => {
    let cust_id = $("#cust_id").val();
    // remove the item from the db

    const customerData = {
        customer_id : cust_id,
    }

    console.log(customerData);

    //send data to backend

    //create jason object
    const customerJSON = JSON.stringify(customerData);
    console.log(customerJSON);
    sendAjax(customerJSON);

    //send data to backend using AJAX

    function sendAjax(customerJSON) {

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

        http.open("DELETE","http://localhost:8080/pos/customer",true);
        http.setRequestHeader("Content-Type","application/json");
        http.send(customerJSON);
    }

    $("#customer_reset[type='reset']").click();

    // load student data
    loadCustomerData();
})

$("#customer-tbl-body").on("click", "tr", function () {
    row_index = $(this).index();

    console.log(row_index);

    let cust_id = $(this).find(".customer_id").text();
    let name = $(this).find(".name").text();
    let address = $(this).find(".address").text();
    let contact = $(this).find(".contact").text();

    $("#cust_id").val(cust_id);
    $("#name").val(name);
    $("#address").val(address);
    $("#contact").val(contact);

});

loadCustomerData();