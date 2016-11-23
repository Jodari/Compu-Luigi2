//*******variables
var escena, camara, renderer;
var appW = window.innerWidth, appH = window.innerHeight;
var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;
var controlCamara;
var cuboGeometria;
var fuenteluz;
var mouseX = 0, mouseY = 0;
var x=0;
var cubo;
var jugadores = [];
var enemigos = [];
var currentId = 0;
var sonido;
var cont=[0,0,0,0];
var mira='r';
var clock = new THREE.Clock();
var gui = null;
var isFrameStepping = false;
var timeToStep = 0;
var esp=false;
var igual=false;
var h=220;
var sign;
var goomba;
var e;
var contador=-1;
var contadorE=-1;
var contador1=-1;
var contador2=-1;
var contador3=-1;
var contador4=-1;
var contador5=-1;
var annie;
var thing2;
var contadores = [];
     var sec = 300;
//******
var TECLA = {
	ARRIBA: false,
	ABAJO: false,
	IZQUIERDA: false,
	DERECHA: false,
	ESPACIO: false,
	X:false,Y:false,Z:false,R:false
};

//colisiones
var collidableMeshList = [];

//PERSONAJS
var personajes = [];


function webGLStart(){
	iniciarEscena2();
	document.onkeydown = teclaPulsada; 
	document.onkeyup = teclaSoltada;
	animarEscena2();
	//animarEscena2();
	//updateCamara();
}

//NIVEL 2, APENAS METIENDO TEXTURAS Y COSAS iniciarEscena es el nivel1 con todas las cosas
function iniciarEscena2(){
		var canvas = document.getElementById("app");
		renderer = new THREE.WebGLRenderer({canvas:canvas});
		renderer.setSize(appW,appH);
		renderer.setClearColor(0x005203b,1);
		renderer.shadowMap.enabled=true;
		//noche:
		//dia: 0x23affa
		escena = new THREE.Scene();
		camara = new THREE.PerspectiveCamera(50, appW/appH, 1, 5000);
		camara.position.set(-700,400,-10);
		camara.lookAt({x:0,y:100,z:0})
		controlCamara = new THREE.OrbitControls( camara, renderer.domElement );

		//LUCES
        lAmbiente = new THREE.AmbientLight( 0xff0000,0.9 );
        //0x404040
        var color = 0xffffff;
		var intensidad = 1;
		var distancia = 500;

		lDir = new THREE.DirectionalLight( color , intensidad, 200 );
		lDir.position.set(-700,700,0);
		lDir.castShadow=true;
		lDir.shadowMapDarkness=0.5;
		lDir.shadow.mapSize.width=2048;
		lDir.shadow.mapSize.height=2048;
		lDir.shadow.camera.far=2500;
		lDir.shadow.camera.left=-1000;
		lDir.shadow.camera.right=1000;
		lDir.shadow.camera.top=1000;
		lDir.shadow.camera.buttom=-1000;

		var textureLoader = new THREE.TextureLoader();
		var textura = textureLoader.load( "./textures/caja.png" );
		textura.wrapS=textura.wrapT=THREE.RepeatWrapping;
		textura.repeat.set(1,10);

		var texturaFront= new THREE.TextureLoader().load("./textures/lad.png");
		texturaFront.wrapS=texturaFront.wrapT=THREE.RepeatWrapping;
		texturaFront.repeat.set(20,10);

		var texturaPiso= new THREE.TextureLoader().load("./textures/piso.jpg");
		texturaPiso.wrapS=texturaPiso.wrapT=THREE.RepeatWrapping;
		texturaPiso.repeat.set(1,10);


		//PISO 1XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
		var front = new THREE.Mesh(
			new THREE.PlaneGeometry(1400,600), new THREE.MeshLambertMaterial({
				map: texturaFront,
				side:THREE.DoubleSide
			})
			);

		var side2 = new THREE.Mesh(
			new THREE.PlaneGeometry(200,600), new THREE.MeshLambertMaterial({
				map: texturaFront,
				side:THREE.DoubleSide
			})
			);

		var side1 = new THREE.Mesh(
			new THREE.PlaneGeometry(200,600), new THREE.MeshLambertMaterial({
				map: texturaFront,
				side:THREE.DoubleSide
			})
			);

		var suelo = new THREE.Mesh(
				new THREE.PlaneGeometry(200,1400,10,10),
				new THREE.MeshLambertMaterial({
					map: texturaPiso,
					side: THREE.DoubleSide
				})
			);

		side2.rotation.y=(90)*-Math.PI/2;
		side2.position.x=0;
		side2.position.z=700;
		side2.position.y=-300;	

		side1.rotation.y=(90)*-Math.PI/2;
		side1.position.x=0;
		side1.position.z=-700;
		side1.position.y=-300;

		front.rotation.y = Math.PI/2;	
		front.position.x=-100;
		front.position.z=0;
		front.position.y=-300;	

		suelo.rotation.x = -Math.PI/2;
		suelo.position.x=0
		suelo.recieveShadow= true;	

    	escena.add(suelo);
        escena.add(front,side1,side2,suelo);
		//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
		//techo
		crearPiso2(/*front*/8000,200,/*lados*/200,200,/*suelo*/200,8000,
			/*posiciones  front*/3300,-1150,/* side1*/-700,-1150,/*side2*/700,-1150,/*suelo*/3300,1250,
			/*repeat caja y,z*/1,10,/*front*/100,4,/*piso*/1,10);


		//piso1-2
		crearPiso2(/*front*/1400,200,/*lados*/200,200,/*suelo*/200,1400,
			/*posiciones  front*/0,-600,/* side1*/-700,-600,/*side2*/700,-600,/*suelo*/0,700,
			/*repeat caja y,z*/1,10,/*front*/20,4,/*piso*/1,10);

		//piso2
		crearPiso2(/*front*/700,1600,/*lados*/200,1600,/*suelo*/200,700,
			/*posiciones  front*/1350,300,/* side1*/1000,300,/*side2*/1700,300,/*suelo*/1350,500,
			/*repeat caja y,z*/1,10,/*front*/10,28,/*piso*/1,10);

		//plataforma1
		crearPiso2(/*front largo,alto*/1000,30,/*lados*/200,30,/*suelo*/200,1000,
			/*posiciones  front z,y*/2300,-500,/* side1 z,y*/1800,-500,/*side2 z,y*/2800,-500,/*suelo z,y*/2300,515,
			/*repeat caja y,z*/1,10,/*front*/10,28,/*piso*/1,10);

		//plataforma2
		crearPiso2(/*front largo,alto*/200,30,/*lados*/200,30,/*suelo*/200,200,
			/*posiciones  front z,y*/3000,-410,/* side1 z,y*/2900,-410,/*side2 z,y*/3100,-410,/*suelo z,y*/3000,425,
			/*repeat caja y,z*/1,10,/*front*/10,28,/*piso*/1,10);

		//plataforma3
		crearPiso2(/*front largo,alto*/200,30,/*lados*/200,30,/*suelo*/200,200,
			/*posiciones  front z,y*/3300,-435,/* side1 z,y*/3200,-435,/*side2 z,y*/3400,-435,/*suelo z,y*/3300,450,
			/*repeat caja y,z*/1,10,/*front*/10,28,/*piso*/1,10);

		//plataforma4
		crearPiso2(/*front largo,alto*/200,30,/*lados*/200,30,/*suelo*/200,200,
			/*posiciones  front z,y*/3600,-270,/* side1 z,y*/3500,-270,/*side2 z,y*/3700,-270,/*suelo z,y*/3600,285,
			/*repeat caja y,z*/1,10,/*front*/10,28,/*piso*/1,10);


		//plataformaFinal
		crearPiso2(/*front largo,alto*/1400,30,/*lados*/200,30,/*suelo*/200,1400,
			/*posiciones  front z,y*/4500,-35,/* side1 z,y*/4000,-35,/*side2 z,y*/4200,-35,/*suelo z,y*/4500,50,
			/*repeat caja y,z*/1,10,/*front*/10,28,/*piso*/1,10);

		//piso4
		//crearPiso2(/*front largo,alto*/1400,600,/*lados*/200,600,/*suelo*/200,1400,
		//	/*posiciones  front z,y*/3200,300,/* side1 z,y*/2500,300,/*side2 z,y*/3900,300,/*suelo z,y*/3200,0,
		//	/*repeat caja y,z*/1,10,/*front*/10,28,/*piso*/1,10);

		//plataforma2
		//crearPiso2(/*front largo,alto*/200,30,/*lados*/200,30,/*suelo*/200,200,
		//	/*posiciones  front z,y*/4100,-35,/* side1 z,y*/4000,-35,/*side2 z,y*/4200,-35,/*suelo z,y*/4100,50,
		//	/*repeat caja y,z*/1,10,/*front*/10,28,/*piso*/1,10);

		//piso5
		//crearPiso2(/*front largo,alto*/1400,600,/*lados*/200,600,/*suelo*/200,1400,
		//	/*posiciones  front z,y*/5000,300,/* side1 z,y*/4300,300,/*side2 z,y*/5700,300,/*suelo z,y*/5000,0,
		//	/*repeat caja y,z*/1,10,/*front*/10,28,/*piso*/1,10);

/*//		ESCALERAS DE BLOQUES
		bloque(0,24,3875,"./textures/caja.png");
		bloque(0,72,3875,"./textures/caja.png");
		bloque(0,120,3875,"./textures/caja.png");
		bloque(0,72,3827,"./textures/caja.png");
		bloque(0,24,3827,"./textures/caja.png");
		bloque(0,24,3779,"./textures/caja.png");
	//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
		bloque(48,24,3875,"./textures/caja.png");
		bloque(48,72,3875,"./textures/caja.png");
		bloque(48,120,3875,"./textures/caja.png");
		bloque(48,72,3827,"./textures/caja.png");
		bloque(48,24,3827,"./textures/caja.png");
		bloque(48,24,3779,"./textures/caja.png");
	//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
		bloque(-48,24,3875,"./textures/caja.png");
		bloque(-48,72,3875,"./textures/caja.png");
		bloque(-48,120,3875,"./textures/caja.png");
		bloque(-48,72,3827,"./textures/caja.png");
		bloque(-48,24,3827,"./textures/caja.png");
		bloque(-48,24,3779,"./textures/caja.png");*/

		//		ESCALERAS DE BLOQUES 2
		bloque(0,24+48,3500+450,"./textures/caja.png");
		bloque(0,72+48,3500+450,"./textures/caja.png");
		bloque(0,120+48,3500+450,"./textures/caja.png");
		bloque(0,72+48,(3500-48)+546,"./textures/caja.png");
		bloque(0,24+48,(3500-48)+546,"./textures/caja.png");
		bloque(0,24+48,(3500-48)+594,"./textures/caja.png");
	//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
		bloque(48,24+48,3500+450,"./textures/caja.png");
		bloque(48,72+48,3500+450,"./textures/caja.png");
		bloque(48,120+48,3500+450,"./textures/caja.png");
		bloque(48,72+48,(3500-48)+546,"./textures/caja.png");
		bloque(48,24+48,(3500-48)+546,"./textures/caja.png");
		bloque(48,24+48,(3500-48)+594,"./textures/caja.png");
	//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
		bloque(-48,24+48,3500+450,"./textures/caja.png");
		bloque(-48,72+48,3500+450,"./textures/caja.png");
		bloque(-48,120+48,3500+450,"./textures/caja.png");
		bloque(-48,72+48,(3500-48)+546,"./textures/caja.png");
		bloque(-48,24+48,(3500-48)+546,"./textures/caja.png");
		bloque(-48,24+48,(3500-48)+594,"./textures/caja.png");
	//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
		bloque(0,24+48,3902,"./textures/caja.png");
		bloque(48,24+48,3902,"./textures/caja.png");
		bloque(-48,24+48,3902,"./textures/caja.png");
		bloque(0,24+48+48,3902,"./textures/caja.png");
		bloque(48,24+48+48,3902,"./textures/caja.png");
		bloque(-48,24+48+48,3902,"./textures/caja.png");
	//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
		bloque(0,24+48,3902-48,"./textures/caja.png");
		bloque(48,24+48,3902-48,"./textures/caja.png");
		bloque(-48,24+48,3902-48,"./textures/caja.png");


	//CASTILLOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
		bloque(-70-5,24+48,4900+32,"./textures/caja.png");
		bloque(-70-5,72+48,4900+32,"./textures/caja.png");
		bloque(-70-5,120+48,4900+32,"./textures/caja.png");
		bloque(-70-5,168+48,4900+32,"./textures/caja.png");
		bloque(-70-5,216+48,4900+32,"./textures/caja.png");
//******************1*************************************
		bloque(-70-5,24+48,4900+32+48,"./textures/caja.png");
		bloque(-70-5,72+48,4900+32+48,"./textures/caja.png");
		bloque(-70-5,120+48,4900+32+48,"./textures/caja.png");
		bloque(-70-5,168+48,4900+32+48,"./textures/caja.png");
		bloque(-70-5,216+48,4900+32+48,"./textures/caja.png");
//******************2*************************************
		bloque(-70-5,24+48,4900+32+48+48,"./textures/caja.png");
		bloque(-70-5,72+48,4900+32+48+48,"./textures/caja.png");
		bloque(-70-5,120+48,4900+32+48+48,"./textures/caja.png");
		bloque(-70-5,168+48,4900+32+48+48,"./textures/caja.png");
		bloque(-70-5,216+48,4900+32+48+48,"./textures/caja.png");
//******************3*************************************
		bloque(-70-5,24+48,4900+32+48+48+48,"./textures/caja.png");
		bloque(-70-5,72+48,4900+32+48+48+48,"./textures/caja.png");
		bloque(-70-5,120+48,4900+32+48+48+48,"./textures/caja.png");
		bloque(-70-5,168+48,4900+32+48+48+48,"./textures/caja.png");
		bloque(-70-5,216+48,4900+32+48+48+48,"./textures/caja.png");
//******************4*************************************
		bloque(-22-5,216+48,4900+32+48+48+48,"./textures/caja.png");
		bloque(26-5,216+48,4900+32+48+48+48,"./textures/caja.png");
		bloque(70-5,24+48,4900+32+48+48+48,"./textures/caja.png");
		bloque(70-5,72+48,4900+32+48+48+48,"./textures/caja.png");
		bloque(70-5,120+48,4900+32+48+48+48,"./textures/caja.png");
		bloque(70-5,168+48,4900+32+48+48+48,"./textures/caja.png");
		bloque(70-5,216+48,4900+32+48+48+48,"./textures/caja.png");

		bloque(70-5,24+48,4900+32+48+48,"./textures/caja.png");
		bloque(70-5,72+48,4900+32+48+48,"./textures/caja.png");
		bloque(70-5,120+48,4900+32+48+48,"./textures/caja.png");
		bloque(70-5,168+48,4900+32+48+48,"./textures/caja.png");
		bloque(70-5,216+48,4900+32+48+48,"./textures/caja.png");

		bloque(70-5,24+48,4900+32+48,"./textures/caja.png");
		bloque(70-5,72+48,4900+32+48,"./textures/caja.png");
		bloque(70-5,120+48,4900+32+48,"./textures/caja.png");
		bloque(70-5,168+48,4900+32+48,"./textures/caja.png");
		bloque(70-5,216+48,4900+32+48,"./textures/caja.png");

		bloque(70-5,24+48,4900+32,"./textures/caja.png");
		bloque(70-5,72+48,4900+32,"./textures/caja.png");
		bloque(70-5,120+48,4900+32,"./textures/caja.png");
		bloque(70-5,168+48,4900+32,"./textures/caja.png");
		bloque(70-5,216+48,4900+32,"./textures/caja.png");

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//		BLOQUES PARTE 2
/*		bloque(0,230,3200,"./textures/caja.png");
        bloque(0,230,3248,"./textures/caja.png");
        bloque(0,230,(3248+48),"./textures/caja.png");
        bloque(0,230,(3248+48+48),"./textures/caja.png");
        bloque(0,230,(3200-48),"./textures/caja.png");
        bloque(0,230,(3200-48-48),"./textures/caja.png");
        bloque(0,230,(3200-48-48-48),"./textures/caja.png");
        bloque(0,230,(3200-48-48-48-48),"./textures/caja.png");

        cajas(0,400,3176);
        bloque(0,400,(3176+48),"./textures/caja.png");
        bloque(0,400,(3176-48),"./textures/caja.png");	*/	
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXTEXTURABACKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX		
		var texturaBack= new THREE.TextureLoader().load("./textures/lad.png");
		texturaBack.wrapS=texturaBack.wrapT=THREE.RepeatWrapping;
		texturaBack.repeat.set(100,10);
		var back = new THREE.Mesh(
			new THREE.PlaneGeometry(8000,2000), new THREE.MeshLambertMaterial({
				map: texturaBack,
				side:THREE.DoubleSide
			})
			);
		back.rotation.y=-Math.PI/2;
		back.position.x=100;
		back.position.z=3300;
		back.position.y=250;
		escena.add(back);
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        var j = new Jugador("pepe",{
				modelo:'Luigi_obj.obj',
				position: new THREE.Vector3(200,0,0),
				lifes:20,
				points:sec

			});
         jugadores.push(j);
         escena.add(lAmbiente,lDir);
         suelo.name="suelo";             
         collidableMeshList.push(suelo);
//XXXXXXXXXXXXXXXXXXXXXXCREANDO COSASXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
         cajas(0,870,1348);
         bloque(0,700,1348,"./textures/caja.png");
         bloque(0,700,1300,"./textures/caja.png");
         bloque(0,700,1300+48+48,"./textures/caja.png");

                  tubos(0,600,1620,7,10,7);
                  pirana(0,600,1620,1,1,1);

         oneup(0,700,-650,1,1,1);
         oneup(0,430,3000,1,1,1);
         oneup(0,290,3600,1,1,1);

         goomba1(0,0,650,1.3,1.3,1.3);
         goomba1(0,450,3340,1.3,1.3,1.3);    
      	 kingboo(0,75,4500,4,4,4);    
  	     boo(0,10,450,6,6,6);
  	     boo(0,710,500,6,6,6);	

  	     boo(0,530,2620,6,6,6);	
  	     boo(0,530,2300,6,6,6);
  	     boo(0,530,1950,6,6,6);




//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//xxxxxxxxxxxxxxxxxxxxPLATAFORMA MOVIBLExxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
         cuboGeometria=new THREE.BoxGeometry(200,30,100);

		var cuboTextura = new THREE.ImageUtils.loadTexture("./textures/atlas.jpg");
		var bricks = [
		    new THREE.Vector2(0, .666), 
		    new THREE.Vector2(.5, .666), 
		    new THREE.Vector2(.5, 1), 
		    new THREE.Vector2(0, 1)
		    ];

		var clouds = [
		    new THREE.Vector2(.5, .666), 
		    new THREE.Vector2(1, .666), 
		    new THREE.Vector2(1, 1), 
		    new THREE.Vector2(.5, 1)
		    ];
		var crate = [ 
		    new THREE.Vector2(0, .333), 
		    new THREE.Vector2(.5, .333), 
		    new THREE.Vector2(.5, .666), 
		    new THREE.Vector2(0, .666)
		    ];
		var stone = [
		    new THREE.Vector2(.5, .333), 
		    new THREE.Vector2(1, .333), 
		    new THREE.Vector2(1, .666), 
		    new THREE.Vector2(.5, .666)
		    ];
		var water = [
		    new THREE.Vector2(0, 0), 
		    new THREE.Vector2(.5, 0), 
		    new THREE.Vector2(.5, .333), 
		    new THREE.Vector2(0, .333)
		    ];
		var wood = [
		    new THREE.Vector2(.5, 0), 
		    new THREE.Vector2(1, 0), 
		    new THREE.Vector2(1, .333), 
		    new THREE.Vector2(.5, .333)
		    ]
		var bricks = [
			new THREE.Vector2(0.0,0.66),
			new THREE.Vector2(0.5,0.66),
			new THREE.Vector2(0.5,1.0),
			new THREE.Vector2(0.0,1.0)
		];

		//*******MAPEADO DE TEXTURAS***********************************************
		cuboGeometria.faceVertexUvs[1] = [];

		cuboGeometria.faceVertexUvs[0][0] = [ bricks[0], bricks[1], bricks[3] ];
		cuboGeometria.faceVertexUvs[0][1] = [ bricks[1], bricks[2], bricks[3] ];

		cuboGeometria.faceVertexUvs[0][2] = [ bricks[0], bricks[1], bricks[3] ];
		cuboGeometria.faceVertexUvs[0][3] = [ bricks[1], bricks[2], bricks[3] ];
		  
		cuboGeometria.faceVertexUvs[0][4] = [ crate[0], crate[1], crate[3] ];
		cuboGeometria.faceVertexUvs[0][5] = [ crate[1], crate[2], crate[3] ];
		  
		cuboGeometria.faceVertexUvs[0][6] = [ bricks[0], bricks[1], bricks[3] ];
		cuboGeometria.faceVertexUvs[0][7] = [ bricks[1], bricks[2], bricks[3] ];
		  
		cuboGeometria.faceVertexUvs[0][8] = [ bricks[0], bricks[1], bricks[3] ];
		cuboGeometria.faceVertexUvs[0][9] = [ bricks[1], bricks[2], bricks[3] ];
		  
		cuboGeometria.faceVertexUvs[0][10] = [ bricks[0], bricks[1], bricks[3] ];
		cuboGeometria.faceVertexUvs[0][11] = [ bricks[1], bricks[2], bricks[3] ];

		cuboTextura.repeat.set(1,1);
//*********************************************************************************
		var cuboMaterial = new THREE.MeshBasicMaterial({map:cuboTextura});

		cubo = new THREE.Mesh(cuboGeometria, cuboMaterial);
		cubo2 = new THREE.Mesh(cuboGeometria, cuboMaterial);
		cubo.position.set(0, -15, 850);
		cubo.rotation.y = (90)*Math.PI/2;
		cubo2.position.set(0, 250, 4000);
		cubo2.rotation.y = (90)*Math.PI/2;	

		collidableMeshList.push(cubo);
		collidableMeshList.push(cubo2);
		escena.add(cubo);
		escena.add(cubo2);
		//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXTEXTURA ANIMADAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
		var runnerTexture = new THREE.ImageUtils.loadTexture( 'images/flagtexture.png' );
		annie = new TextureAnimator( runnerTexture, 7, 1, 7, 100 ); // texture, #horiz, #vert, #total, duration.
		var runnerMaterial = new THREE.MeshBasicMaterial( { map: runnerTexture, side:THREE.DoubleSide, transparent:true} );
		var runnerGeometry = new THREE.PlaneGeometry(200, 400, 1, 1);
		var runner = new THREE.Mesh(runnerGeometry, runnerMaterial);
		runner.position.set(0,200,4900);
		var rady= (270 * Math.PI)/180;
		runner.rotateY(rady);
		escena.add(runner);
		jugadores.push(runner);
		createVariables();
		//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       

}

function iniciarEscena(){
		var canvas = document.getElementById("app");
		renderer = new THREE.WebGLRenderer({canvas:canvas});
		renderer.setSize(appW,appH);
		renderer.setClearColor(0x23affa,1);
		renderer.shadowMap.enabled=true;
		//noche:0x005203b
		//dia: 0x23affa
		escena = new THREE.Scene();
		camara = new THREE.PerspectiveCamera(70, appW/appH, 1, 5000);
		camara.position.set(-700,400,-10);
		camara.lookAt({x:0,y:100,z:0})
		controlCamara = new THREE.OrbitControls( camara, renderer.domElement );
		//LUCESXXXX
        lAmbiente = new THREE.AmbientLight( 0x444444 );
        //0x404040
        var color = 0xffffff;
		var intensidad = 1;
		var distancia = 500;
		//200
		lDir = new THREE.DirectionalLight( color , intensidad, 200 );
		lDir.position.set(-700,700,0);
		lDir.castShadow=true;
		lDir.shadowMapDarkness=0.5;
		lDir.shadow.mapSize.width=2048;
		lDir.shadow.mapSize.height=2048;
		lDir.shadow.camera.far=2500;
		lDir.shadow.camera.left=-1000;
		lDir.shadow.camera.right=1000;
		lDir.shadow.camera.top=1000;
		lDir.shadow.camera.buttom=-1000;

		var textureLoader = new THREE.TextureLoader();
		var textura = textureLoader.load( "./textures/pasto.jpg" );
		textura.wrapS=textura.wrapT=THREE.RepeatWrapping;
		textura.repeat.set(3,36);

		var texturaFront= new THREE.TextureLoader().load("./textures/front.jpg");
		texturaFront.wrapS=texturaFront.wrapT=THREE.RepeatWrapping;
		texturaFront.repeat.set(8,1);
		//PISO 1XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
		var front = new THREE.Mesh(
			new THREE.PlaneGeometry(1400,600), new THREE.MeshLambertMaterial({
				map: texturaFront,
				side:THREE.DoubleSide
			})
			);

		var side2 = new THREE.Mesh(
			new THREE.PlaneGeometry(200,600), new THREE.MeshLambertMaterial({
				map: texturaFront,
				side:THREE.DoubleSide
			})
			);

		var side1 = new THREE.Mesh(
			new THREE.PlaneGeometry(200,600), new THREE.MeshLambertMaterial({
				map: texturaFront,
				side:THREE.DoubleSide
			})
			);

		var suelo = new THREE.Mesh(
				new THREE.PlaneGeometry(200,1400,10,10),
				new THREE.MeshLambertMaterial({
					map: textura,
					side: THREE.DoubleSide
				})
			);

		side2.rotation.y=(90)*-Math.PI/2;
		side2.position.x=0;
		side2.position.z=700;
		side2.position.y=-300;	

		side1.rotation.y=(90)*-Math.PI/2;
		side1.position.x=0;
		side1.position.z=-700;
		side1.position.y=-300;

		front.rotation.y = Math.PI/2;	
		front.position.x=-100;
		front.position.z=0;
		front.position.y=-300;	

		suelo.rotation.x = -Math.PI/2;
		suelo.position.x=0
		suelo.recieveShadow= true;	
		//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

		//piso2
		crearPiso(/*front*/700,600,/*lados*/200,600,/*suelo*/200,700,
			/*posiciones  front*/1350,300,/* side1*/1000,300,/*side2*/1700,300,/*suelo*/1350,0);


		//piso3
		crearPiso(/*front*/800,750,/*lados*/200,600,/*suelo*/200,800,
			/*posiciones  front z,y*/2100,225,/* side1 z,y*/1700,150,/*side2 z,y*/2500,150,/*suelo z,y*/2100,150);

		//piso4
		crearPiso(/*front largo,alto*/1400,600,/*lados*/200,600,/*suelo*/200,1400,
			/*posiciones  front z,y*/3200,300,/* side1 z,y*/2500,300,/*side2 z,y*/3900,300,/*suelo z,y*/3200,0);

		//plataforma2
		crearPiso(/*front largo,alto*/200,30,/*lados*/200,30,/*suelo*/200,200,
			/*posiciones  front z,y*/4100,-35,/* side1 z,y*/4000,-35,/*side2 z,y*/4200,-35,/*suelo z,y*/4100,50);

		//piso5

		crearPiso(/*front largo,alto*/1400,600,/*lados*/200,600,/*suelo*/200,1400,
			/*posiciones  front z,y*/5000,300,/* side1 z,y*/4300,300,/*side2 z,y*/5700,300,/*suelo z,y*/5000,0);

//		ESCALERAS DE BLOQUES
		bloque(0,24,3875,"./textures/brick.png");
		bloque(0,72,3875,"./textures/brick.png");
		bloque(0,120,3875,"./textures/brick.png");
		bloque(0,72,3827,"./textures/brick.png");
		bloque(0,24,3827,"./textures/brick.png");
		bloque(0,24,3779,"./textures/brick.png");
	//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
		bloque(48,24,3875,"./textures/brick.png");
		bloque(48,72,3875,"./textures/brick.png");
		bloque(48,120,3875,"./textures/brick.png");
		bloque(48,72,3827,"./textures/brick.png");
		bloque(48,24,3827,"./textures/brick.png");
		bloque(48,24,3779,"./textures/brick.png");
	//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
		bloque(-48,24,3875,"./textures/brick.png");
		bloque(-48,72,3875,"./textures/brick.png");
		bloque(-48,120,3875,"./textures/brick.png");
		bloque(-48,72,3827,"./textures/brick.png");
		bloque(-48,24,3827,"./textures/brick.png");
		bloque(-48,24,3779,"./textures/brick.png");
		//		ESCALERAS DE BLOQUES 2
		bloque(0,24,3875+450,"./textures/brick.png");
		bloque(0,72,3875+450,"./textures/brick.png");
		bloque(0,120,3875+450,"./textures/brick.png");
		bloque(0,72,3827+546,"./textures/brick.png");
		bloque(0,24,3827+546,"./textures/brick.png");
		bloque(0,24,3827+594,"./textures/brick.png");
	//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
		bloque(48,24,3875+450,"./textures/brick.png");
		bloque(48,72,3875+450,"./textures/brick.png");
		bloque(48,120,3875+450,"./textures/brick.png");
		bloque(48,72,3827+546,"./textures/brick.png");
		bloque(48,24,3827+546,"./textures/brick.png");
		bloque(48,24,3827+594,"./textures/brick.png");
	//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
		bloque(-48,24,3875+450,"./textures/brick.png");
		bloque(-48,72,3875+450,"./textures/brick.png");
		bloque(-48,120,3875+450,"./textures/brick.png");
		bloque(-48,72,3827+546,"./textures/brick.png");
		bloque(-48,24,3827+546,"./textures/brick.png");
		bloque(-48,24,3827+594,"./textures/brick.png");
		//CASTILLO
		bloque(-70-5,24,5500+32,"./textures/brick.png");
		bloque(-70-5,72,5500+32,"./textures/brick.png");
		bloque(-70-5,120,5500+32,"./textures/brick.png");
		bloque(-70-5,168,5500+32,"./textures/brick.png");
		bloque(-70-5,216,5500+32,"./textures/brick.png");
//******************1*************************************
		bloque(-70-5,24,5548+32,"./textures/brick.png");
		bloque(-70-5,72,5548+32,"./textures/brick.png");
		bloque(-70-5,120,5548+32,"./textures/brick.png");
		bloque(-70-5,168,5548+32,"./textures/brick.png");
		bloque(-70-5,216,5548+32,"./textures/brick.png");
//******************2*************************************
		bloque(-70-5,24,5596+32,"./textures/brick.png");
		bloque(-70-5,72,5596+32,"./textures/brick.png");
		bloque(-70-5,120,5596+32,"./textures/brick.png");
		bloque(-70-5,168,5596+32,"./textures/brick.png");
		bloque(-70-5,216,5596+32,"./textures/brick.png");
//******************3*************************************
		bloque(-70-5,24,5644+32,"./textures/brick.png");
		bloque(-70-5,72,5644+32,"./textures/brick.png");
		bloque(-70-5,120,5644+32,"./textures/brick.png");
		bloque(-70-5,168,5644+32,"./textures/brick.png");
		bloque(-70-5,216,5644+32,"./textures/brick.png");
//******************4*************************************
		bloque(-22-5,216,5644+32,"./textures/brick.png");

		bloque(26-5,216,5644+32,"./textures/brick.png");

		bloque(70-5,24,5644+32,"./textures/brick.png");
		bloque(70-5,72,5644+32,"./textures/brick.png");
		bloque(70-5,120,5644+32,"./textures/brick.png");
		bloque(70-5,168,5644+32,"./textures/brick.png");
		bloque(70-5,216,5644+32,"./textures/brick.png");

		bloque(70-5,24,5596+32,"./textures/brick.png");
		bloque(70-5,72,5596+32,"./textures/brick.png");
		bloque(70-5,120,5596+32,"./textures/brick.png");
		bloque(70-5,168,5596+32,"./textures/brick.png");
		bloque(70-5,216,5596+32,"./textures/brick.png");

		bloque(70-5,24,5548+32,"./textures/brick.png");
		bloque(70-5,72,5548+32,"./textures/brick.png");
		bloque(70-5,120,5548+32,"./textures/brick.png");
		bloque(70-5,168,5548+32,"./textures/brick.png");
		bloque(70-5,216,5548+32,"./textures/brick.png");

		bloque(70-5,24,5500+32,"./textures/brick.png");
		bloque(70-5,72,5500+32,"./textures/brick.png");
		bloque(70-5,120,5500+32,"./textures/brick.png");
		bloque(70-5,168,5500+32,"./textures/brick.png");
		bloque(70-5,216,5500+32,"./textures/brick.png");

		bloque(-22-5,216,5596+32,"./textures/brick.png");
		bloque(-22-5,216,5548+32,"./textures/brick.png");
		bloque(-22-5,216,5500+32,"./textures/brick.png");
		bloque(26-5,216,5596+32,"./textures/brick.png");
		bloque(26-5,216,5548+32,"./textures/brick.png");
		bloque(26-5,216,5500+32,"./textures/brick.png");
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

//		BLOQUES PARTE 2
		bloque(0,230,3200,"./textures/brick.png");
        bloque(0,230,3248,"./textures/brick.png");
        bloque(0,230,(3248+48),"./textures/brick.png");
        bloque(0,230,(3248+48+48),"./textures/brick.png");
        bloque(0,230,(3200-48),"./textures/brick.png");
        bloque(0,230,(3200-48-48),"./textures/brick.png");
        bloque(0,230,(3200-48-48-48),"./textures/brick.png");
        bloque(0,230,(3200-48-48-48-48),"./textures/brick.png");
        cajas(0,400,3176);
        bloque(0,400,(3176+48),"./textures/brick.png");
        bloque(0,400,(3176-48),"./textures/brick.png");
    //XXXXXXXXXXXXXXXXXXXXXXTEXTURABACKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX		
		var texturaBack= new THREE.TextureLoader().load("./textures/background.jpg");
		texturaBack.wrapS=texturaBack.wrapT=THREE.RepeatWrapping;
		texturaBack.repeat.set(8,1);
		var back = new THREE.Mesh(
			new THREE.PlaneGeometry(8000,600), new THREE.MeshLambertMaterial({
				map: texturaBack,
				side:THREE.DoubleSide
			})
			);
		back.rotation.y=-Math.PI/2;
		back.position.x=100;
		back.position.z=3300;
		back.position.y=157;
	//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
				
        //iniciar jugador
        var j = new Jugador("pepe",{
				modelo:'Luigi_obj.obj',
				position: new THREE.Vector3(200,0,0),
				lifes:20
			});
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

         jugadores.push(j);        
         escena.add(suelo);
         escena.add(lAmbiente,lDir);
         suelo.name="suelo";         
         escena.add(back);
         escena.add(front,side1,side2,suelo);//piso1
         collidableMeshList.push(suelo);

//XXXXXXXXXXXXXXXXXXXXXXXCREANDOCOSASXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
         cajas(0,400,60);
         bloque(0,230,0,"./textures/brick.png");
         bloque(0,230,48,"./textures/brick.png");
         bloque(0,230,96,"./textures/brick.png");
         bloque(0,230,144,"./textures/brick.png");
         tubos(0,250,1800,7,10,7);
         tubos(0,250,2420,7,10,7);
         oneup(0,200,850,1,1,1);
         goomba1(0,0,650,1.3,1.3,1.3);
         goomba1(0,0,1650,1.3,1.3,1.3);
         goomba1(0,150,2345,1.3,1.3,1.3);
         goomba1(0,250,3340,1.3,1.3,1.3);
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
         cuboGeometria=new THREE.BoxGeometry(200,30,100);
		//textura
		var cuboTextura = new THREE.ImageUtils.loadTexture("./textures/atlas.jpg");
//some textures
		var bricks = [
		    new THREE.Vector2(0, .666), 
		    new THREE.Vector2(.5, .666), 
		    new THREE.Vector2(.5, 1), 
		    new THREE.Vector2(0, 1)
		    ];
		var clouds = [
		    new THREE.Vector2(.5, .666), 
		    new THREE.Vector2(1, .666), 
		    new THREE.Vector2(1, 1), 
		    new THREE.Vector2(.5, 1)
		    ];
		var crate = [ 
		    new THREE.Vector2(0, .333), 
		    new THREE.Vector2(.5, .333), 
		    new THREE.Vector2(.5, .666), 
		    new THREE.Vector2(0, .666)
		    ];
		var stone = [
		    new THREE.Vector2(.5, .333), 
		    new THREE.Vector2(1, .333), 
		    new THREE.Vector2(1, .666), 
		    new THREE.Vector2(.5, .666)
		    ];
		var water = [
		    new THREE.Vector2(0, 0), 
		    new THREE.Vector2(.5, 0), 
		    new THREE.Vector2(.5, .333), 
		    new THREE.Vector2(0, .333)
		    ];
		var wood = [
		    new THREE.Vector2(.5, 0), 
		    new THREE.Vector2(1, 0), 
		    new THREE.Vector2(1, .333), 
		    new THREE.Vector2(.5, .333)
		    ]

	//Arreglo de coordenadas para mapeado UV

		var bricks = [
			new THREE.Vector2(0.0,0.66),
			new THREE.Vector2(0.5,0.66),
			new THREE.Vector2(0.5,1.0),
			new THREE.Vector2(0.0,1.0)
		];

		//Mapeo de las texturas sobre las caras
		
		cuboGeometria.faceVertexUvs[1] = [];

		cuboGeometria.faceVertexUvs[0][0] = [ bricks[0], bricks[1], bricks[3] ];
		cuboGeometria.faceVertexUvs[0][1] = [ bricks[1], bricks[2], bricks[3] ];
	  
		cuboGeometria.faceVertexUvs[0][2] = [ bricks[0], bricks[1], bricks[3] ];
		cuboGeometria.faceVertexUvs[0][3] = [ bricks[1], bricks[2], bricks[3] ];
		  
		cuboGeometria.faceVertexUvs[0][4] = [ crate[0], crate[1], crate[3] ];
		cuboGeometria.faceVertexUvs[0][5] = [ crate[1], crate[2], crate[3] ];
		  
		cuboGeometria.faceVertexUvs[0][6] = [ bricks[0], bricks[1], bricks[3] ];
		cuboGeometria.faceVertexUvs[0][7] = [ bricks[1], bricks[2], bricks[3] ];
		  
		cuboGeometria.faceVertexUvs[0][8] = [ bricks[0], bricks[1], bricks[3] ];
		cuboGeometria.faceVertexUvs[0][9] = [ bricks[1], bricks[2], bricks[3] ];
		  
		cuboGeometria.faceVertexUvs[0][10] = [ bricks[0], bricks[1], bricks[3] ];
		cuboGeometria.faceVertexUvs[0][11] = [ bricks[1], bricks[2], bricks[3] ];

		cuboTextura.repeat.set(1,1);

		var cuboMaterial = new THREE.MeshBasicMaterial({map:cuboTextura});

		cubo = new THREE.Mesh(cuboGeometria, cuboMaterial);
		cubo.position.set(0, -15, 850);
		cubo.rotation.y = (90)*Math.PI/2;

		collidableMeshList.push(cubo);
		escena.add(cubo);
		//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXTEXTURA ANIMADAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
	    var runnerTexture = new THREE.ImageUtils.loadTexture( 'images/flagtexture.png' );
		annie = new TextureAnimator( runnerTexture, 7, 1, 7, 100 ); // texture, #horiz, #vert, #total, duration.
		var runnerMaterial = new THREE.MeshBasicMaterial( { map: runnerTexture, side:THREE.DoubleSide, transparent:true} );
		var runnerGeometry = new THREE.PlaneGeometry(200, 400, 1, 1);
		var runner = new THREE.Mesh(runnerGeometry, runnerMaterial);
		runner.position.set(0,200,4900);
		var rady= (270 * Math.PI)/180;
	    runner.rotateY(rady);
		escena.add(runner);
		jugadores.push(runner);
		createVariables();       
}

function updateCamara() {
		var vFOV = camara.fov * Math.PI / 180;        // convert vertical fov to radians
		var height = 2 * Math.tan( vFOV / 2 ) * 500; // visible height
		var aspect = window.width / window.height;
		var width = height * aspect;                  // visible width
		alert(vFOV);
}

function animarEscena2(){
	var ang=0;
		if(TECLA.DERECHA){
			if (mira=='l'){ang=180;cont[2]=0;}
			if (mira=='u'){ang=270;cont[3]=0;}
			if (mira=='d'){ang=90;cont[1]=0;}
			if (cont[0]<3){cont[0]++;}
			jugadores[0].move("z",1*jugadores[0].vx,ang,cont[0]);
			camara.position.z+=1*jugadores[0].vx;
			mira='r';
		}

		if(TECLA.ABAJO){
			if(mira=='r'){ang=270;cont[0]=0;}
			if (mira=='l'){ang=90;cont[2]=0;}
			if (mira=='u'){ang=180;cont[3]=0;}
			if (cont[1]<3){cont[1]++;}
			jugadores[0].move("x",-1*jugadores[0].vx,ang,cont[1]);
			mira='d';
		}

		if(TECLA.IZQUIERDA){
			if(mira=='r'){ang=180;cont[0]=0;}
			if (mira=='u'){ang=90;cont[3]=0;}
			if (mira=='d'){ang=270;cont[1]=0;}
			if (cont[2]<3){cont[2]++;}
			jugadores[0].move("z",-1*jugadores[0].vx,ang,cont[2]);
			camara.position.z+=-1*jugadores[0].vx;
			mira='l';
		}
		
		if(TECLA.ARRIBA){
			if(mira=='r'){ang=90;cont[0]=0;}
			if (mira=='l'){ang=270;cont[2]=0;}
			if (mira=='d'){ang=180;cont[1]=0;}
			if (cont[3]<3){cont[3]++;}

			jugadores[0].move("x",1*jugadores[0].vx,ang,cont[3]);
			mira='u';
		}
		
		if (TECLA.ESPACIO){
			esp=true;
		}
		var hecho=false;
		var hecho1=false;
		
		if (posy>=70 && posx>=(getX()-27) && posx<=(getX()+27) && posz>=(getZ()-27)
			&& posz<=(getZ()+27)){igual=true;}
		
		if (esp){
			var posxx=jugadores[0].getPos("x");
			var poszz=jugadores[0].getPos("z");
			if (posxx>=(getX()-30) && posxx<=(getX()+30) && poszz>=(getZ()-30)
			&& poszz<=(getZ()+30)){h=64;}
				else{h=220;}
			hecho=jugadores[0].jump(h);	}

		if (hecho){esp=false;}
		if (igual){hecho1=animarCubo();}
		if (hecho1){posy=0;igual=false;}
		
		requestAnimationFrame( animarEscena2 );
		renderEscena();

		actualizarEscena();
		moverObjeto2();
		moverObjeto3();
		jugadores[0].points = sec;
		console.log(jugadores[0].points);
}


function animarEscena(){
		var ang=0;
		if(TECLA.DERECHA){
			if (mira=='l'){ang=180;cont[2]=0;}
			if (mira=='u'){ang=270;cont[3]=0;}
			if (mira=='d'){ang=90;cont[1]=0;}
			if (cont[0]<3){cont[0]++;}
			jugadores[0].move("z",1*jugadores[0].vx,ang,cont[0]);
			camara.position.z+=1*jugadores[0].vx;
			mira='r';
		}

		if(TECLA.ABAJO){
			if(mira=='r'){ang=270;cont[0]=0;}
			if (mira=='l'){ang=90;cont[2]=0;}
			if (mira=='u'){ang=180;cont[3]=0;}
			if (cont[1]<3){cont[1]++;}
			jugadores[0].move("x",-1*jugadores[0].vx,ang,cont[1]);
			mira='d';
		}

		if(TECLA.IZQUIERDA){
			if(mira=='r'){ang=180;cont[0]=0;}
			if (mira=='u'){ang=90;cont[3]=0;}
			if (mira=='d'){ang=270;cont[1]=0;}
			if (cont[2]<3){cont[2]++;}
			jugadores[0].move("z",-1*jugadores[0].vx,ang,cont[2]);
			camara.position.z+=-1*jugadores[0].vx;
			mira='l';
		}
		
		if(TECLA.ARRIBA){
			if(mira=='r'){ang=90;cont[0]=0;}
			if (mira=='l'){ang=270;cont[2]=0;}
			if (mira=='d'){ang=180;cont[1]=0;}
			if (cont[3]<3){cont[3]++;}

			jugadores[0].move("x",1*jugadores[0].vx,ang,cont[3]);
			mira='u';
		}
		
		if (TECLA.ESPACIO){
			esp=true;
		}
		var hecho=false;
		var hecho1=false;
		
		if (posy>=70 && posx>=(getX()-27) && posx<=(getX()+27) && posz>=(getZ()-27)
			&& posz<=(getZ()+27)){igual=true;}
		
		if (esp){
			var posxx=jugadores[0].getPos("x");
			var poszz=jugadores[0].getPos("z");
			if (posxx>=(getX()-30) && posxx<=(getX()+30) && poszz>=(getZ()-30)
			&& poszz<=(getZ()+30)){h=64;}
				else{h=220;}
			hecho=jugadores[0].jump(h);	}

		if (hecho){esp=false;}
		if (igual){hecho1=animarCubo();}
		if (hecho1){posy=0;igual=false;}
		
		requestAnimationFrame( animarEscena );
		renderEscena();

		actualizarEscena();
		moverObjeto();
		

		moverEnemigo(650,-200);
		moverEnemigo1(1650,1050);
		moverEnemigo2(2345,1865);
		moverEnemigo3(3340,3015);
}

function createVariables(){
  for (var i = 0; i <= 50; ++i) {
      contadores[i] = -1;
  }
  console.log("contadores"+contadores[i]);
  return contadores;
}

function renderEscena(){
  renderer.render( escena, camara );
}

function actualizarEscena(){
	var delta = clock.getDelta();
	controlCamara.update();
	annie.update(1000 * delta);
	jugadores[0].updatePointsGUI();
}

function moverObjeto(){
	if(cubo.position.z==950){
		contador = -1;
	}
	if(cubo.position.z==750){
		contador = 1;
	}
	cubo.position.z+=contador;
}

function moverObjeto2(){
	if(cubo.position.y==650){
		contador = -1;
	}
	if(cubo.position.y==-50){
		contador = 1;
	}
	cubo.position.y+=contador;
}

function moverObjeto3(){
	if(cubo2.position.z==4500){
		contador = -1;
	}
	if(cubo2.position.z==4050){
		contador = 1;
	}
	cubo2.position.z+=contador;
}

function moverEnemigo(maximo,minimo){
	if(enemigos[0].position.z==maximo){
		contador1 = -1;
	}

	if(enemigos[0].position.z==minimo){
		contador1 = 1;
	}
	enemigos[0].position.z+=contador1;
}

function moverEnemigo1(maximo,minimo){
	if(enemigos[1].position.z==maximo){
		contador2 = -1;
	}
	if(enemigos[1].position.z==minimo){
		contador2 = 1;
	}
	enemigos[1].position.z+=contador2;
}

function moverEnemigo2(maximo,minimo){
	if(enemigos[2].position.z==maximo){
		contador3 = -1;
	}
	if(enemigos[2].position.z==minimo){
		contador3 = 1;
	}
	enemigos[2].position.z+=contador3;
}

function moverEnemigo3(maximo,minimo){
	if(enemigos[3].position.z==maximo){
		contador4 = -1;
	}
	if(enemigos[3].position.z==minimo){
		contador4 = 1;
	}
	enemigos[3].position.z+=contador4;
}

function moverPirana(thing, maximo, minimo){
	if(thing.position.y==maximo){
		contadores = -1;
	}
	if(thing.position.y==minimo){
		contadorE = 1;
	}
	thing.position.y+=contadorE;
}

function sig1(px, py, pz, sx, sy, sz){
  	var mesh;
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath( "./modelos/cosas/sign/" );
    mtlLoader.setTexturePath( './modelos/cosas/sign/' );
    mtlLoader.load( 'sign.mtl', function( materials) {
    materials.preload();
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials( materials );
    objLoader.setPath( "./modelos/cosas/sign/" );
    objLoader.setMaterials( materials );
    objLoader.load("sign.obj", function ( object ) {
    mesh = object;
    mesh.position.z = pz;
    mesh.position.x = px;
    mesh.position.y = py;
    mesh.scale.x=sx;
    mesh.scale.y=sy;
    mesh.scale.z=sz;
    var rady= ((180 * Math.PI)/180)+1;
    mesh.rotateY(rady);
    mesh.position.y=50;
    sign=mesh;
    sign.name="sign2";
    escena.add(sign);
    collidableMeshList.push(sign);
    console.log("sign");
       } );
      } );
}

function goomba1(px, py, pz, sx, sy, sz){
  	var thing;
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath( "./modelos/cosas/Goomba/" );
    mtlLoader.setTexturePath( './modelos/cosas/Goomba/' );
    mtlLoader.load( 'goomba.mtl', function( materials) {
    materials.preload();
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials( materials );
    objLoader.setPath( "./modelos/cosas/Goomba/" );
    objLoader.setMaterials( materials );
    objLoader.load("goomba.obj", function ( object ) {
    thing = object;
    thing.position.z = pz;
    thing.position.x = px;
    thing.position.y = py;
    thing.scale.x=sx;
    thing.scale.y=sy;
    thing.scale.z=sz;  
    var rady= (270 * Math.PI)/180;
    thing.rotateY(rady);
    goomba=thing;
    goomba.name="goomba2";
    escena.add(goomba);
    collidableMeshList.push(goomba);
    console.log("goomba");
    enemigos.push(goomba);
       } );
      } );
}

function kingboo(px, py, pz, sx, sy, sz){
  	var thing;
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath( "./modelos/cosas/kingboo/" );
    mtlLoader.setTexturePath( './modelos/cosas/kingboo/' );
    mtlLoader.load( 'kboo.mtl', function( materials) {
    materials.preload();
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials( materials );
    objLoader.setPath( "./modelos/cosas/kingboo/" );
    objLoader.setMaterials( materials );
    objLoader.load("kboo.obj", function ( object ) {
    thing = object;
    thing.position.z = pz;
    thing.position.x = px;
    thing.position.y = py;
    thing.scale.x=sx;
    thing.scale.y=sy;
    thing.scale.z=sz;  
    var rady= (270 * Math.PI)/180;
    thing.rotateY(rady);
    goomba=thing;
    goomba.name="goomba2";
    escena.add(goomba);
    collidableMeshList.push(goomba);
    console.log("goomba");
    enemigos.push(goomba);
       } );
      } );
}

function boo(px, py, pz, sx, sy, sz){
  	var thing;
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath( "./modelos/cosas/boo/" );
    mtlLoader.setTexturePath( './modelos/cosas/boo/' );
    mtlLoader.load( 'boo.mtl', function( materials) {
    materials.preload();
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials( materials );
    objLoader.setPath( "./modelos/cosas/boo/" );
    objLoader.setMaterials( materials );
    objLoader.load("boo.obj", function ( object ) {
    thing = object;
    thing.position.z = pz;
    thing.position.x = px;
    thing.position.y = py;
    thing.scale.x=sx;
    thing.scale.y=sy;
    thing.scale.z=sz;  
    var rady= (270 * Math.PI)/180;
    thing.rotateY(rady);
    goomba=thing;
    goomba.name="goomba2";
    escena.add(goomba);
    collidableMeshList.push(goomba);
    console.log("goomba");
    enemigos.push(goomba);
       } );
      } );
}


function TextureAnimator(texture, tilesHoriz, tilesVert, numTiles, tileDispDuration){
	// note: texture passed by reference, will be updated by the update function.		
	this.tilesHorizontal = tilesHoriz;
	this.tilesVertical = tilesVert;
	// how many images does this spritesheet contain?
	//  usually equals tilesHoriz * tilesVert, but not necessarily,
	//  if there at blank tiles at the bottom of the spritesheet. 
	this.numberOfTiles = numTiles;
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
	texture.repeat.set( 1 / this.tilesHorizontal, 1 / this.tilesVertical );
	// how long should each image be displayed?
	this.tileDisplayDuration = tileDispDuration;
	// how long has the current image been displayed?
	this.currentDisplayTime = 0;
	// which image is currently being displayed?
	this.currentTile = 0;		
	this.update = function( milliSec ){
		this.currentDisplayTime += milliSec;
		while (this.currentDisplayTime > this.tileDisplayDuration){
			this.currentDisplayTime -= this.tileDisplayDuration;
			this.currentTile++;
			if (this.currentTile == this.numberOfTiles)
				this.currentTile = 0;
			var currentColumn = this.currentTile % this.tilesHorizontal;
			texture.offset.x = currentColumn / this.tilesHorizontal;
			var currentRow = Math.floor( this.currentTile / this.tilesHorizontal );
			texture.offset.y = currentRow / this.tilesVertical;
		}
	};
}


function crearPiso(/*front*/fl,fa,/*lados*/sl,sa,/*suelo*/sul,
	sua,/*posiciones  front*/fpz,fpy,/* side1*/s1z,s1y,/*side2*/s2z,s2y,/*suelo*/suz,suy){

		var textureLoader = new THREE.TextureLoader();

		var textura = textureLoader.load( "./textures/caja.png" );
		textura.wrapS=textura.wrapT=THREE.RepeatWrapping;
		textura.repeat.set(1,10);

		var texturaPiso = textureLoader.load( "./textures/pasto.jpg" );
		texturaPiso.wrapS=texturaPiso.wrapT=THREE.RepeatWrapping;
		texturaPiso.repeat.set(3,36);

		var texturaFront= new THREE.TextureLoader().load("./textures/front.jpg");
		texturaFront.wrapS=texturaFront.wrapT=THREE.RepeatWrapping;
		texturaFront.repeat.set(2,1);

			var frente = new THREE.Mesh(
			new THREE.PlaneGeometry(fl,fa), new THREE.MeshLambertMaterial({
				map: texturaFront,
				side:THREE.DoubleSide
			})
			);

		var lado2 = new THREE.Mesh(
			new THREE.PlaneGeometry(sl,sa), new THREE.MeshLambertMaterial({
				map: texturaFront,
				side:THREE.DoubleSide
			})
			);

		var lado1 = new THREE.Mesh(
			new THREE.PlaneGeometry(sl,sa), new THREE.MeshLambertMaterial({
				map: texturaFront,
				side:THREE.DoubleSide
			})
			);

		var suelof = new THREE.Mesh(
				new THREE.PlaneGeometry(sul,sua,10,10),
				new THREE.MeshLambertMaterial({
					map: texturaPiso,
					side: THREE.DoubleSide
				})
			);
//LADO 2XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
		lado2.rotation.y=(90)*-Math.PI/2;
		lado2.position.x=0;
		lado2.position.z=s2z;
		lado2.position.y=-s2y;	
//XXXXXXXXXXXXXXXXXXXXXLADO1XXXXXXXXXXXXXXXXXXXXXXXXXXXX
		lado1.rotation.y=(90)*-Math.PI/2;
		lado1.position.x=0;
		lado1.position.z=s1z;
		lado1.position.y=-s2y;
//XXXXXXXXXXXXXXXXXXXXXFRENTEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
		frente.rotation.y = Math.PI/2;	
		frente.position.x=-100;
		frente.position.z=fpz;
		frente.position.y=-fpy;
//XXXXXXXXXXXXXXXXXXSUELOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
		suelof.rotation.x = -Math.PI/2;
		suelof.position.x=0;
		suelof.position.z=suz;
		suelof.position.y=suy;
		suelof.recieveShadow= true;

		 escena.add(frente,lado1,lado2,suelof);
		}

function crearPiso2(/*front*/fl,fa,/*lados*/sl,sa,/*suelo*/sul,sua,
	/*posiciones  front*/fpz,fpy,/* side1*/s1z,s1y,/*side2*/s2z,s2y,/*suelo*/suz,suy,
	/*repeat*/caja1,caja2,front1,front2,piso1,piso2){

		var textureLoader = new THREE.TextureLoader();

		var textura = textureLoader.load( "./textures/caja.png" );
		textura.wrapS=textura.wrapT=THREE.RepeatWrapping;
		textura.repeat.set(caja1,caja2);

		var texturaFront= new THREE.TextureLoader().load("./textures/lad.png");
		texturaFront.wrapS=texturaFront.wrapT=THREE.RepeatWrapping;
		texturaFront.repeat.set(front1,front2);

		var texturaPiso= new THREE.TextureLoader().load("./textures/piso.jpg");
		texturaPiso.wrapS=texturaPiso.wrapT=THREE.RepeatWrapping;
		texturaPiso.repeat.set(piso1,piso2);

			var frente = new THREE.Mesh(
			new THREE.PlaneGeometry(fl,fa), new THREE.MeshLambertMaterial({
				map: texturaFront,
				side:THREE.DoubleSide
			})
			);

		var lado2 = new THREE.Mesh(
			new THREE.PlaneGeometry(sl,sa), new THREE.MeshLambertMaterial({
				map: texturaFront,
				side:THREE.DoubleSide
			})
			);

		var lado1 = new THREE.Mesh(
			new THREE.PlaneGeometry(sl,sa), new THREE.MeshLambertMaterial({
				map: texturaFront,
				side:THREE.DoubleSide
			})
			);

		var suelof = new THREE.Mesh(
				new THREE.PlaneGeometry(sul,sua,10,10),
				new THREE.MeshLambertMaterial({
					map: texturaPiso,
					side: THREE.DoubleSide
				})
			);
//LADO 2XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
		lado2.rotation.y=(90)*-Math.PI/2;
		lado2.position.x=0;
		lado2.position.z=s2z;
		lado2.position.y=-s2y;	
//XXXXXXXXXXXXXXXXXXXXXLADO1XXXXXXXXXXXXXXXXXXXXXXXXXXXX
		lado1.rotation.y=(90)*-Math.PI/2;
		lado1.position.x=0;
		lado1.position.z=s1z;
		lado1.position.y=-s2y;
//XXXXXXXXXXXXXXXXXXXXXFRENTEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
		frente.rotation.y = Math.PI/2;	
		frente.position.x=-100;
		frente.position.z=fpz;
		frente.position.y=-fpy;
//XXXXXXXXXXXXXXXXXXSUELOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
		suelof.rotation.x = -Math.PI/2;
		suelof.position.x=0;
		suelof.position.z=suz;
		suelof.position.y=suy;
		suelof.recieveShadow= true;

		 escena.add(frente,lado1,lado2,suelof);
		}


		function tiempo(){
     var hou = 2;

     setInterval(function(){

       document.getElementById("timer").innerHTML = sec ;
       sec--;
       if(sec == 00)
       {
         hou--;
         sec = 60;
         if (hou == 0)
         {
            hou = 2;
         }
       }
      },500);
    }
