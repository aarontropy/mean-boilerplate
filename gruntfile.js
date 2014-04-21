'use strict';

module.exports = exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		assets: grunt.file.readJSON('assets.json'),

		watch: {
            dev: {
                files: ['public/**/*.js', 'public/lib/**/*.js', 'assets.json'],
                tasks: ['htmlbuild']
            }
        },
        jshint: {
            all: {
                src: ['server/**/*.js', 'public/**/*.js', 'gruntfile.js', 'index.js'],
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
        		src: 'server/views/layouts/default.prebuild.html',
        		dest: 'server/views/layouts/default.html',
        		options: {
        			beautify: true,
        			scripts: {
                        site: {},
                        adminCore: '<%= assets.dev.scripts.adminCore %>',
                        adminApp: {}
                    },
        			styles: {
                        site: '<%= assets.dev.styles.site %>',
                        admin: {}
                    },
        			sections: {},
        			data: {}
        		}
        	}
        }

	});

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-html-build');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    // grunt.loadNpmTasks('grunt-contrib-copy');


    grunt.registerTask('default', ['jshint', 'htmlbuild:dev', 'concurrent:dev']);
		
};