module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: ['*.js']
		},
		uglify: {
			options: {
				compress: true,
				mangle: true,
				preserveComments: 'some',
				report: 'gzip'
			},
			build: {
				src: 'jquery.substitute.js',
				dest: 'dist/jquery.substitute.min.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['jshint', 'uglify']);

};