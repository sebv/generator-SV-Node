'use strict';

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    mocha: {
      options: {
        //globals: ['should'],
        timeout: 3000,
        ignoreLeaks: false,
        //grep: '*-tests',
        ui: 'bdd',
        reporter: 'tap'
      },
      unit: { src: 'test/specs/**/*-tests.js' }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib: {
        src: ['index.js', 'lib/**/*.js']
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/**/*.js']
      }
    },
    watch: {
      gruntfile: {
        files: '<%%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib: {
        files: '<%%= jshint.lib.src %>',
        tasks: ['jshint:lib', 'mocha']
      },
      test: {
        files: '<%%= jshint.test.src %>',
        tasks: ['jshint:test', 'mocha']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.renameTask('simplemocha', 'mocha');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['jshint', 'mocha']);

};
