const permissionPolicyValues = [
    'accelerometer',
    'ambient-light-sensor',
    'autoplay',
    'battery',
    'camera',
    'cross-origin-isolated',
    'display-capture',
    'document-domain',
    'encrypted-media',
    'execution-while-not-rendered',
    'execution-while-out-of-viewport',
    'fullscreen',
    'geolocation',
    'gyroscope',
    'hid',
    'idle-detection',
    'magnetometer',
    'microphone',
    'midi',
    'navigation-override',
    'payment',
    'picture-in-picture',
    'publickey-credentials-get',
    'screen-wake-lock',
    'serial',
    'sync-xhr',
    'usb',
    'web-share',
    'xr-spatial-tracking',
];

const generatePermissionsPolicy = () => {
    return permissionPolicyValues.map((value) => `${value}=()`).join(', ');
};

module.exports = {
    default: generatePermissionsPolicy,
};
