var min = require("gulp-uglify");
var gulp=require("gulp");

gulp.task("build",function(){
   return gulp.src("src/*")
       .pipe(min())
       .pipe(gulp.dest("build"));
});