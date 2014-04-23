'use strict';

module.exports = exports = function(grunt) {
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        assets: grunt.file.readJSON('server/config/assets.json'),

        watch: {
            dev: {
        },
        jshint: {
            all: {
                src: ['server/**/*.js', 'public/**/*.js', '!public/lib/**', '!public/build/**', 'gruntfile.js', 'index.js'],
                options: {
                    jshintrc: 'jshintrc.json'
                }
            }
        },
        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            dev: {
                tasks: ['nodemon:dev', 'watch:dev']
            }
        },
        nodemon: {
            dev: {
                script: 'index.js',
                options: {
                    args: [],
                    ignore: ['public/**'],
                    ext: 'js,html',
                    nodeArgs: ['--debug'],
                    delay: 1000,
                    env: {
                        PORT: 3000
                    },
                    cwd: __dirname
                }
            }
        },
        copy: {
            dev: {
            }
        },
        uglify: {
            production: {
                options: {
                    mangle: true,
                    compress: true
                },
                files: '<%= assets.admin_app %>'
            }
        },
        cssmin: {
            combine: {
                files: ['<%= assets.site_style %>', '<%= assets.admin_style %>']
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');


    grunt.registerTask('default', ['jshint',  'concurrent:dev']);
    grunt.registerTask('build', ['cssmin', 'uglify']);
    grunt.registerTask('test', 'test functino', function() {
        grunt.log.writeln(grunt.config('assets.dev.cwd'));
        grunt.log.writeln(grunt.config('assets.dev.dest'));
        grunt.log.writeln(grunt.config('assets.dev.scripts.adminCore'));
    });
        
    /***
    To install TinyMCE:
    1. Install Node.js
    2. Open a console and go to the project directory
    3. Write "npm i -g jake" to install the jake tool globally.
    4. Write "npm i" to install all package dependencies
    4. Build TinyMCE by writing "jake"
    ***/

    /***
    To install 
    1. Go to the project directory
    2. npm install
    3. grunt build or
    4. something like grunt build:modal:tabs:alert:popover:dropdownToggle:buttons:progressbar
    ***/
};