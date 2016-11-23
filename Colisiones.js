var Colisiones = function(){};

Colisiones.collideTop = function(player){

	var rayUp = new THREE.Raycaster();
	rayUp.ray.direction.set( 0, 1, 0 );

	//var mesh = player.mesh;
	var mesh= player.mesh;
	var origen = mesh.position.clone();
	rayUp.ray.origin.copy( origen );

	var intersecciones = rayUp.intersectObjects(collidableMeshList);

	if( intersecciones.length > 0 ){
		var distancia = intersecciones[0].distance;
				// si me pegué
				if( distancia <= mesh.collidableDistance){
					if(player.falling == false && distancia > 0 && distancia <= mesh.collidableDistance){
                         console.log("me pegue arriba");
						player.vy = 0;
						player.falling = true;
					}
				}
			}

		};

		Colisiones.collideRight = function(player){


			var rayUp = new THREE.Raycaster();
			rayUp.ray.direction.set( -1, 0, 0 );

			var mesh = player.mesh;
			var origen = mesh.position.clone();
			rayUp.ray.origin.copy( origen );

			var intersecciones = rayUp.intersectObjects( collidableMeshList );

			if( intersecciones.length > 0 ){
				var distancia = intersecciones[0].distance;
				// si me pegué
				if( distancia <= mesh.collidableDistance){
					console.log("colisiones");
					if(player.falling == false && distancia > 0 && distancia <= mesh.collidableDistance){

						player.falling = false;
						player.inAir = false;
						player.walkXN = true;
						player.walkX = false;

						player.jumping = false;
					}
				}
			}

		};

		Colisiones.collideLeft = function(player){


			var rayUp = new THREE.Raycaster();
			rayUp.ray.direction.set( 1, 0, 0 );

			var mesh = player.mesh;
			var origen = mesh.position.clone();
			rayUp.ray.origin.copy( origen );

			var intersecciones = rayUp.intersectObjects( collidableMeshList );

			if( intersecciones.length > 0 ){
				var distancia = intersecciones[0].distance;
				// si me pegué
				if( distancia <= mesh.collidableDistance){

					if(player.falling == false && distancia > 0 && distancia <= mesh.collidableDistance){

						player.falling = false;
						player.inAir = false;
						player.walkX = true;
						player.jumping = false;
					}
				}
			}

		};

		Colisiones.collideZPositivo = function(player){


			var rayUp = new THREE.Raycaster();
			rayUp.ray.direction.set( 0, 0, 1 );

			var mesh = player.mesh;
			var origen = mesh.position.clone();
			rayUp.ray.origin.copy( origen );

			var intersecciones = rayUp.intersectObjects( collidableMeshList );

			if( intersecciones.length > 0 ){
				var distancia = intersecciones[0].distance;
				// si me pegué
				if( distancia <= mesh.collidableDistance){
					console.log("colisiones");
					if(loadedPlayers.falling == false && distancia > 0 && distancia <= mesh.collidableDistance){

						loadedPlayers.falling = false;
						loadedPlayers.inAir = false;
						loadedPlayers.walkZ = true;



						loadedPlayers.jumping = false;
					}
				}
			}

		};

		Colisiones.collideZNegativo = function(loadedPlayers){


			var rayUp = new THREE.Raycaster();
			rayUp.ray.direction.set( 0, 0, -1 );
			var mesh = loadedPlayers.mesh;
			var origen = mesh.position.clone();
			rayUp.ray.origin.copy( origen );

			var intersecciones = rayUp.intersectObjects( collidableMeshList );

			if( intersecciones.length > 0 ){
				var distancia = intersecciones[0].distance;
				// si me pegué
				if( distancia <= mesh.collidableDistance){

					if(loadedPlayers.falling == false && distancia > 0 && distancia <= mesh.collidableDistance){

						loadedPlayers.falling = false;
						loadedPlayers.inAir = false;
						loadedPlayers.walkZN = true;
						loadedPlayers.jumping = false;
					}
				}
			}

		};



		Colisiones.collideBottom = function(loadedPlayers){

			var rayDown = new THREE.Raycaster();
			rayDown.ray.direction.set( 0, -1, 0 );

			//var mesh = loadedPlayers.mesh;
			var mesh = loadedPlayers.mesh;
			var origen = mesh.position.clone();
			rayDown.ray.origin.copy( origen );

			var intersecciones = rayDown.intersectObjects( collidableMeshList );

			if( intersecciones.length > 0 ){
				var distancia = intersecciones[0].distance;
				if(distancia > 0 && distancia > mesh.collidableDistance){
					mesh.position.y -= loadedPlayers.vy;
					loadedPlayers.inAir = true;
				}else{

					if(intersecciones[ 0 ].object.name == "obstaculo"){
						obstaculo.material = new THREE.MeshBasicMaterial({
							color:0x00ff00
						});
					}

					/*if(intersecciones[ 0 ].object.name == "The awesome Void"){
						loadedPlayers.die();
						loadedPlayers.setPosition(60,150,0);
					}*/

					if(intersecciones[ 0 ].object.name == "enemigo1"){
						console.log("enemigo encontrado");
						sonido.play();
						loadedPlayers.die();
						loadedPlayers.setPosition(60,150,0);
					}

					loadedPlayers.falling = false;
					loadedPlayers.inAir = false;
					loadedPlayers.vy = 0;
					loadedPlayers.jumping = false;

				}
			}
		};
