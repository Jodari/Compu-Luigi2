var box;
var alta;
var posi1=230;
var inAir1=false;
var vyc=0;
var goomba;
var enemy;
var counting;

function cajas (px, py, pz){


    box = new THREE.Mesh (new THREE.BoxGeometry(60,60,60),
                          new THREE.MeshLambertMaterial({
                          map:new THREE.TextureLoader().load("./textures/box.png"),
    side: THREE.DoubleSide}))
    box.position.x=px;
    box.position.y=py;
    box.position.z=pz;
    box.scale.x=0.8;
    box.scale.y=0.8;
    box.scale.z=0.8;
    box.castShadow=true;
    box.recieveShadow=true;
    box.name = "obstaculo";
    escena.add(box);
    collidableMeshList.push("obstaculo");
}

function bloque (px, py, pz, textura){


    alta = new THREE.Mesh (new THREE.BoxGeometry(60,60,60),
                          new THREE.MeshLambertMaterial({
                          map:new THREE.TextureLoader().load(textura),
    side: THREE.DoubleSide}))
    alta.position.x=px;
    alta.position.y=py;
    alta.position.z=pz;
    alta.scale.x=0.8;
    alta.scale.y=0.8;
    alta.scale.z=0.8;
    alta.castShadow=true;
    alta.recieveShadow=true;
    alta.name = "alta";
    escena.add(alta);
    collidableMeshList.push("alta");
}



function sign(){

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
    mesh.position.z = 670;
    mesh.position.x = 30;
    mesh.scale.x=30;
    mesh.scale.y=30;
    mesh.scale.z=30;
    
    var rady= ((180 * Math.PI)/180)+1;
    mesh.rotateY(rady);
    mesh.position.y=50;
    var sign=mesh;
    sign.name="sign";
    escena.add(sign);
    collidableMeshList.push(sign);
    console.log("sign");
       } );
      } );

}

function tubos(px, py, pz, sx, sy, sz){
    var mesh;
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath( "./modelos/cosas/tubo/" );
    mtlLoader.setTexturePath( './modelos/cosas/tubo/' );
    mtlLoader.load( 'tubo.mtl', function( materials) {

    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials( materials );
    objLoader.setPath( "./modelos/cosas/tubo/" );

    objLoader.setMaterials( materials );
    objLoader.load("tubo.obj", function ( object ) {
    mesh = object;
    mesh.position.z = pz;
    mesh.position.x = px;
    mesh.position.y = py;
    mesh.scale.x=sx;
    mesh.scale.y=sy;
    mesh.scale.z=sz;
    
    var rady= (90 * Math.PI)/180;
    mesh.rotateY(rady);
    var tubo1=mesh;
    tubo1.name="tubo1";
    escena.add(tubo1);
    collidableMeshList.push(tubo1);
    console.log("tubo");
       } );
      } );
}
 

function vida1 (){
  var mesh;
var mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath( "./modelos/cosas/1up/" );
mtlLoader.setTexturePath( './modelos/cosas/1up/' );
mtlLoader.load( '1up.mtl', function( materials) {

materials.preload();

  var objLoader = new THREE.OBJLoader();
  objLoader.setMaterials( materials );
  objLoader.setPath( "./modelos/cosas/1up/" );

  objLoader.setMaterials( materials );
  objLoader.load("1up.obj", function ( object ) {
    mesh = object;
    mesh.position.z = 200;
    mesh.scale.x=30;
    mesh.scale.y=30;
    mesh.scale.z=30;
    
    var rady= (90 * Math.PI)/180;
    mesh.rotateY(rady);
    mesh.position.y=30
    var vida1=mesh;
    vida1.name="vida1";
     escena.add(vida1);
     collidableMeshList.push(vida1);
     console.log("fuciu1234567");
   } );
  } );
}



function enemigo2 (){
  var mesh;
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
    mesh = object;
    mesh.position.z = 500;
    mesh.scale.x=1.4;
    mesh.scale.y=1.4;
    mesh.scale.z=1.4;

    var rady= (180 * Math.PI)/180;
    mesh.rotateY(rady);
    var enemigo1=mesh;
    enemigo1.name="enemigo1";
     escena.add(enemigo1);
     collidableMeshList.push(enemigo1);
     console.log("imfujckinglivefuhasdasd");
   } );
  } );
}

function enemigo1 (){

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
    goomba = object;
    goomba.position.z = 400;
    goomba.scale.x=1.4;
    goomba.scale.y=1.4;
    goomba.scale.z=1.4;

    var rady= (180 * Math.PI)/180;
    goomba.rotateY(rady);
    enemigo1=goomba;
    enemigo1.name="enemigo1";
    collidableMeshList.push(enemigo1);
     escena.add(enemigo1);
     
     console.log("alive");
   } );
  } );
}



function animarCubo (){
	if (!inAir1){
	 if (box.position.y<(260)){
        box.position.y += 4;vyc=-4}
      else{inAir1=true;}
    }
     else{
     if (box.position.y>posi1){box.position.y+=vyc;}
     else{inAir1=false; saleChamp();return true;}
 }
}



function oneup (px, py, pz, sx, sy, sz){
var mesh;
var mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath( "./modelos/cosas/champVerde/" );
mtlLoader.setTexturePath( './modelos/cosas/champVerde/' );
mtlLoader.load( 'mushroom.mtl', function( materials) {

materials.preload();

  var objLoader = new THREE.OBJLoader();
  objLoader.setMaterials( materials );
  objLoader.setPath( "./modelos/cosas/champVerde/" );

  objLoader.setMaterials( materials );
  objLoader.load("mushroom.obj", function ( object ) {
    mesh = object;
    mesh.position.z = pz;
    mesh.position.x = px;
    mesh.position.y = py;
    mesh.scale.x=sx;
    mesh.scale.y=sy;
    mesh.scale.z=sz;
    var rady= (270 * Math.PI)/180;
    mesh.rotateY(rady);
     escena.add(mesh);
   } );
  } );
}

function pirana (px, py, pz, sx, sy, sz){
var mesh;
var mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath( "./modelos/cosas/pirana/" );
mtlLoader.setTexturePath( './modelos/cosas/pirana/' );
mtlLoader.load( 'pirana.mtl', function( materials) {

materials.preload();

  var objLoader = new THREE.OBJLoader();
  objLoader.setMaterials( materials );
  objLoader.setPath( "./modelos/cosas/pirana/" );

  objLoader.setMaterials( materials );
  objLoader.load("pirana.obj", function ( object ) {
    mesh = object;
    mesh.position.z = pz;
    mesh.position.y = py;
    mesh.position.x = px;
    mesh.scale.x=sx;
    mesh.scale.y=sy;
    mesh.scale.z=sz;
    var rady= (270 * Math.PI)/180;
    mesh.rotateY(rady);
     escena.add(mesh);
   } );
  } );
}

function koopa (){
var mesh;
var mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath( "./modelos/cosas/koopa/" );
mtlLoader.setTexturePath( './modelos/cosas/koopa/' );
mtlLoader.load( 'koopa.mtl', function( materials) {

materials.preload();

  var objLoader = new THREE.OBJLoader();
  objLoader.setMaterials( materials );
  objLoader.setPath( "./modelos/cosas/koopa/" );

  objLoader.setMaterials( materials );
  objLoader.load("koopa.obj", function ( object ) {
    mesh = object;
    mesh.position.z = 1100;
    mesh.position.x = 0;
    mesh.scale.x=7;
    mesh.scale.y=7;
    mesh.scale.z=7;
    var rady= (180 * Math.PI)/180;
    mesh.rotateY(rady);
     escena.add(mesh);
   } );
  } );
}





function saleChamp (){
var mesh;
var mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath( "./modelos/cosas/champRojo/" );
mtlLoader.setTexturePath( './modelos/cosas/champRojo/' );
mtlLoader.load( 'mushroom.mtl', function( materials) {

materials.preload();

  var objLoader = new THREE.OBJLoader();
  objLoader.setMaterials( materials );
  objLoader.setPath( "./modelos/cosas/champRojo/" );

  objLoader.setMaterials( materials );
  objLoader.load("mushroom.obj", function ( object ) {
    mesh = object;
   	mesh.position.y = box.position.y+30;
    mesh.position.x = box.position.x;
    mesh.position.z = box.position.z;
    mesh.scale.x=1;
    mesh.scale.y=1;
    mesh.scale.z=1;
    var rady= (270 * Math.PI)/180;
    mesh.rotateY(rady);
     escena.add(mesh);
   } );
  } );
}

function getX(){
	return box.position.x;
}

function getZ(){
	return box.position.z;
}