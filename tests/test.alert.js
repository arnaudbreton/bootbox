describe("#alert", function() {
    var box;

    before(function() {
        bootbox.animate(false);
    });

    after(function() {
        $(".bootbox")
        .modal('hide')
        .remove();
    });

    describe("with one argument", function() {
        before(function() {
            box = bootbox.alert("Hello world!");
        });

        it("shows the expected body copy", function() {
            assert.equal(box.find(".modal-body").text(), "Hello world!");
        });

        it("shows an OK button", function() {
            assert.equal(box.find("a:first").text(), "OK");
        });

        it("has focus on the OK button", function() {
            assert.isTrue(box.find("a:first").is(":focus"));
        });

        it("applies the primary class to the button", function() {
            assert.isTrue(box.find("a:first").hasClass("btn-primary"));
        });
    });

    describe("with two arguments", function() {
        describe("where the second argument is a string", function() {
            before(function() {
                box = bootbox.alert("Hello world!", "Foo");
            });

            it("shows the expected body copy", function() {
                assert.equal(box.find(".modal-body").html(), "Hello world!");
            });

            it("shows the correct label text", function() {
                assert.equal(box.find("a:first").text(), "Foo");
            });
        });

        describe("where the second argument is a function", function() {
            before(function() {
                box = bootbox.alert("Hello world!", function() { });
            });

            it("shows the default label text", function() {
                assert.equal(box.find("a:first").text(), "OK");
            });
        });
    });

    describe("with three arguments", function() {
        before(function() {
            box = bootbox.alert("Foo", "Bar", function() {});
        });

        it("shows the expected body copy", function() {
            assert.equal(box.find(".modal-body").text(), "Foo");
        });

        it("shows the correct label text", function() {
            assert.equal(box.find("a:first").text(), "Bar");
        });
    });

    describe("with four arguments", function() {
        it("throws an error", function() {
            assert.throws(function() {
                bootbox.alert(1, 2, 3, 4);
            });
        });
    });

    describe("with a callback", function() {
        describe("when dismissing the dialog by clicking OK", function() {
            var result;
            before(function() {
                box = bootbox.alert("Hi", function() {
                    result = true;
                });
            });

            it("should invoke the callback", function() {
                box.find("a:first").trigger('click');
                assert.isTrue(result);
            });

            it("should close the dialog", function() {
                assert.isTrue(box.is(":hidden"));
            });
        });

        describe("when dismissing the dialog by pressing escape", function() {
            var result;
            before(function() {
                box = bootbox.alert("Hi", function() {
                    result = true;
                });
            });

            it("should invoke the callback", function() {
                // if we do this in the "before", it will dismiss
                // all the dialogs before their it() methods run. e.g.
                // _all_ before() run before all it()
                var e = jQuery.Event("keyup.modal", {which: 27});
                $(document).trigger(e);

                assert.isTrue(result);
            });

            it("should close the dialog", function() {
                assert.isTrue(box.is(":hidden"));
            });
        });
    });
});
