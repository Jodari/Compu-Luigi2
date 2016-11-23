//Clase Jugador
var obj;
var posi;
var posy=0;
var posx=0;
var posz=0;
var plyer=Jugador;
var playerPoints;
var playerLifes;
var Jugador = function(nombre,ap){

  if ("id" in ap){
    this.setId(ap.id);
  }else{
    this.setId(currentId+1);
    currentId++;
  }

  this.name = nombre;
  this.jumping = false;
  this.inAir = false;
  this.falling = false;
  this.vy = 0;
  this.vx = 5;
  this.vf = 15;

  //this.mesh = null;

  this.position = ("position" in ap) ? ap.position : new THREE.Vector3(0,0,0);

  this.modelo = ("modelo" in ap) ? ap.modelo : "./modelos/obj/MarioandLuigi/Luigi_obj.obj";

  this.lifes = ("lifes" in ap) ? ap.lifes : 1;

  this.points = ("points" in ap) ? ap.points : 0;

  this.setMesh = function(mesh){
    console.log("Setting "+this.name+" mesh");
    this.mesh = mesh;
    this.mesh.position.set(this.position.x,this.position.y,this.position.z);
  }

  if("mesh" in ap){
    this.setMesh(ap.mesh);
  }else{

/*
    var forma=new THREE.CubeGeometry(10,10,10);
    var mario = [
        new THREE.Vector2(0, 0.5), 
        new THREE.Vector2(0.17, 0.5), 
        new THREE.Vector2(0.17, 0.75), 
        new THREE.Vector2(0, 0.75)
        ];
        
    forma.faceVertexUvs[0] = [];

    forma.faceVertexUvs[0][0] = [
     mario[0],
     mario[1],
     mario[3]
    ];


   forma.faceVertexUvs[0][1] = [
    mario[1],
    mario[2],
    mario[3]
    ];

   
    //var textureLoader = new THREE.TextureLoader();
    /*var texturaPersonaje = THREE.ImageUtils.loadTexture( "./textures/mario.png");
    var materialPersonaje = new THREE.MeshLambertMaterial({map: texturaPersonaje});
    var mesh= new THREE.Mesh(forma, materialPersonaje);

    */


var mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath( "./modelos/obj/MarioandLuigi/" );
mtlLoader.setTexturePath( './modelos/obj/MarioandLuigi/' );
mtlLoader.load( 'Luigi_obj.mtl', function( materials) {

materials.preload();

  var objLoader = new THREE.OBJLoader();
  objLoader.setMaterials( materials );
  objLoader.setPath( "./modelos/obj/MarioandLuigi/" );

  objLoader.setMaterials( materials );
  objLoader.load("Luigi_obj.obj", function ( object ) {
    this.mesh = object;
    this.mesh.position.y = 0;
    this.mesh.position.x = 0;
    this.mesh.position.z = -150;
    this.mesh.collidableDistance=10.1;
     
     obj=this.mesh;
     escena.add(obj);
     posi=obj.position.y;
   } );

} );

this.mesh=obj;
//this.setMesh(this.mesh);

/*    var loader = new THREE.JSONLoader;

loader.load('./modelos/obj/male02/Male02_slim.js', function (geometry, materials) {
    var skinnedMesh = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials));
    skinnedMesh.position.y = 2;
    skinnedMesh.scale.set(1, 1, 1);
    var animation = new THREE.Animation(geometry, geometry.animations);

    escena.add(skinnedMesh);

    animation.play();
     
 
});*/
 
  }

  this.initGUI();
}


Jugador.prototype.setId = function(id){
  this.id = id;
}

Jugador.prototype.jump = function(h){
  console.log("Jump it up!");
    if(this.jumping == false && this.inAir == false){
      if(mesh.position.y<h){
        mesh.position.y += this.vf;this.vy = -15;}
        
        else{
          posy=mesh.position.y;
          posx=mesh.position.x;
          posz=mesh.position.z;
          this.jumping = true;this.inAir==true;}
    }
    else{
    if (mesh.position.y>posi){mesh.position.y+=this.vy;}
    else{this.jumping=false; this.inAir=false;
      return true;}
  }
}

Jugador.prototype.setPosition = function(x,y,z){
  this.mesh.position.set(x,y,z);
  }

Jugador.prototype.getPos = function (eje){
  
  return mesh.position[eje];
}
Jugador.prototype.move = function(eje,cantidad,rotacion, cont){
  mesh.position[eje] += cantidad;

    if (cont==1){
      var rady= (rotacion * Math.PI)/180;
      obj.rotateY(rady);
      }
}

Jugador.prototype.die = function(){

  alert('sss'); 
    if( (this.lifes - 1) <= 0 ){
      alert("Game Over");
    }
    this.lifes--;
    console.log("vidas"+this.lifes);
    this.updateLifesGUI();
}


Jugador.prototype.updateLifesGUI = function(){
  var myGui = $("playerGUI");
  var lifesGUI = myGui.getElementsByClassName("playerLifes")[0];
  console.log("vidas"+this.lifes);

  lifesGUI.innerHTML = "Lifes: "+this.lifes;
  playerLifes.innerHTML= "Lifes: "+this.lifes;
}

Jugador.prototype.updatePointsGUI = function(){
  var myGui = $("playerGUI");
  var pointsGUI = document.getElementsByClassName("playerPoints");
  pointsGUI.innerHTML = "Points: "+this.points;
  playerPoints.innerHTML = "Points: "+this.points;
}



Jugador.prototype.initGUI = function(){

  var playerGUI = document.createElement("div");
  playerGUI.id = "playerGUI";
  playerGUI.className = "playerGUI";
  playerGUI.dataset.id = this.id;

  var playerName = document.createElement("div");
  playerName.className = "playerName";
  playerName.innerHTML = this.name;

  playerLifes = document.createElement("div");
  playerLifes.className = "playerLifes";
  playerLifes.innerHTML = "Lifes: "+this.lifes;

  playerPoints = document.createElement("div");
  playerPoints.className = "playerPoints";
  playerPoints.innerHTML = "Points: "+this.points;

  playerGUI.appendChild(playerName);
  playerGUI.appendChild(playerLifes);
  playerGUI.appendChild(playerPoints);

  document.getElementById("playersGUI").appendChild(playerGUI);

}














//estupido ATOM
