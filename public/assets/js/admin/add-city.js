$(document).ready(function () {
    $("#js-country").on("change", function () {
        var countryId = this.value;
        disableSubmitButton();
        fetchStates(countryId);
    });

    $("#js-state").on("change", function () {
        var stateId = this.value;
        disableSubmitButton();
        fetchDistricts(stateId);
    });

    $("#js-district").on("change", function () {
        // alert('taluk');
        var district = this.value;
        disableSubmitButton();
        fetchTaluk(district);
    });

    function fetchTaluk(district) {
        $.ajax({
            url: BASE_URL + "/admin/location/taluk/get-all/" + district,
            type: "GET",
            success: function (res) {
                var taluk = res.taluk;
                var html = "<option value=''> Select </option>";

                $.each(taluk, function (ind, item) {
                    html +=
                        "<option value='" +
                        item._id +
                        "'> " +
                        item.name +
                        "</option>";
                });

                $("#js-taluk").html(html);
                enableSubmitButton();
            },
        });
    }


    function fetchStates(countryId) {
        $.ajax({
            url: BASE_URL + "/admin/location/state/get-all/" + countryId,
            type: "GET",
            success: function (res) {
                var states = res.states;
                var html = "<option value=''> Select </option>";

                $.each(states, function (ind, item) {
                    html +=
                        "<option value='" +
                        item._id +
                        "'> " +
                        item.name +
                        "</option>";
                });

                $("#js-state").html(html);
                enableSubmitButton();
            },
        });
    }

    function fetchDistricts(stateId) {
        $.ajax({
            url: BASE_URL + "/admin/location/district/get-all/" + stateId,
            type: "GET",
            success: function (res) {
                var district = res.district;
                var html = "<option value=''> Select </option>";

                $.each(district, function (ind, item) {
                    html +=
                        "<option value='" +
                        item._id +
                        "'> " +
                        item.name +
                        "</option>";
                });

                $("#js-district").html(html);
                enableSubmitButton();
            },
        });
    }

    function disableSubmitButton() {
        $("#js-btn-submit").attr("disabled", true);
    }

    function enableSubmitButton() {
        $("#js-btn-submit").removeAttr("disabled");
    }

    $("#js-btn-submit").on("click", function () {
        $("#js-add-city-form").submit();
    });

    $("#js-add-city-form").validate({
        rules: {
            country: {
                required: true,
            },
            state: {
                required: true,
            },
            district: {
                required: true,
            },
            city: {
                required: true,
                alpha: true,
                remote: {
                    url: CHECK_CITY_UNIQUE_URL,
                    data: {
                        city: $("#js-city").val(),
                        district: $("#js-district").val(),
                    },
                },
            },
        },
        messages: {
            city: {},
        },
        submitHandler: function (form) {
            var formData = $("#js-add-city-form").serialize();

            $.ajax({
                type: "POST",
                data: formData,
                success: function (res) {
                    if (res.status) {
                        window.location = CITY_LISTING_PAGE;
                    }
                },
                error: function (error) {
                    enableSubmitButton();
                    if ("errors" in error.responseJSON) {
                        $.each(
                            error.responseJSON.errors,
                            function (key, value) {
                                $('[name="' + key + '"]')
                                    .removeClass("is-valid")
                                    .addClass("is-invalid");
                                $('[name="' + key + '"]')
                                    .parents(".form-group")
                                    .find("span.invalid-feedback")
                                    .html(value)
                                    .attr("style", "display:block");
                            }
                        );
                    } else {
                        var responseJson = error.responseJSON;
                        var msg = responseJson.msg;
                        $("#js-common-alert").html(
                            '<div class="alert alert-danger">' + msg + "</div>"
                        );
                    }
                },
            });
        },
    });
});
