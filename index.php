<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" href="css/flag-icon.min.css">
        <link rel="stylesheet" href="css/font-awesome.min.css">
        <link rel="stylesheet" href="css/flexslider.css">
        <link rel="stylesheet" href="css/animate.css">
        <link rel="stylesheet" href="css/ss-icons.css">
        <link rel="stylesheet" href="css/ssSocial.css">
        <link rel="stylesheet" href="css/style.css">

        <title></title>
    </head>
    <body>
        <nav class="navbar navbar-default" role="navigation">
            <div class="container">
                <div class="header_rates">
                    <ul class="rates">
                        <li class="rates_item">
                            <p class="rates_amount">1120.51</p>
                            <p class="rates_currencies">BTC/USD</p>
                        </li>
                        <li class="rates_item">
                            <p class="rates_amount">1064.35</p>
                            <p class="rates_currencies">BTC/EUR</p>
                        </li>
                        <li class="rates_item">
                            <p class="rates_amount">908.45</p>
                            <p class="rates_currencies">BTC/GBP</p>
                        </li>
                        <li class="rates_item">
                            <p class="rates_amount">7820.9</p>
                            <p class="rates_currencies">BTC/CNY</p>
                        </li>
                    </ul>
                </div>
                <!--                <div class="social-icons">
                                    <a id="twitter" target="_blank" href="#"><i class="fa fa-twitter-square fa-lg"></i></a>
                                    <a id="facebook" target="_blank" href="#"><i class="fa fa-facebook-square fa-lg"></i></a>
                                </div>-->
                <!-- Brand and toggle get grouped for better mobile display -->
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" ui-sref="form.coins" href="#/coins"><img src="https://shapeshift.io/logo.png" width="210"></a>
                </div>

                <!-- Collect the nav links, forms, and other content for toggling -->
                <div class="navbar-collapse collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav navbar-right">
                        <li><a href="https://info.shapeshift.io/about" class="ng-binding">Home</a></li>
                        <li><a href="https://info.shapeshift.io/about" class="ng-binding">Exchange</a></li>
                        <li><a href="https://info.shapeshift.io/about" class="ng-binding">Sell</a></li>
                        <li><a href="https://info.shapeshift.io/about" class="ng-binding">Convert</a></li>
                        <li><a href="https://info.shapeshift.io/about" class="ng-binding">Fees</a></li>
                        <li><a href="https://info.shapeshift.io/about" class="ng-binding">Contact</a></li>
                        <li><a href="https://info.shapeshift.io/about" class="ng-binding">About</a></li>				
                    </ul>
                </div><!-- /.navbar-collapse -->
            </div><!-- /.container-fluid -->
        </nav>
        <section id="exchange">
            <div class="container coin-select">
                <div class="main row">
                    <div id="featured" class="col-md-8">
                        <div class="flexslider">
                            <ul class="slides">
                                <li><img src="images/flexie.png" />
                                    <p class="flex-caption">First Image</p>
                                    <p class="flex-caption-notes">Some notes goes in here and many more</p>
                                    <p class="flex-caption-image"><img src="images/similar1.jpg" /></p>
                                </li>
                                <li><img src="images/flexie.png" />
                                    <p class="flex-caption">Second Image</p>
                                    <p class="flex-caption-notes">Some notes goes in here and many more</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-4">
                    <form id="signup-form" name="shiftForm" class="animation form.coins" novalidate="">
                        <div class="form-container">

                            <!-- uiView:  --><div id="form-views" ui-view="" class="ng-scope"><h4 class="inputs-header ng-binding ng-scope">Choose Which Coins to Trade</h4>
                                <div class="coin-selection clearfix row form-group ng-scope" ng-controller="coinSelect">
                                    <div class="col-md-6">
                                        <label class="ng-binding">Deposit</label>
                                        <div class="input-coin">
                                            <button ng-click="open('input')"><span class="selected-coin"><img src="https://shapeshift.io/images/coins/bitshares.png"> <h4><span class="notranslate ng-binding">Bitshares</span></h4></span></button>
                                        </div>
                                    </div>
                                    <div class="switch-button"><button class="no-btn" ng-click="switch ()"><span class="glyphicon glyphicon-transfer"></span></button></div>
                                    <div class="col-md-6">
                                        <label class="ng-binding">Receive</label>
                                        <div class="output-coin">
                                            <button ng-click="open('output')"><span class="selected-coin"><img src="https://shapeshift.io/images/coins/rep.png"> <h4><span class="notranslate ng-binding">Augur</span></h4></span></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-footer">
                                    <span ng-if="!checkZcashCondition()" class="ng-scope">
                                        <a href="#" class="btn btn-default submit btn-lg">Continue</a>
                                    </span>

                                </div>
                            </div>
                        </div>

                    </form>
                    </div>
                </div>
            </div>
        </section>
        <section>
            <div class="container main">
                <div class="row">
                    <div class="col-md-8">
                        <h1 >Your Discount Instant Digital E-Currency Exchange Provider</h1>
                        <p>
                            Welcome to GoldXCash, the internet's first independent digital currency exchange provider, serving the digital currency needs of thousands of clients. GoldXCash is a company you can trust to look after all your needs.
Our fees are the lowest on the net, and our customer service is outstanding. GoldXCash.net is a Reliable Exchange Provider.
                        </p>
                        <p class="large"> We offer fastest and reliable Instant e-currency exchange service.
                            We support exchanging from Bitcoin to PayPal, PayPal to Bitcoin, Bitcoin to Perfect Money, Perfect Money to Bitcoin, 
                            Bitcoin to Western Union, EgoPay, Okpay, Bank Wire, International Wire (SWIFT), SEPA (EU) bank transfer, Cashier's Check, Money Order, Cash by mail, Western Union, Money Gram, Skrill, Ukash, Neteller, QIWI, WebMoney, Pingit, Chase Quickpay, PayPal My Cash, Vanilla, MoneyPak, Gift Card Code, more options will come soon.</p>
                    </div>
                    <div class="col-md-4">
                        <div class="flexslider side-list">
                            <ul class="slides">
                                <li><a href="#" class="thumbnail">
                                        <img src="images/advert/1.jpg" alt="..." />
                                    </a>
                                </li>
                                <li><a href="#" class="thumbnail">
                                        <img src="images/advert/2.jpg" alt="..." />
                                    </a>
                                </li>
                                <li><a href="#" class="thumbnail">
                                        <img src="images/advert/3.jpg" alt="..." />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <footer class="clearfix">
            <div class="container">
                <div class="verifier">
                    <row>
                        <div class="col-md-2">
                            <p class=""><img src="images/verifier/1.jpg" alt="..." /></p>
                        </div>
                        <div class="col-md-2">
                            <p class=""><img src="images/verifier/2.png" alt="..." /></p>
                        </div>
                        <div class="col-md-2">
                            <p class=""><img src="images/verifier/3.png" alt="..." /></p>
                        </div>
                        <div class="col-md-2">
                            <p class=""><img src="images/verifier/4.png" alt="..." /></p>
                        </div>
                        <div class="col-md-2">
                            <p class=""><img src="images/verifier/5.png" alt="..." /></p>
                        </div>
                        <div class="col-md-2">
                            <p class=""><img src="images/verifier/6.jpg" alt="..." /></p>
                        </div>
                    </row>
                </div>
            </div>
        </footer>

        <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
        <script src="https://code.jquery.com/jquery.js"></script>
        <!-- Include all compiled plugins (below), or include individual files as needed -->
        <script src="js/bootstrap.min.js"></script>
        <script src="js/jquery.flexslider-min.js"></script>
        <script>
            $(document).ready(function() {
                $('.flexslider').flexslider({
                    animation: "slide",
                    before: function(slider){
                        $(slider).find(".flex-active-slide").find('.flex-caption, .flex-caption-notes, .flex-caption-image').hide().each(function(){
                            $(this).removeClass("animated rubberBand fadeInDown flipInX");
                        });
                   },
                    after: function(slider){
                        $(slider).find(".flex-active-slide").find('.flex-caption-notes').show().addClass("animated fadeInDown");
                        $(slider).find(".flex-active-slide").find('.flex-caption-image').show().addClass("animated flipInX");
                        $(slider).find(".flex-active-slide").find('.flex-caption').show().addClass("animated rubberBand");
                    },
                });
                $('.side-list.flexslider').flexslider({
                    animation: "slide",
                    controlNav: false,
                    directionNav: false,
                });
                $('.side-list.flexslider > .flex-control-nav').hide();
                $('.side-list.flexslider > .flex-direction-nav').hide();
            });
        </script>
    </body>
</html>
