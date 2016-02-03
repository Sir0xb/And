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
        "marked"                : "lib/marked/marked.min",
        "highlight"             : "lib/highlight/highlight",

        "ko-textcut"            : "ko-path/koTextcutHandler",
        "ko-hover"              : "ko-path/koHoverHandler",
        "ko-onecSubscribe"      : "ko-path/onecSubscribe",
        "ko-beforeSubscribe"    : "ko-path/beforeSubscribe",
        "ko-onecBeforeSubscribe": "ko-path/onecBeforeSubscribe",

        "Super"                 : "define_tools/Super",
        "Tools"                 : "define_tools/Tools"
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
        }
    },
    map: {
        "*": {
            "css"   : "lib/require-css/css.js",
            "json"  : "lib/requirejs-plugins/src/json"
        }
    }
});
