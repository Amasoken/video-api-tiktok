"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var Directives;
(function (Directives) {
    Directives["ChildSrc"] = "child-src";
    Directives["ConnectSrc"] = "connect-src";
    Directives["DefaultSrc"] = "default-src";
    Directives["FontSrc"] = "font-src";
    Directives["FrameSrc"] = "frame-src";
    Directives["ImgSrc"] = "img-src";
    Directives["ManifestSrc"] = "manifest-src";
    Directives["MediaSrc"] = "media-src";
    Directives["ObjectSrc"] = "object-src";
    Directives["PrefetchSrc"] = "prefetch-src";
    Directives["ScriptSrc"] = "script-src";
    Directives["ScriptSrcElem"] = "script-src-elem";
    Directives["ScriptSrcAttr"] = "script-src-attr";
    Directives["StyleSrc"] = "style-src";
    Directives["StyleSrcElem"] = "style-src-elem";
    Directives["StyleSrcAttr"] = "style-src-attr";
    Directives["WorkerSrc"] = "worker-src";
    Directives["BaseUri"] = "base-uri";
    Directives["PluginTypes"] = "plugin-types";
    Directives["Sandbox"] = "sandbox";
    Directives["FormAction"] = "form-action";
    Directives["FrameAncestors"] = "frame-ancestors";
    Directives["NavigateTo"] = "navigate-to";
    Directives["ReportUri"] = "report-uri";
    Directives["ReportTo"] = "report-to";
    Directives["BlockAllMixedContent"] = "block-all-mixed-content";
    Directives["Referrer"] = "referrer";
    Directives["RequireSriFor"] = "require-sri-for";
    Directives["RequireTrustedTypesFor"] = "require-trusted-types-for";
    Directives["TrustedTypes"] = "trusted-types";
    Directives["UpgradeInsecureRequests"] = "upgrade-insecure-requests";
})(Directives || (Directives = {}));
var Policies;
(function (Policies) {
    Policies["Self"] = "'self'";
    Policies["UnsafeEval"] = "'unsafe-eval'";
    Policies["None"] = "'none'";
    Policies["UnsafeInline"] = "'unsafe-inline'";
})(Policies || (Policies = {}));
var generateCSP = function () {
    var policy = {};
    var addPolicy = function (directive, value, options) {
        if (options === void 0) { options = {}; }
        if (options.devOnly && process.env.NODE_ENV !== 'development')
            return;
        var currentPolicy = policy[directive];
        policy[directive] = currentPolicy ? __spreadArray(__spreadArray([], currentPolicy, true), [value], false) : [value];
    };
    addPolicy(Directives.DefaultSrc, Policies.None);
    addPolicy(Directives.ScriptSrcElem, Policies.Self);
    addPolicy(Directives.ScriptSrc, Policies.UnsafeEval, { devOnly: true });
    addPolicy(Directives.ConnectSrc, Policies.Self, { devOnly: true });
    addPolicy(Directives.FrameAncestors, Policies.None);
    addPolicy(Directives.BaseUri, Policies.None);
    addPolicy(Directives.FormAction, Policies.Self);
    addPolicy(Directives.StyleSrcElem, Policies.Self);
    addPolicy(Directives.StyleSrcElem, Policies.UnsafeInline, { devOnly: true });
    addPolicy(Directives.StyleSrc, Policies.UnsafeInline);
    addPolicy(Directives.ImgSrc, Policies.Self);
    addPolicy(Directives.ConnectSrc, Policies.Self);
    addPolicy(Directives.ConnectSrc, 'vitals.vercel-insights.com');
    addPolicy(Directives.FontSrc, Policies.Self);
    return Object.entries(policy)
        .map(function (_a) {
        var key = _a[0], value = _a[1];
        return "".concat(key, " ").concat(value.join(' '));
    })
        .join('; ');
};
exports["default"] = generateCSP;
