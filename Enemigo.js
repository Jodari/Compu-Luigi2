//Clase Enemigo
var obj;
var posi;
var posy=0;
var posx=0;
var posz=0;
var enemy=Enemigo;
var contador= -1;
var Enemigo = function(nombre,ap){

  if ("id" in ap){
    this.setId(ap.id);
  }else{
    this.setId(currentId+10);
    currentId++;
  }

  this.name = nombre;
  this.jumping = false;
  this.inAir = false;
  this.falling = false;
  this.vy = 0;
  this.vx = 5;
  this.vf = 15;


  this.position = ("position" in ap) ? ap.position : new THREE.Vector3(0,0,0);

  this.modelo = ("modelo" in ap) ? ap.modelo : "./modelos/cosas/Goomba/goomba.obj";

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


 
  }
this.initGUI();
}


Enemigo.prototype.setId = function(id){
  this.id = id;
}


Enemigo.prototype.jump = function(h){
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


Enemigo.prototype.setPosition = function(x,y,z){
  this.mesh.position.set(x,y,z);
  }

Enemigo.prototype.getPos = function (eje){
  
  return mesh.position[eje];
}
Enemigo.prototype.move = function(nombre){

  console.log("posicion"+nombre.position.z);

  if(nombre.position.z==950){
    contador = -1;
  }

  if(nombre.position.z==750){
    contador = 1;
  }

  nombre.position.z+=contador;

}

Enemigo.prototype.die = function(){

  alert('sss'); 
    if( (this.lifes - 1) <= 0 ){
      alert("Game Over");
    }
    this.lifes--;
    console.log("vidas"+this.lifes);
    this.updateLifesGUI();
}


Enemigo.prototype.updateLifesGUI = function(){
  var myGui = $("enemyGUI");
  var lifesGUI = myGui.getElementsByClassName("enemyLifes")[0];
  console.log("vidas"+this.lifes);
  lifesGUI.innerHTML = "Lifes: "+this.lifes;
}


Enemigo.prototype.initGUI = function(){

  var enemyGUI = document.createElement("div");
  enemyGUI.className = "enemyGUI";
  enemyGUI.dataset.id = this.id;

  var enemyName = document.createElement("div");
  enemyName.className = "enemyName";
  enemyName.innerHTML = this.name;

  var enemyLifes = document.createElement("div");
  enemyLifes.className = "enemyLifes";
  enemyLifes.innerHTML = "Lifes: "+this.lifes;

  var enemyPoints = document.createElement("div");
  enemyPoints.className = "enemyPoints";
  enemyPoints.innerHTML = "Points: "+this.points;

  enemyGUI.appendChild(enemyName);
  enemyGUI.appendChild(enemyLifes);
  enemyGUI.appendChild(enemyPoints);

  document.getElementById("enemiesGUI").appendChild(enemyGUI);

}

