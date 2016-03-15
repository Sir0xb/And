require.config({
    baseUrl: "/",
    paths  : {
        "jquery"                : "lib/jquery-1.9.1/jquery.min",
        "knockout"              : "lib/knockout/knockout.debug",
        "ko-mapping"            : "lib/knockout.mapping/knockout-mapping",
        "ko-amd"                : "lib/knockout-amd-helpers/knockout-amd-helpers.min",
        "ko-switch"             : "lib/knockout-switch-case/knockout-switch-case.min",
        "ko-validation"         : "lib/knockout-validation/dist/knockout.validation.min",
        "semantic"              : "lib/semantic-ui/dist/semantic.min",
        "sammy"                 : "lib/sammy/sammy",
        "text"                  : "lib/text/text",
        "webuploader"           : "lib/webuploader/webuploader.min",
        "uploader"              : "lib/YQuploader-1.0/YQuploader",
        "uploader_skin"         : "lib/YQuploader-1.0/skins/default/tpl",
        "marked"                : "lib/marked/marked.min",
        "hljs"                  : "lib/highlight/highlight.min",
        "sweetalert"            : "lib/sweetalert/sweetalert.min",

        "ko-textcut"            : "ko-path/koTextcutHandler",
        "ko-hover"              : "ko-path/koHoverHandler",
        "ko-onecSubscribe"      : "ko-path/onecSubscribe",
        "ko-beforeSubscribe"    : "ko-path/beforeSubscribe",
        "ko-onecBeforeSubscribe": "ko-path/onecBeforeSubscribe",

        "Super"                 : "define_tools/Super",
        "Tools"                 : "define_tools/Tools",

        "css_monokai"           : "lib/highlight/styles/monokai-sublime"
    },
    shim   : {
        "jquery": {
            exports: "jquery"
        },
        "sammy" : {
            deps: ["jquery"]
        },
        "semantic" : {
            deps: ["jquery"]
        },
        "hljs": {
            deps: ["css!css_monokai"]
        },
        "sweetalert": {
            deps: ["css!lib/sweetalert/sweetalert.css"]
        },
        "uploader": {
            deps: ["css!lib/YQuploader-1.0/skins/default/style"]
        }
    },
    map: {
        "*": {
            "css"   : "lib/require-css/css.js",
            "json"  : "lib/requirejs-plugins/src/json"
        }
    }
});
