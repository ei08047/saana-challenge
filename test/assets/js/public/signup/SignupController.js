
angular.module('SignupModule').controller('SignupController',['$scope','$http' ,function($scope, $http){
	$scope.signupForm ={
		loading:false
	}

	$scope.submitSignupForm = function(){
		$scope.signupForm.loading = true;
		console.log("clicked");
		$http.post('/signup',{
			name: $scope.signupForm.name,
			email: $scope.signupForm.email,
			password: $scope.signupForm.password
		})
		.then(function onSuccess(){
			window.location = "/";
		})
		.catch(function onError(sailsResponse){
			var emailAddressAlreadyInUse = sailsResponse.status == 409;
			if(emailAddressAlreadyInUse){
				//toastr.error('That email address has already been taken, please try again.', 'Error');
				return;
			}
		})
		.finally(function eitherWay(){
			$scope.signupForm.location = false;
		})
	}


	$scope.submitLoginForm = function (){

    // Set the loading state (i.e. show loading spinner)
    $scope.loginForm.loading = true;

    // Submit request to Sails.
    $http.put('/login', {
      email: $scope.loginForm.email,
      password: $scope.loginForm.password
    })
    .then(function onSuccess (){
      // Refresh the page now that we've been logged in.
      window.location = '/';
    })
    .catch(function onError(sailsResponse) {

      // Handle known error type(s).
      // Invalid username / password combination.
      if (sailsResponse.status === 400 || 404) {
        // $scope.loginForm.topLevelErrorMessage = 'Invalid email/password combination.';
        //

        return;
      }

		return;

    })
    .finally(function eitherWay(){
      $scope.loginForm.loading = false;
    });
  };


}]);