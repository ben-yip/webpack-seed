/**
 * babel-loader 测试
 */
import './babel.test';

/**
 * 其他文件加载测试
 */
import './import-image.test';
import './import-xml.test'

/**
 * 共用代码提取测试 （CommonsChunkPlugin）
 */
import './common.test';

/**
 * todo vendor 独立抽取测试
 */
// import './vendor-1.test';
// import './vendor-2.test';


/**
 * 样式表处理测试
 */
import '../style/main.css';
import '../style/other.css';
import '../style/sass.test.scss';
import '../style/image-compress.test.css'

/**
 * HMR test
 */
// import printMe from './print';
// if (module.hot) {
//     module.hot.accept('./print.js', function () {
//         console.log('Accepting the updated printMe module!');
//         printMe();
//     });
// }