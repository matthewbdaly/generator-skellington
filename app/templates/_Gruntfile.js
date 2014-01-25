module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        copy: {
            dist: {
                cwd: 'app',
                src: [
                    'index.html',
                    'images/*'
                ],
                dest: 'dist',
                expand: true
            }
        },
        clean: [
            'dist',
            'build'
        ],
        concat: {
            dist: {
                src: [
                    'app/stylesheets/*.css',
                    'app/static/css/style.css'
                ],
                dest: 'build/app/static/css/main.css'
            }
        },
        cssmin: {
            dist: {
                src: 'build/app/static/css/main.css',
                dest: 'dist/static/css/main.min.css'
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'app/scripts/main.js'
            ]
        },
 
        uglify: {
            dist: {
                src: [
                    'app/static/bower_components/modernizr/modernizr.js',
                    'app/static/bower_components/jquery/jquery.min.js',
                    'app/scripts/main.js'
                ],
                dest: 'dist/static/scripts/all.js'
            }
        },
        'ftp-deploy': {
            build: {
                auth: {
                    authKey: 'key',
                    host: '<%= host %>',
                    port: '<%= port %>'
                },
                src: 'dist',
                dest: '<%= destination_folder %>'
            }
        },
        watch: {
            scripts: {
                files: [
                    'app/*.html',
                    'app/scripts/*.js',
                    'app/static/css/style.css'
                ],
                tasks: ['build'],
                options: {
                    spawn: false,
                    livereload: {
                        options: {
                            livereload: 35729
                        }
                    }
                }
            }
        },
        connect: {
            app: {
                options: {
                    base: 'dist',
                    port: 9000,
                    hostname: 'localhost',
                    open: 'http://localhost:9000/',
                    livereload: 35729,
                    debug: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-ftp-deploy');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('build', [
        'clean',
        'concat',
        'cssmin',
        'jshint',
        'uglify',
        'copy'
    ]);

    grunt.registerTask('deploy', [
        'build',
        'ftp-deploy'
    ]);

    grunt.registerTask('server', [
        'build',
        'connect',
        'watch'
    ]);

    grunt.registerTask('default', [
        'build'
    ]);
};
