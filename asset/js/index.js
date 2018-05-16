/**
 * babel-loader 测试
 */
import './babel.test';

/**
 * shimming globals
 */
import './shimming.test';

/**
 * 其他文件加载测试
 */
import './import-image.test';
import './import-xml.test'

/**
 * CommonsChunkPlugin 抽取测试
 */
import './vendor-1.test';
import './vendor-2.test';

/**
 * 样式表处理测试
 */
import '../style/index.css';
import '../style/other.css';
import '../style/sass.test.scss';
import '../style/image-compress.test.css'
