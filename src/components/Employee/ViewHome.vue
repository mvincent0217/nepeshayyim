<template>
    <div>
         <!-- Responsive navbar-->
         
        <!-- Page content-->
        <div class="container">
            <br><br>
            <div class="text-center">
                <h3 class="display-5 mb-2 text-center">Goodmorning! Test Name</h3><br><br>
                <label for ="Date">Date of Order Reservation:</label> 
                 <input type="date" id="date" class="col-sm-4 mb-3 mb-m-2 order-md-2 text-md-center" name="date">
            </div>
            <tbody>
                 <!-- Product 1-->
                <tr>
                    <td data-th="Product">
                        <br>
                        <div class="row">
                            <div class="col-md-3 text-left">
                                <img src="https://via.placeholder.com/250x250/5fa9f8/ffffff" alt="" class="img-fluid d-none d-md-block rounded mb-2 shadow ">
                            </div>
                            <div class="col-md-9 text-left mt-sm-2">
                                <h4>Food Name</h4>
                                <p class="font-weight-light">Brand &amp; Name</p>
                                <p data-th="Price">₱50.00</p>
                                <input type="number" class="col-sm-1 mb-3 mb-m-1 order-md-1 text-md-center" value="1"> <br>
                                <button class="btn btn-white border-secondary bg-white btn-md mb-2">Add to cart</button>
                                <button class="btn btn-white border-secondary bg-white btn-md mb-2">Order</button>
                            </div>
                        </div>
                    </td>
                    
                    <td data-th="Quantity">

                    </td>
                    <td class="actions" data-th="">
                        <div class="text-right">
                        </div>
                    </td>
                </tr>
                <!-- Product 1-->
                <br>
                <!-- Product 2-->
                <tr>
                    <td data-th="Product">
                        <div class="row">
                            <div class="col-md-3 text-left">
                                <img src="https://via.placeholder.com/250x250/5fa9f8/ffffff" alt="" class="img-fluid d-none d-md-block rounded mb-2 shadow ">
                            </div>
                            <div class="col-md-9 text-left mt-sm-2">
                                <h4>Food Name</h4>
                                <p class="font-weight-light">Brand &amp; Name</p>
                                <td data-th="Price">₱50.00</td><br>
                                <input type="number" class="col-sm-1 mb-3 mb-m-1 order-md-1 text-md-center" value="1"> <br>
                                <button class="btn btn-white border-secondary bg-white btn-md mb-2">Add to cart</button>
                                <button class="btn btn-white border-secondary bg-white btn-md mb-2">Order</button>
                            </div>
                        </div>
                    </td>
                    
                    <td data-th="Quantity">
                    </td>
                    <td class="actions" data-th="">
                        <div class="text-right">
                        </div>
                    </td>
                </tr>
                 <!-- Product 2-->
                 <br>
                 <!-- Product 3-->
                <tr>
                    <td data-th="Product">
                        <div class="row">
                            <div class="col-md-3 text-left">
                                <img src="https://via.placeholder.com/250x250/5fa9f8/ffffff" alt="" class="img-fluid d-none d-md-block rounded mb-2 shadow ">
                            </div>
                            <div class="col-md-9 text-left mt-sm-2">
                                <h4>Food Name</h4>
                                <p class="font-weight-light">Brand &amp; Name</p>
                                <td data-th="Price">₱50.00</td><br>
                                <input type="number" class="col-sm-1 mb-3 mb-m-1 order-md-1 text-md-center" value="1"> <br>
                                <button class="btn btn-white border-secondary bg-white btn-md mb-2">Add to cart</button>
                                <button class="btn btn-white border-secondary bg-white btn-md mb-2">Order</button>
                            </div>
                        </div>
                        <br><br><br>
                    </td>
                    <td data-th="Quantity">
                    </td>
                    <td class="actions" data-th="">
                        <div class="text-right">
                        </div>
                    </td>
                </tr>
                <!-- Product 3-->
            </tbody>
        </div>
    </div>
</template>

        