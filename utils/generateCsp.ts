enum Directives {
    ChildSrc = 'child-src',
    ConnectSrc = 'connect-src',
    DefaultSrc = 'default-src',
    FontSrc = 'font-src',
    FrameSrc = 'frame-src',
    ImgSrc = 'img-src',
    ManifestSrc = 'manifest-src',
    MediaSrc = 'media-src',
    ObjectSrc = 'object-src',
    PrefetchSrc = 'prefetch-src',
    ScriptSrc = 'script-src',
    ScriptSrcElem = 'script-src-elem',
    ScriptSrcAttr = 'script-src-attr',
    StyleSrc = 'style-src',
    StyleSrcElem = 'style-src-elem',
    StyleSrcAttr = 'style-src-attr',
    WorkerSrc = 'worker-src',
    BaseUri = 'base-uri',
    PluginTypes = 'plugin-types',
    Sandbox = 'sandbox',
    FormAction = 'form-action',
    FrameAncestors = 'frame-ancestors',
    NavigateTo = 'navigate-to',
    ReportUri = 'report-uri',
    ReportTo = 'report-to',
    BlockAllMixedContent = 'block-all-mixed-content',
    Referrer = 'referrer',
    RequireSriFor = 'require-sri-for',
    RequireTrustedTypesFor = 'require-trusted-types-for',
    TrustedTypes = 'trusted-types',
    UpgradeInsecureRequests = 'upgrade-insecure-requests',
}

enum Policies {
    Self = `'self'`,
    UnsafeEval = `'unsafe-eval'`,
    None = `'none'`,
    UnsafeInline = `'unsafe-inline'`,
}

type Directive = Directives;
type Value = string;
interface Options {
    devOnly?: boolean;
}

const generateCSP = () => {
    const policy: Partial<Record<Directive, Value[]>> = {};

    const addPolicy = (directive: Directive, value: Value, options: Options = {}) => {
        if (options.devOnly && process.env.NODE_ENV !== 'development') return;

        const currentPolicy = policy[directive];
        policy[directive] = currentPolicy ? [...currentPolicy, value] : [value];
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
        .map(([key, value]) => `${key} ${value.join(' ')}`)
        .join('; ');
};

export default generateCSP;
