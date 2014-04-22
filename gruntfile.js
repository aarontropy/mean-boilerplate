'use strict';

module.exports = exports = function(grunt) {
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        assets: grunt.file.readJSON('assets.json'),

        watch: {
            dev: {
                files: ['public/**/*.js', 'assets.json'],
                tasks: ['htmlbuild:dev']
            }
        },
        jshint: {
            all: {
                src: ['server/**/*.js', 'public/**/*.js', '!public/vendor/**', 'gruntfile.js', 'index.js'],
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
        htmlbuild: {
            dev: {
                src: [
                    'server/views/layouts/prebuild/default.html',
                    'server/views/layouts/prebuild/admin.html'
                ],
                dest: 'server/views/layouts/',
                options: {
                    beautify: true,
                    relative: false,
                    scripts: {
                        site: {},
                        adminCore: {
                            cwd: '<%= assets.dev.dest %>',
                            files: '<%= assets.dev.scripts.adminCore %>'
                        },
                        adminApp: {
                            cwd: 'public/',
                            files: 'admin/**/*.js'
                        }
                    },
                    styles: {
                        site: '<%= assets.dev.styles.site %>',
                        admin_vendor: {
                            cwd: '<%= assets.dev.dest %>',
                            files: ['<%= assets.dev.styles.admin %>']
                        },
                        admin: {
                            cwd: 'public/',
                            files: 'css/admin.css'
                        }
                    },
                    sections: {},
                    data: {}
                }
            }
        },
        copy: {
            dev: {
                nonull: true,
                files: [
                    {
                        expand: true,
                        cwd: '<%= assets.dev.cwd %>',
                        dest: '<%= assets.dev.dest %>',
                        src: [
                            '<%= assets.dev.scripts.adminCore %>',
                            '<%= assets.dev.styles.admin %>'
                        ]
                    }
                ]
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-html-build');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-copy');


    grunt.registerTask('default', ['jshint', 'htmlbuild:dev', 'concurrent:dev']);
    grunt.registerTask('build', ['copy:dev']);
    grunt.registerTask('test', 'test functino', function() {
        grunt.log.writeln(grunt.config('assets.dev.cwd'));
        grunt.log.writeln(grunt.config('assets.dev.dest'));
        grunt.log.writeln(grunt.config('assets.dev.scripts.adminCore'));
    });
        
};