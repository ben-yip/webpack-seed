console.group('shimming test');

/**
 * lodash is globally imported as _, which is supported via ProvidePlugin
 */
console.log('Shimming test: ' + _.join(['Message', 'joined', 'via', 'lodash.join()'], ' '));

/**
 * jQuery is globally imported as $, which is supported via ProvidePlugin
 */
console.log('Shimming test: ' + 'jQuery version ' + $.fn.jquery);


console.groupEnd();