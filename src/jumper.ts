/* QOX Corporation
 Jumper.js
 https://github.com/QOXCorp/jumper.js
 0.0.4
 (C) 2017 - Giancarlo Chiappe Aguilar <gchiappe@qox-corp.com>
 */

///<reference path="jumper.d.ts"/>
///<reference path="bootstrap-dialog.d.ts"/>

Jumper = (options: JumperOptions) => {
    if (typeof options == 'undefined') {
        console.error('QOX Jumper options not stablished.');
    }
    if (typeof options.debug == 'undefined') {
        Jumper.Options.debug = false
    } else {
        Jumper.Options.debug = options.debug;
    }
    Jumper.Log('Initilizing QOX Jumper.')
    if (typeof options.bindFnKeys != 'undefined') {
        Jumper.Options.bindFnKeys = options.bindFnKeys
    }
    if (typeof options.bindLetter == 'undefined') {
        options.bindLetter = 'J'
    }
    if (typeof options.cache != 'undefined') {
        Jumper.Cache = options.cache
    }
    if (typeof options.data != 'undefined') {
        Jumper.Options.data = options.data
    } else {
        if (typeof options.ajax == 'undefined') {
            console.error('QOX Jumper: No data source defined.')
        } else {
            Jumper.Options.ajax = true
            Jumper.Options.ajaxserver = options.ajaxserver
        }
    }
    if (typeof jQuery == 'undefined') {
        console.error('QOX Jumper requires jQuery.')
        return;
    }
    if (typeof $().selectize == 'undefined') {
        console.error('QOX Jumper requires Selectize.js (https://github.com/brianreavis/selectize.js).')
        return;
    }
    if ((typeof $().emulateTransitionEnd == 'function')) {
        if (typeof BootstrapDialog === 'undefined') {
            console.error('QOX Jumper for Bootstrap requires Bootstrap-Dialog (https://github.com/nakupanda/bootstrap3-dialog).')
            return;
        } else {
            Jumper.Bootstrap3 = true;
        }
    }
    Jumper.Options.bindLetter = options.bindLetter.toLowerCase();
    Jumper.Options.cacheAtInit = true;
    $(window).on('keydown', Jumper.ProcessKey);
    var showKeys = 'CONTROL/COMMAND';
    if (Jumper.Options.bindFnKeys != Jumper.KeysControl) showKeys = Jumper.Options.bindFnKeys;
    Jumper.Log('QOX Jumper: Initialized. (Open with: ' + showKeys + ' + ' + Jumper.Options.bindLetter.toUpperCase() + ')');
    if (Jumper.Options.ajax && Jumper.Cache && Jumper.Options.cacheAtInit) {
        Jumper.Log('QOX Jumper: PreCaching results @ Init...');
        $.post(Jumper.Options.ajaxserver, { 'jumper_version': Jumper.VERSION }, function (data) {
            Jumper.Options.data = data.response;
            Jumper.InCache = true;
            Jumper.Log('QOX Jumper: PreCaching results...DONE');
        }, 'json');
    }
    Jumper.Initialized = true;
}

Jumper.ProcessKey = function (event) {
    if (eval(Jumper.Options.bindFnKeys)) {
        Jumper.Log(String.fromCharCode(event.which).toLowerCase());
        switch (String.fromCharCode(event.which).toLowerCase()) {
            case Jumper.Options.bindLetter:
                event.preventDefault();
                Jumper.Open();
                break;
        }
    }
}

Jumper.Rebind = function () {
    $(window).on('keydown', Jumper.ProcessKey);
}

Jumper.Unbind = function () {
    $(window).off('keydown', Jumper.ProcessKey);
}

Jumper.UpdateBSD = function (setHtml) {
    if (!(typeof setHtml != 'undefined' && setHtml)) {
        var html =
            '<input class="selectize-input items not-full has-options" id="jumper_text" style="width:100%" type="text" autocomplete="off" placeholder="' + Jumper.TEXT_QuickNav +
            '">';
        Jumper.BSD_Object.setMessage(html);
    }
    var jt = $("#jumper_text");
    jt.focus();
    jt.removeClass('selectize-input items not-full has-options');
    var $select = jt.selectize({
        persist: false,
        maxItems: 1,
        valueField: 'name',
        labelField: 'name',
        searchField: ['name', 'help', 'keywords', 'navcode'],
        options: Jumper.Options.data,
        render: {
            item: function (item: JumperData, escape) {
                $("#jumper_text").attr('disabled', 'disabled');
                if (item.action.useItemHandler) {
                    Jumper.ItemHandler(item)
                }
                if (typeof item.action.url != 'undefined') {
                    if (item.action.url != null) {
                        if (item.action.url.length > 0) {
                            window.location.href = item.action.url;
                        }
                    }
                }
                if (typeof item.action.method != 'undefined') {
                    if (item.action.method != null) {
                        item.action.method(item)
                    }
                }
                setTimeout(function () {
                    Jumper.BSD_Object.close();
                }, 250);
                return '<div style="color: #000">' +
                    escape(Jumper.TEXT_Navigating) + '</span>' +
                    '</div>';
            },
            option: function (item, escape) {
                var label = item.name;
                var caption = item.help;
                return '<div style="color: #000">' +
                    '<span style="font-width:bold;">' +
                    escape(label) +
                    '</span><br>' +
                    '<span class="text-muted">' +
                    escape(caption) +
                    '</span><br>' +

                    (item.keywords ? '<span style="color: #000;">' + Jumper.TEXT_Keywords + '</span>' +
                        '&nbsp;<span class="text-muted">' + escape(item.keywords) + '</span>' : '')

                    + '</div>';
            }
        },
        load: function (query, callback) {
            if (!query.length) return callback();
        }
    });
    var selectize = $select[0].selectize;
    setTimeout(function () {
        selectize.focus();
    }, 50);
};

Jumper.Open = function () {
    if (Jumper.Initialized) {
        if (Jumper.Bootstrap3) {
            if (!Jumper.BSD_Open) {
                Jumper.Log('Triggered!')
                var Modal: IBootstrapDialogOptions = {
                    title: Jumper.TEXT_DefaultTitle,
                    draggable: false,
                    closable: true,
                    closeByBackdrop: true,
                    closeByKeyboard: true,
                    onhide: function () {
                        Jumper.BSD_Open = false;
                    },
                    onhidden: function () {
                        Jumper.BSD_Open = false;
                    },
                    onshow: function () {
                        Jumper.BSD_Open = true;
                        $('.modal-footer').remove();
                    }
                };
                if (Jumper.Options.ajax && !Jumper.InCache) {
                    Modal.message = `<div style="text-align: center;">
                    <p>
                    <i class="fa fa-refresh fa-spin"></i><br>
                    ${Jumper.TEXT_Loading}
                    </p>
                    </div>`
                    Modal.onshown = function () {
                        Jumper.Log('QOX Jumper: Getting data.');
                        $.post(Jumper.Options.ajaxserver, { 'jumper_version': Jumper.VERSION }, function (data) {
                            Jumper.Options.data = data.response;
                            if (Jumper.Cache) {
                                Jumper.InCache = true;
                            }
                            Jumper.UpdateBSD(false);
                        }, 'json');
                    };
                } else {
                    if (Jumper.Cache) {
                        console.log('QOX Jumper: Using Cached data.');
                    }
                    Modal.message = '<input class="selectize-input items not-full has-options" style="width:100%" id="jumper_text" type="text" autocomplete="off" placeholder="' + Jumper.TEXT_QuickNav +
                        '">';
                    Modal.onshown = function () {
                        Jumper.UpdateBSD(true);
                    };
                }
                Jumper.BSD_Object = BootstrapDialog.show(Modal);
            }
        } else {
            console.error('Support for non-bootstrap sites in the future. Sorry.');
        }
    }
}
Jumper.Log = function () {
    if (Jumper.Options.debug) {
        console.log.apply(console, arguments)
    }
}
Jumper.ItemHandler = (item) => {
    Jumper.Log('Default Item Handler, Item:', item)
}

Jumper.VERSION = '0.0.4'

Jumper.Initialized = false
Jumper.Bootstrap3 = false
Jumper.Options = {
    bindFnKeys: 'event.ctrlKey || event.metaKey',
    bindLetter: 'J',
    data: null,
    ajax: false,
    ajaxserver: '',
    cacheAtInit: false,
    debug: false
}
Jumper.BSD_Object = null

Jumper.Cache = false
Jumper.InCache = false

Jumper.TEXT_Loading = 'Loading data, please wait...';
Jumper.TEXT_DefaultTitle = '<b>Jumper</b>';
Jumper.TEXT_QuickNav = 'Quick site navigation, type a term.';
Jumper.TEXT_Navigating = 'Navigating...';
Jumper.TEXT_Keywords = 'Keywords:';

Jumper.BSD_Open = false;
Jumper.BSD_AjaxLoader = {};