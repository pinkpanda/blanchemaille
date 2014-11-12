'use strict';

require('dotenv').load();
var modRewrite = require('connect-modrewrite');

module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  require('time-grunt')(grunt);

  var appConfig = {
    dev: require('./bower.json').appPath || 'app',
    dist: 'dist'
  };

  grunt.initConfig({
    app: appConfig,

    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= app.dev %>/scripts/**/*.js'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      compass: {
        files: ['<%= app.dev %>/styles/**/*.{scss,sass}'],
        tasks: ['compass:dev', 'autoprefixer']
      },
      jade: {
        files: ['<%= app.dev %>/**/*.jade'],
        tasks: ['jade']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '{.tmp,<%= app.dev %>}/**/*.html',
          '.tmp/styles/**/*.css',
          '<%= app.dev %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    connect: {
      options: {
        port: 8000,
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              modRewrite([
                '!\\.html|\\.js|\\.css|\\.png|\\.jpg$ /index.html [L]'
              ]),
              connect.static('.tmp'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.dev)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= app.dist %>'
        }
      }
    },

    clean: {
      dev: '.tmp',
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= app.dist %>/**/*',
            '!<%= app.dist %>/.git*'
          ]
        }]
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '**/*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    wiredep: {
      options: {
        cwd: '<%= app.dev %>'
      },
      app: {
        src: ['<%= app.dev %>/index.jade'],
        ignorePath:  /\.\.\//
      },
      sass: {
        src: ['<%= app.dev %>/styles/**/*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },

    compass: {
      options: {
        sassDir: '<%= app.dev %>/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= app.dev %>/images',
        javascriptsDir: '<%= app.dev %>/scripts',
        fontsDir: '<%= app.dev %>/fonts',
        importPath: './bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dev: {
        options: {
          debugInfo: true
        }
      },
      dist: {
        options: {
          generatedImagesDir: '<%= app.dist %>/images/generated'
        }
      }
    },

    filerev: {
      dist: {
        src: [
          '<%= app.dist %>/scripts/**/*.js',
          '<%= app.dist %>/styles/**/*.css',
          '<%= app.dist %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= app.dist %>/styles/*'
        ]
      }
    },

    jade: {
      dist: {
        options: {
          pretty: true
        },
        files: [{
          expand: true,
          cwd: '<%= app.dev %>',
          dest: '.tmp',
          src: '**/*.jade',
          ext: '.html'
        }]
      }
    },

    useminPrepare: {
      html: '.tmp/index.html',
      options: {
        dest: '<%= app.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    usemin: {
      html: ['<%= app.dist %>/**/*.html'],
      css: ['<%= app.dist %>/styles/**/*.css'],
      options: {
        assetsDirs: ['<%= app.dist %>','<%= app.dist %>/images']
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= app.dev %>/images',
          src: '**/*.{png,jpg,jpeg,gif}',
          dest: '<%= app.dist %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= app.dist %>',
          src: '**/*.html',
          dest: '<%= app.dist %>'
        }]
      }
    },

    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= app.dev %>',
          dest: '<%= app.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '**/*.html',
            'images/**/*.{webp}',
            'fonts/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp',
          dest: '<%= app.dist %>',
          src: ['**/*.html']
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= app.dist %>/images',
          src: ['generated/*']
        }, {
          expand: true,
          cwd: '.',
          src: 'bower_components/bootstrap-sass-official/vendor/assets/fonts/bootstrap/*',
          dest: '<%= app.dist %>'
        }, {
          expand: true,
          cwd: '.',
          src: 'bower_components/flexslider/fonts/*',
          dest: '<%= app.dist %>'
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= app.dev %>/styles',
        dest: '.tmp/styles/',
        src: '**/*.css'
      }
    },

    sftp: {
      production: {
        files: {
          './': 'dist/**'
        },
        options: {
          host: process.env.SERV_HOST,
          path: process.env.SERV_PATH,
          privateKey: grunt.file.read(process.env.SERV_KEY),
          showProgress: true,
          createDirectories: true,
          srcBasePath: 'dist/',
          username: process.env.SERV_USER
        }
      }
    },

    concurrent: {
      dev: [
        'compass:dev',
        'jade'
      ],
      dist: [
        'compass:dist',
        'jade',
        'imagemin'
      ]
    }
  });

  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:dev',
      'jade',
      'wiredep',
      'concurrent:dev',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'jade',
    'wiredep',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'ngmin',
    'copy:dist',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('deploy', 'Deploy to server', function (target) {
    grunt.task.run(['build', 'sftp:' + target]);
  });

  grunt.registerTask('default', [
    'build'
  ]);
};
