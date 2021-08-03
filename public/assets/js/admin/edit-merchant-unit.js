$(document).ready(function () {
    


    function disableSubmitButton() {
        $("#js-btn-submit").attr("disabled", true);
    }

    function enableSubmitButton() {
        $("#js-btn-submit").removeAttr("disabled");
    }

    $("#js-btn-submit-merchant-unit").on("click", function () {
        $("#js-edit-merchant-unit-form").submit();
    });

    $("#js-edit-merchant-unit-form").validate({
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
            taluk: {
                required: true,
            },
            local_body: {
                required: true,
            },
            name: {
                required: true,
                remote: {
                    url: CHECK_MERCHANT_UNIQUE_URL,
                    type: "post",
                    data: {
                        name: function() { return $('#js-local-name').val(); },
                        local_body: function() { return $('#js-merchant-unit-edit-local-body').val(); },
                    },
                },
            },
        },
        messages: {
            taluk: {},
        },
        submitHandler: function (form) {
            var formData = $("#js-edit-merchant-unit-form").serialize();

            $.ajax({
                type: "POST",
                data: formData,
                success: function (res) {
                    if (res.status) {
                        window.location = MERCHANT_UNIT_LISTING_PAGE;
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
