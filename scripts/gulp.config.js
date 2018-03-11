module.exports = function() {

    return {

        // Path
        path: {
            
            // Dist fodler
            build: {
                files: {
                    html: './build/**/*.html',
                    scripts: './build/assets/scripts/*.js',
                    styles: './build/assets/styles/*.css',
                    watch: './build/**/*.*'
                },
                folders: {
                    images: './build/assets/images',
                    root: './build',
                    scripts: './build/assets/scripts',
                    styles: './build/assets/styles'
                },
                filters: {
                    allCSS: '**/*.css', 
                    allJS: '**/*.js',
                    allHTML: '**/*.html',
                    allJSExceptMinified: ['./build/**/*.js', '!./build/**/*.min.js'],
                    allCSSExceptMinified: ['./build/**/*.css', '!./build/**/*.min.css']
                }
            },
            
            // Source files folder
            src: {
                folders: {
                    hugo: './src/client/hugo'
                },
                files: {
                    html: './src/client/hugo/**/*.html',
                    images: './src/client/assets/images/**/*.*',
                    markdown: './src/client/hugo/**/*.md',
                    sass: './src/client/assets/styles/**/*.scss',
                    scripts: './src/client/assets/scripts/**/*.js',
                    watch: './src/server/'
                }
            },

            // Server
            server: {
                browserSync: {
                    ghostMode: {
                        clicks: true,
                        forms: true,
                        location: false,
                        scroll: true
                    },
                    injectChanges: true,
                    logFilesChanges: true,
                    logLevel: 'error',
                    logPrefix: 'gulp-says',
                    notify: true,
                    port: 8081,
                    proxy: 'localhost:8080',
                    reloadDelay: 100
                },
                
                delayTime: 1,
                port: 8080,
                script: './src/server/server.js',
                watch: ['./src/server/', './scripts']
            },

            // Tools
            tools: {
                bower: {
                    file: '../bower.json',
                    components: './bower_components'
                }
            }
            
        }

    };
};