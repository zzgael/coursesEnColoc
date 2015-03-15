angular.module('starter.services', ['ngResource'])

.factory('Courses', function($resource) {
  return $resource('http://courses-en-coloc.tk/courses/:id',{id:'@id'});
});