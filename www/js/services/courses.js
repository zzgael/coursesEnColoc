app.factory('CoursesResource', function($resource,config) {
  return $resource(config.ctx +'courses/:id',{id:'@id'});
});
