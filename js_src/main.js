// importはES6での仕様でブラウザ側で動作する。IEでは使用できない模様。
// requireはcommonJSの仕様で、Node.jsで動く
import bootstrap from 'bootstrap'
import './custom.scss'
var tone = require('./tone');
tone()