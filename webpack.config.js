const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    // エントリーポイントの設定
    entry: './js_src/main.js',
    // ビルド後、'./dist/my-bundle.js'というbundleファイルを生成する
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
          {
            // Sass 用のローダー
            //ローダーの処理対象ファイル（拡張子 .scss や .sass のファイル）
            test: /\.s[ac]ss$/i,  //scss だけを対象にする場合は test: /\.scss$/i,
            // ★ .css も対象にする場合は test: /\.(scss|sass|css)$/i, 
            // Sassファイルの読み込みとコンパイル
            use: [
                // CSSファイルを抽出するように MiniCssExtractPlugin のローダーを指定
                {
                    loader: MiniCssExtractPlugin.loader,
                },
                // CSSをバンドルするためのローダー
                {
                    loader: "css-loader",
                    options: {
                        // ソースマップを有効に
                        sourceMap: true,
                        // css-loader の前に適用されるローダーの数を指定
                        importLoaders: 2,
                    },
                },
                // PostCSS
                {
                    loader: "postcss-loader",
                    options: {
                        // PostCSS でもソースマップを有効に
                        sourceMap: true,
                        postcssOptions: {
                            // ベンダープレフィックスを自動付与
                            plugins: ["autoprefixer"],
                        },
                    },
                },
                // Sass をコンパイルするローダー
                {
                    loader: "sass-loader",
                    options: {
                        // dart-sass を優先
                        implementation: require('sass'),
                        sourceMap: true,
                    },
                },
            ],
          },
          {
            //file-loader の対象となるファイルの拡張子
            test: /\.(gif|png|jpe?g|svg|eot|wof|woff|ttf)$/i,
            use: [
              {
                //画像を出力フォルダーにコピーするローダー
                loader: 'file-loader',
                options: {
                  // 画像ファイルの名前とパスの設定
                  name: './images/[name].[ext]'
                }
              }
            ],
          },
        ],
      },
      //プラグインの設定
    plugins: [
        //MiniCssExtractPlugin プラグインのインスタンスを生成
        new MiniCssExtractPlugin({
        //出力される CSS のファイル名を指定
        filename: "style.css",
        }),
    ],
    devtool: "eval-source-map"
};